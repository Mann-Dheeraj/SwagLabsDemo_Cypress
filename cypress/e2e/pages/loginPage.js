export const loginPage = {
    // Element selectors
    usernameInput: '[data-test="username"]',
    passwordInput: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
    inventoryList: '.inventory_list',
    shoppingCart: '.shopping_cart_link',

    // Actions
    visit() {
        cy.visit('/')
    },

    typeUsername(username) {
        cy.get(this.usernameInput).clear().type(username)
    },

    typePassword(password) {
        cy.get(this.passwordInput).clear().type(password)
    },

    clickLogin() {
        cy.get(this.loginButton).click()
    },

    login(username, password) {
        this.visit()
        this.typeUsername(username)
        this.typePassword(password)
        this.clickLogin()
    },

    // Getters for elements
    getErrorMessage() {
        return cy.get(this.errorMessage)
    },

    getInventoryList() {
        return cy.get(this.inventoryList)
    },

    getShoppingCart() {
        return cy.get(this.shoppingCart)
    }
}
