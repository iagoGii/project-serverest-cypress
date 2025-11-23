import { faker } from '@faker-js/faker/locale/pt_BR'

Cypress.Commands.add("visitCadastro", () => {
  cy.visit(`${Cypress.env("frontendUrl")}`);
});

Cypress.Commands.add("Cadastrar", () => {
  cy.get('[data-testid="cadastrar"]').click();
});

Cypress.Commands.add("NomeUser", (nome) => {
  cy.get('[data-testid="nome"]').type(nome).should("be.visible");
});

Cypress.Commands.add("EmailUser", (email) => {
  cy.get('[data-testid="email"]').type(email).should("be.visible");
});

Cypress.Commands.add("PasswordUser", (senha) => {
  cy.get('[data-testid="password"]').type(senha).should("be.visible");
});

Cypress.Commands.add("CheckboxUser", () => {
  cy.get('[data-testid="checkbox"]').check().should("be.visible");
});

Cypress.Commands.add("CadastrarUser", () => {
  cy.get('[data-testid="cadastrar"]').click().should("be.visible");
});

Cypress.Commands.add("delayBetweenTests", () => {
});

Cypress.Commands.add("CadastrarProduto", () => {
  cy.get('[data-testid="cadastrarProdutos"]').click();

  const produto = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 10, max: 1000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 100 }),
    imagem: "imagem-teste.jpg",
  };

  cy.get('[data-testid="nome"]').type(produto.nome);
  cy.get('[data-testid="preco"]').type(produto.preco.toString());
  cy.get('[data-testid="descricao"]').type(produto.descricao);
  cy.get('[data-testid="quantity"]').type(produto.quantidade.toString());
  cy.get('[data-testid="imagem"]').attachFile(produto.imagem);
  cy.get('[data-testid="cadastarProdutos"]').click();
});
