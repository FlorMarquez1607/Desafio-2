export class OnLineShopPage {

    GetInOnLineShop(){
        cy.get('[data-cy="onlineshoplink"]').click();

};

SearchProduct(id){
    cy.get('[data-cy="search-type"]').select('ID');
    cy.get('[data-cy="search-bar"]').type(`${id} {enter}`)
 };

 VerifyThatProductWasEdited(name,price,img){
    cy.get('[data-cy="name"]').should('have.text',name);
    cy.get('[data-cy="price"]').should('have.text',price);
    cy.xpath(`//img [@src="${img}"]`).should('exist')
  };
}