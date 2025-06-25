import { faker } from '@faker-js/faker/locale/pt_BR'
import 'cypress-file-upload';

describe('Testes de Cadastro, Login e Cadastro de Produtos - Frontend Serverest', () => {
  let nome, email, senha;

  beforeEach(() => {
    cy.visitCadastro();
  });

  it('Deve cadastrar um novo usuário com sucesso', () => {

    nome = faker.person.fullName();
    email = faker.internet.email({ firstName: nome.split(' ')[0] });
    senha = faker.internet.password({ length: 8, pattern: /[A-Za-z0-9!@#$%^&*]/ });

    cy.Cadastrar();
    cy.NomeUser(nome);
    cy.EmailUser(email);
    cy.PasswordUser(senha);
    cy.CheckboxUser();
    cy.CadastrarUser();

    cy.contains('Cadastro realizado com sucesso').should('be.visible');
    cy.delayBetweenTests();
  });

  it('Não deve permitir cadastro com email já existente', () => {

    cy.Cadastrar();
    cy.NomeUser(nome);
    cy.EmailUser(email);
    cy.PasswordUser(senha);
    cy.CheckboxUser();
    cy.CadastrarUser();

    cy.contains('Este email já está sendo usado').should('be.visible');
    cy.delayBetweenTests();
  });

  it('Não deve permitir cadastro sem preencher campos obrigatórios', () => {
    cy.Cadastrar();
    cy.CadastrarUser();
  
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('Email é obrigatório').should('be.visible');
    cy.contains('Password é obrigatório').should('be.visible');
    cy.delayBetweenTests();
  });

  it('Deve fazer login com sucesso usando usuário cadastrado e cadastrar um produto', () => {
    cy.visit(`${Cypress.env('frontendUrl')}/login`);

    cy.EmailUser(email);
    cy.get('[data-testid="senha"]').type(senha).should('be.visible');
    cy.get('[data-testid="entrar"]').click();
    cy.delayBetweenTests();

    cy.CadastrarProduto();
  });

});