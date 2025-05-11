import { loginPage } from '../pages/loginPage'

describe('Add item with max price', () => {
    it('Add item with max price', () => {
        loginPage.login('standard_user', 'secret_sauce')
        cy.get('[data-test="inventory-item-price"]').then(($prices) => {
            // Extract all prices as numbers
            const priceArr = [...$prices].map(el => parseFloat(el.textContent.replace('$', '')))
            const maxPrice = Math.max(...priceArr)
            cy.log(`Max price is $${maxPrice}`)

            // Find and click the "Add to cart" button next to the max price
            cy.contains('[data-test="inventory-item-price"]', `$${maxPrice.toFixed(2)}`)
              .parent() // Go to the parent element that contains the button
              .find('button') // Adjust selector if needed for the add-to-cart button
              .click()
        })
    })
})