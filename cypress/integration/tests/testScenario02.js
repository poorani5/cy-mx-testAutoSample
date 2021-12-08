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
    
    cy.contains('h1','Twój koszyk jest pusty',{timeout:5000})
    
  }) 
  //Test Case 3
  it('Track the order status', () => {
    
    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > div.col-4.col-md-1 > div.o-mobile-header__menu.m-header-button.m-header-button--icon',{timeout:5000}).click()
    cy.get('div.o-mobile-menu__menu-scroll > div.container-fluid > ul > li:nth-child(2) > a',{timeout:5000}).click()
    cy.xpath("//input[@placeholder='E-mail']",{timeout:5000}).type("Glass{enter}")
    cy.get('span.a-input-message.a-input-message--error.active',{timeout:5000}).should('be.visible')
    cy.xpath("//input[@placeholder='E-mail']",{timeout:5000}).clear().type("Glass@gmail{enter}")
    cy.get('span.a-input-message.a-input-message--error.active',{timeout:5000}).should('be.visible')
    cy.xpath("//input[@placeholder='Numer identyfikacyjny zamówienia']",{timeout:5000}).type("Glass@gmail{enter}")
    cy.contains('span','Po złożeniu zamówienia weryfikacja może trochę potrwać, powróć za kilka minut')
  }) 
  
  //Test Case 4
  it('Verify Terms and Conditions', () => {
    
    cy.contains('span','Szybkie dostawy',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Przesyłki są wysyłane codziennie do krajów europejskich. Zawsze dokładamy wszelkich starań, aby jak najszybciej dostarczyć produkty do naszych Klientów!',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()

    cy.contains('span','Gwarancja Najniższej Ceny',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Zawsze dążymy do utrzymania najniższych cen. Jeśli jednak znajdą Państwo tańszy produkt u konkurencji, dopasujemy naszą cenę. Gwarancja ważna jest przez 14 dni od daty zakupu produktu.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()

    cy.contains('span','Darmowa wysyłka powyżej 250zl*',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Zamówienia o kwocie powyżej 250zł kwalifikowane są do darmowej wysyłki (*z wyjątkiem produktów wielkogabarytowych).',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()
    
    cy.contains('span','60-dniowa gwarancja zwrotu*',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Oferujemy wymianę lub zwrot produktów do 60 dni od daty zakupu. Produkt musi być zachowany w idealnym stanie oraz posiadać oryginalne opakowanie. *Niestety nie możemy przyjąć zwrotu produktów elektronicznych, takich jak pudełka CDI oraz układy zapłonowe. Dodatkowo nie umożliwiamy zwrotu produktów żywnościowych, takich jak suplementy diety i napoje energetyczne. Nie gwarantujemy również zwrotu podkładek, dysz oraz produktów wykonanych na specjalne zamówienie.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()

    cy.contains('span','Darmowa Wymiana Rozmiaru*',{timeout:10000}).should('be.visible').click()
    cy.contains('p','Wymiana rozmiaru lub koloru na inny jest darmowa w przypadku odzieży, butów i ochraniaczy pod warunkiem, że wypełnią Państwo i dołączą do przesyłki nasz darmowy formularz zwrotny. *Produkty personalizowane i wykonywane na indywidualne zamówienie (z nadrukiem lub haftem) nie podlegają zwrotowiani wymianie.',{timeout:10000}).should('be.visible')
    cy.get('.m-overlay__closeBtn > .m-button').click()
  }) 
  //Test Case 5
  it('Check the sorting of a product works fine', () => {
    let firstElementVal
    cy.get('body > app-root > p-header > header > div.o-mobile-header.ng-star-inserted > div.container-fluid.pl-0.pr-0 > div > div.col-4.col-md-1 > div.o-mobile-header__menu.m-header-button.m-header-button--icon',{timeout:5000}).click()
    cy.contains('span','Wyposażenie MX',{timeout:5000}).click()
    cy.contains('span','Kaski',{timeout:5000}).click()
    cy.contains('strong','Popularne',{timeout:5000}).should('be.visible').click()
    cy.contains('li','Najtańsze',{timeout:5000}).should('be.visible').click()

    cy.xpath('//*[@id="wrapper"]/div/p-sub-category/p-productlist/div/div/div[3]/div/div/div[31]/p-productcard/a/div/div/div[2]/div/div[1]/span',{timeout:5000}).should('be.visible').contains('269 zł')

    cy.xpath('//*[@id="wrapper"]/div/p-sub-category/p-productlist/div/div/div[3]/div/div/div[60]/p-productcard/a/div/div/div[2]/div/div[1]/span[1]',{timeout:5000}).should('be.visible').contains('399,99 zł')
      
  })  
})