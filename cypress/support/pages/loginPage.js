class LoginPage {
    elements = {
        usernameInput: () => cy.get('[data-test="username"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
        errorMessage: () => cy.get('[data-test="error"]'),
        inventoryList: () => cy.get('.inventory_list'),
        shoppingCart: () => cy.get('.shopping_cart_link')
    }

    visit() {
        cy.visit('/')
    }

    login(username, password) {
        this.elements.usernameInput().clear().type(username)
        this.elements.passwordInput().clear().type(password)
        this.elements.loginButton().click()
    }

    getErrorMessage() {
        return this.elements.errorMessage()
    }

    getInventoryList() {
        return this.elements.inventoryList()
    }

    getShoppingCart() {
        return this.elements.shoppingCart()
    }

    clickLoginButton() {
        this.elements.loginButton().click()
    }
}

export default new LoginPage() 