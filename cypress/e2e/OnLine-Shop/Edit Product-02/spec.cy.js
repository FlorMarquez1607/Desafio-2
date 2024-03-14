import {OnLineShopPage} from '../../../support/Pages/OnLineShopPage.js'
const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();



describe(` ${module} - ${scenarioName}`, () => {
    const onLineShopPage = new OnLineShopPage

    beforeEach('',()=>{
        cy.login(Cypress.env().user, Cypress.env().pass);
        cy.visit('');
    })

    it(`User creates a Product and edits it - TestCaseId:${testCaseId}`, () => {

        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data => {
        cy.SearchProductAndDeteleIt(data.Product1.id);
        cy.CreateNewProduct(data.Product1);
        cy.EditProduct(data.Product2);
        onLineShopPage.GetInOnLineShop();
        onLineShopPage.SearchProduct(data.Product2.id);
        onLineShopPage.VerifyThatProductWasEdited(data.Product2.name,data.Product2.price,data.Product2.img);
        });
    });
});