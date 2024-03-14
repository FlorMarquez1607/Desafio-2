Cypress.Commands.add('login',(user,pass) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/login`,
        body: {
        username: user,
        password: pass
        },
        }).then((response) => {
            expect(response.status).to.equal(201)
            window.localStorage.setItem('token',response.body.token);
            window.localStorage.setItem('user',response.body.user.username);
            window.localStorage.setItem('userId',response.body.user._id);
            Cypress.env().token = response.body.token;

        });
});

Cypress.Commands.add('SearchProductAndDeteleIt',(data)=> {
    cy.request({
        method:'GET',
        url: `${Cypress.env().baseUrlAPI}/products?id=${data}`,
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).its('body.products.docs').each((product) => {
        cy.request({
            method:'DELETE',
            url: `${Cypress.env().baseUrlAPI}/products?id=${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`
            }
        });
    });
});



Cypress.Commands.add('CreateNewProduct',(data) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env().baseUrlAPI}/create-product`,
        body: data,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).then((response) => {
        window.localStorage.setItem('NewProductId',response.body.product._id);
        Cypress.env().NewProductId = response.body.product._id;
        cy.log(Cypress.env().NewProductId)
    });
});

Cypress.Commands.add('EditProduct',(body) => {
    cy.request({
        method: 'PUT',
        url: `${Cypress.env().baseUrlAPI}/product/${Cypress.env().NewProductId}`,
        body: body,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    });
});