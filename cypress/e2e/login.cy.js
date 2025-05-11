import { loginPage } from '../pages/loginPage'

describe('Login Functionality', () => {
    const users = {
        standardUser: {
            username: 'standard_user',
            password: 'secret_sauce',
            canLogin: true
        },
        lockedUser: {
            username: 'locked_out_user',
            password: 'secret_sauce',
            canLogin: false,
            errorMessage: 'Epic sadface: Sorry, this user has been locked out'
        },
        problemUser: {
            username: 'problem_user',
            password: 'secret_sauce',
            canLogin: true
        }
    }

    beforeEach(() => {
        cy.visit('/')
    })

    it('should handle different user login scenarios', () => {
        Object.entries(users).forEach(([userType, userData]) => {
            cy.visit('/')
            cy.log(`Testing login for ${userType}`)
            
            cy.get('[data-test="username"]').clear().type(userData.username)
            cy.get('[data-test="password"]').clear().type(userData.password)
            cy.get('[data-test="login-button"]').click()

            if (userData.canLogin) {
                cy.url().should('include', '/inventory.html')
                cy.get('.inventory_list').should('be.visible')
                cy.get('.shopping_cart_link').should('be.visible')
            } else {
                cy.get('[data-test="error"]')
                    .should('be.visible')
                    .and('contain', userData.errorMessage)
            }
        })
    })

    it('should validate empty fields', () => {
        // Test empty username
        cy.get(loginPage.usernameInput).clear();
        loginPage.typePassword('secret_sauce')
        loginPage.clickLogin()
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Epic sadface: Username is required')

        // Test empty password
        cy.get(loginPage.usernameInput).type('standard_user')
        cy.get(loginPage.passwordInput).clear();
        loginPage.clickLogin()
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Epic sadface: Password is required')

        // Test both fields empty
        cy.get(loginPage.usernameInput).clear();
        cy.get(loginPage.passwordInput).clear();
        loginPage.clickLogin()
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Epic sadface: Username is required')
    })

    it('should validate invalid credentials', () => {
        cy.get('[data-test="username"]').type('invalid_user')
        cy.get('[data-test="password"]').type('invalid_password')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Epic sadface: Username and password do not match')
    })

    it('should maintain session after successful login', () => {
        cy.get('[data-test="username"]').type(users.standardUser.username)
        cy.get('[data-test="password"]').type(users.standardUser.password)
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
        
        cy.reload()
        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_list').should('be.visible')
    })
})