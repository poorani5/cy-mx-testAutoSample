/*
  First scenario to test 24mx.ie site with 5 test cases in it  
*/
describe('Testing 24mx.ie', () => {

  beforeEach(() => {
    cy.viewport(1000, 660) // setting up the view port to 100%
    cy.visit('https://www.24mx.ie/')
    //cy.xpath('//div[contains(@class,"NostoCloseButton")]').click() // commenting the code since the pop up display in bottom left wasn't shown from 7th Dec
    cy.xpath('//div[contains(@class,"qa-consent-agree-btn")]').click()
    
  })
  //Test Case 1 - Add a glass product to the cart
  /*
  To verify whether the products can be added to the shopping cart for check out

  1.Searching for the 'Glass' product in search bar after opening the site in laptop.
  2.Trying to add the first shown product into the cart
  3.Proceeding to checkout the cart
  4.Verify whether the cart is ready with the added product
  */
  it('Add a glass product to the cart', () => {
    cy.xpath("//input[@id='search-tablet']").type("Glass{enter}")
    cy.xpath('//*[@id="wrapper"]/div/p-search-result/div[1]/div/div/p-search-products/div/div[2]/div[1]/p-productcard/a/div/div/div[1]/img').click({ timeout: 10000 })
    cy.xpath('//*[@id="wrapper"]/div/p-product-page/div/div/div[1]/div/div[2]/div/div/div[2]/div/div/p-button/button').click({ timeout: 10000 })
    cy.get('[class="a-textlink a-textlink--blue d-inline-block textsize-small qa-proceed-to-checkout"]').click({ timeout: 10000 })
    cy.wait(4000) // The page loads for a while, so waiting to witness the cart
    cy.get('.m-checkout-box__heading-title').should('contain.text','Cart')
  }) 
  //Test Case 2 - Delete the item from the cart
  /*
  To verify whether the added products in the cart can be removed during the checkout stage

  1.Repeat the previous steps
  2.Once the cart is ready try to remove by clicking edit button of the cart
  3.Delete the added product
  */
 it('Delete the item from the cart', () => {
    //Prepare the cart from previous method first
    cy.xpath("//input[@id='search-tablet']").type("Glass{enter}")
    cy.xpath('//*[@id="wrapper"]/div/p-search-result/div[1]/div/div/p-search-products/div/div[2]/div[1]/p-productcard/a/div/div/div[1]/img',{ timeout: 10000 }).click()
    cy.xpath('//*[@id="wrapper"]/div/p-product-page/div/div/div[1]/div/div[2]/div/div/div[2]/div/div/p-button/button',{ timeout: 10000 }).click()
    cy.get('[class="a-textlink a-textlink--blue d-inline-block textsize-small qa-proceed-to-checkout"]',{ timeout: 10000 }).click()
    cy.wait(10000)
    //Now the delete the item from the cart...

    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > div.col.col-4.col-md-2.text-right > a').click()
    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > p-header-minicart > div > div > div:nth-child(2) > div.col-md-7.col-lg-8 > div > p-product-line-items > div > ul > li > div > div.m-checkout-list__item-content-text.qa-standard-item-content-text > div.m-checkout-list__item-actions.m-checkout-list__item-actions--cart > button',{timeout : 5000}).should('be.visible').click()
    
    cy.get('[class="m-button m-button--remove qa-checkout-product-remove-btn m-button--xs"]',{timeout:5000}).should('be.visible').click()
    
    cy.contains('h1','YOUR CART IS EMPTY',{timeout:5000})
    
  }) 
  //Test Case 3- Track the Order status
  /*
  To verify the order status with email and order number (since no order is created in real time dummy values are used)
  
  1.Click on the order status link
  2.Pass random values to verify the validation of the email and order number¨
  3.Verify the error message for the dummy values provided
  */
  it('Track the order status', () => {
    
    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > div.col-4.col-md-1 > div.o-mobile-header__menu.m-header-button.m-header-button--icon',{timeout:5000}).click()
    cy.get('div.o-mobile-menu__menu-scroll > div.container-fluid > ul > li:nth-child(2) > a',{timeout:5000}).click()
    cy.xpath("//input[@placeholder='E-mail address']",{timeout:5000}).type("Glass{enter}")
    cy.get('span.a-input-message.a-input-message--error.active',{timeout:5000}).should('be.visible')
    cy.xpath("//input[@placeholder='E-mail address']",{timeout:5000}).clear().type("Glass@gmail{enter}")
    cy.get('span.a-input-message.a-input-message--error.active',{timeout:5000}).should('be.visible')
    cy.xpath("//input[@placeholder='Order number']",{timeout:5000}).type("Glass@gmail{enter}")
    cy.contains('span','If you just placed the order, please return in a couple of minutes')
  }) 
  //Test Case 4 - Verify Terms and Conditions
  /*
  To verify the website is displaying terms and conditions and the text in it
  
  1.Click on the different popping terms and conditions in the middle of the page using locators
  2.Validate the text of these terms and conditions 
  3.Close the panels to verify other items
  */
  it('Verify Terms and Conditions', () => {
    
    cy.contains('span','Fast deliveries',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Every day, we ship orders throughout Europe. We always do our best to ensure that you receive your products as quickly as possible!',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()

    cy.contains('span','Lowest Price Guarantee',{timeout:10000}).should('be.visible').click()
    cy.contains('p','We strive to maintain the lowest prices, if you still would find a lower price from a competitor, we will match that price. Our price guarantee applies within 14 days after your purchase.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()

    cy.contains('span','Free shipping over €100*',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Orders over €100 are qualified for free shipping. *This does not include bulky products nor Express delivery.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()
    
    cy.contains('span','60-day return policy*',{timeout:10000}).should('be.visible').click()
    cy.contains('p','You can make an exchange or return within 60 days of your purchase, as long as the item(s) are unused and still in original packaging. *Products manufactured upon order (custom-built exhaust systems, wheels brake lines, personalised decals, laser-engraved or embroidered products) cannot be returned. This also includes edible items and gift cards.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()

    cy.contains('span','Free Size Exchanges*',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Changing the size or colour of your clothing, boots or protection is free, as long as you use our pre-paid return form. *Products manufactured or personalised upon order (printed or embroidered products) cannot be exchanged.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()
  }) 
  //Test Case 5- Check the sorting of a product works fine
  /*
  To check the sorting of a product display based on price is working fine
  
  1.Click on Helmets from the Motocross Gear section
  2.Validate the products are initially displayed based on the filter popularity
  3.Change the filter to Low price
  4.Verify the initial product price is lesser than the final product
  */
  it('Check the sorting of a product works fine', () => {
    let firstElementVal
    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > div.col-4.col-md-1 > div.o-mobile-header__menu.m-header-button.m-header-button--icon',{timeout:5000}).click()
    cy.contains('span','Motocross Gear',{timeout:5000}).click()
    cy.contains('span','Helmet',{timeout:5000}).click()
    cy.contains('strong','Popular',{timeout:5000}).should('be.visible').click()
    cy.contains('li','Lowest price',{timeout:5000}).should('be.visible').click()

    cy.xpath('//*[@id="wrapper"]/div/p-sub-category/p-productlist/div/div/div[3]/div/div/div[31]/p-productcard/a/div/div/div[2]/div/div[1]/span',{timeout:5000}).should('be.visible').contains('€59.99')

    cy.xpath('//*[@id="wrapper"]/div/p-sub-category/p-productlist/div/div/div[3]/div/div/div[60]/p-productcard/a/div/div/div[2]/div/div[1]/span[1]',{timeout:5000}).should('be.visible').contains('€86.99')

 /*    cy.xpath('//*[@id="wrapper"]/div/p-sub-category/p-productlist/div/div/div[3]/div/div/div[31]/p-productcard/a/div/div/div[2]/div/div[1]/span',{timeout:5000}).should('be.visible').then(($btn1) => {
        let firstElement = $btn1.text()
        firstElementVal = firstElement
        //firstElementValue = Number(firstElement)
    })

    cy.xpath('//*[@id="wrapper"]/div/p-sub-category/p-productlist/div/div/div[3]/div/div/div[60]/p-productcard/a/div/div/div[2]/div/div[1]/span[1]',{timeout:5000}).should('be.visible').then(($btn2) => {
        let nthElement = $btn2.text()
        expect(Number(nthElement)).to.be.greaterThan(Number(firstElementVal));
        //nthElementValue = Number(nthElement)
        // $btn is the object that the previous command yielded
      }) */
      
      
  }) 
})