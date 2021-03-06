/*
  Second scenario to test 24mx.pl site with same 5 test cases
  ***Texts are changed here and also the searching product is changed to Oleje for better results display
*/
describe('Test 24mx.pl', () => {

  beforeEach(() => {
    cy.viewport(1000, 660)
    cy.visit('https://www.24mx.pl/')
    //cy.xpath('//div[contains(@class,"NostoCloseButton")]').click()
    cy.xpath('//div[contains(@class,"qa-consent-agree-btn")]').click()
    
  })
   //Test Case 1
  it('Add some glass products to the cart', () => {
    cy.xpath("//input[@id='search-tablet']").type("Oleje{enter}")
    cy.xpath('//*[@id="wrapper"]/div/p-search-result/div[1]/div/div/p-search-products/div/div[2]/div[1]/p-productcard/a/div/div/div[1]/img',{ timeout: 10000 }).click()
    cy.xpath('//*[@id="wrapper"]/div/p-product-page/div/div/div[1]/div/div[2]/div/div/div[2]/div/div/p-button/button',{ timeout: 10000 }).click()
    cy.get('[class="a-textlink a-textlink--blue d-inline-block textsize-small qa-proceed-to-checkout"]',{ timeout: 10000 }).click()
    cy.wait(4000)
    cy.get('.m-checkout-box__heading-title').should('contain.text','Koszyk')
  }) 
  //Test Case 2
 it('Delete the item from the cart', () => {
    //Prepare the cart from previous method first
    cy.xpath("//input[@id='search-tablet']").type("Oleje {enter}")
    cy.xpath('//*[@id="wrapper"]/div/p-search-result/div[1]/div/div/p-search-products/div/div[2]/div[1]/p-productcard/a/div/div/div[1]/img',{ timeout: 10000 }).click()
    cy.xpath('//*[@id="wrapper"]/div/p-product-page/div/div/div[1]/div/div[2]/div/div/div[2]/div/div/p-button/button',{ timeout: 10000 }).click()
    cy.get('[class="a-textlink a-textlink--blue d-inline-block textsize-small qa-proceed-to-checkout"]',{ timeout: 10000 }).click()
    cy.wait(10000)
    //Now the delete the item from the cart...

    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > div.col.col-4.col-md-2.text-right > a').click()
    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > p-header-minicart > div > div > div:nth-child(2) > div.col-md-7.col-lg-8 > div > p-product-line-items > div > ul > li > div > div.m-checkout-list__item-content-text.qa-standard-item-content-text > div.m-checkout-list__item-actions.m-checkout-list__item-actions--cart > button',{timeout : 5000}).should('be.visible').click()
    
    cy.get('[class="m-button m-button--remove qa-checkout-product-remove-btn m-button--xs"]',{timeout:5000}).should('be.visible').click()
    
    cy.contains('h1','Tw??j koszyk jest pusty',{timeout:5000})
    
  }) 
  //Test Case 3
  it('Track the order status', () => {
    
    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > div.col-4.col-md-1 > div.o-mobile-header__menu.m-header-button.m-header-button--icon',{timeout:5000}).click()
    cy.get('div.o-mobile-menu__menu-scroll > div.container-fluid > ul > li:nth-child(2) > a',{timeout:5000}).click()
    cy.xpath("//input[@placeholder='E-mail']",{timeout:5000}).type("Glass{enter}")
    cy.get('span.a-input-message.a-input-message--error.active',{timeout:5000}).should('be.visible')
    cy.xpath("//input[@placeholder='E-mail']",{timeout:5000}).clear().type("Glass@gmail{enter}")
    cy.get('span.a-input-message.a-input-message--error.active',{timeout:5000}).should('be.visible')
    cy.xpath("//input[@placeholder='Numer identyfikacyjny zam??wienia']",{timeout:5000}).type("Glass@gmail{enter}")
    cy.contains('span','Po z??o??eniu zam??wienia weryfikacja mo??e troch?? potrwa??, powr???? za kilka minut')
  }) 
  
  //Test Case 4
  it('Verify Terms and Conditions', () => {
    
    cy.contains('span','Szybkie dostawy',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Przesy??ki s?? wysy??ane codziennie do kraj??w europejskich. Zawsze dok??adamy wszelkich stara??, aby jak najszybciej dostarczy?? produkty do naszych Klient??w!',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()

    cy.contains('span','Gwarancja Najni??szej Ceny',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Zawsze d????ymy do utrzymania najni??szych cen. Je??li jednak znajd?? Pa??stwo ta??szy produkt u konkurencji, dopasujemy nasz?? cen??. Gwarancja wa??na jest przez 14 dni od daty zakupu produktu.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()

    cy.contains('span','Darmowa wysy??ka powy??ej 250zl*',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Zam??wienia o kwocie powy??ej 250z?? kwalifikowane s?? do darmowej wysy??ki (*z wyj??tkiem produkt??w wielkogabarytowych).',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()
    
    cy.contains('span','60-dniowa gwarancja zwrotu*',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Oferujemy wymian?? lub zwrot produkt??w do 60 dni od daty zakupu. Produkt musi by?? zachowany w idealnym stanie oraz posiada?? oryginalne opakowanie. *Niestety nie mo??emy przyj???? zwrotu produkt??w elektronicznych, takich jak pude??ka CDI oraz uk??ady zap??onowe. Dodatkowo nie umo??liwiamy zwrotu produkt??w ??ywno??ciowych, takich jak suplementy diety i napoje energetyczne. Nie gwarantujemy r??wnie?? zwrotu podk??adek, dysz oraz produkt??w wykonanych na specjalne zam??wienie.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()

    cy.contains('span','Darmowa Wymiana Rozmiaru*',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Wymiana rozmiaru lub koloru na inny jest darmowa w przypadku odzie??y, but??w i ochraniaczy pod warunkiem, ??e wype??ni?? Pa??stwo i do????cz?? do przesy??ki nasz darmowy formularz zwrotny. *Produkty personalizowane i wykonywane na indywidualne zam??wienie (z nadrukiem lub haftem) nie podlegaj?? zwrotowiani wymianie.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()
  }) 
  //Test Case 5
  it('Check the sorting of a product works fine', () => {
    let firstElementVal
    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > div.col-4.col-md-1 > div.o-mobile-header__menu.m-header-button.m-header-button--icon',{timeout:5000}).click()
    cy.contains('span','Wyposa??enie MX',{timeout:5000}).click()
    cy.contains('span','Kaski',{timeout:5000}).click()
    cy.contains('strong','Popularne',{timeout:5000}).should('be.visible').click()
    cy.contains('li','Najta??sze',{timeout:5000}).should('be.visible').click()

    cy.xpath('//*[@id="wrapper"]/div/p-sub-category/p-productlist/div/div/div[3]/div/div/div[31]/p-productcard/a/div/div/div[2]/div/div[1]/span',{timeout:5000}).should('be.visible').contains('269 z??')

    cy.xpath('//*[@id="wrapper"]/div/p-sub-category/p-productlist/div/div/div[3]/div/div/div[60]/p-productcard/a/div/div/div[2]/div/div[1]/span[1]',{timeout:5000}).should('be.visible').contains('399,99 z??')
      
  })  
})