describe('Testes de Cadastro - Frontend Serverest', () => {
  beforeEach(() => {
    // Visita a página de cadastro antes de cada teste
    cy.visit('https://front.serverest.dev/cadastrarusuarios')
  })

  it('Deve cadastrar um novo usuário com sucesso', () => {
    // Gera dados únicos para o teste
    const timestamp = Date.now()
    const email = `${timestamp}@teste.com`
    const nome = `${timestamp}`

    // Preenche o formulário de cadastro
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type('senha123')
    cy.get('[data-testid="checkbox"]').check()
    
    // Clica no botão de cadastrar
    cy.get('[data-testid="cadastrar"]').click()
    
    // Verifica se a mensagem de sucesso é exibida
    cy.get('[data-testid="alert"]').should('be.visible')
    cy.get('[data-testid="alert"]').should('contain', 'Cadastro realizado com sucesso')
  })

  it('Deve validar email já cadastrado', () => {
    // Tenta cadastrar com email já existente
    cy.get('[data-testid="nome"]').type('Usuário Duplicado')
    cy.get('[data-testid="email"]').type('fulano@qa.com') // Email já cadastrado
    cy.get('[data-testid="password"]').type('senha123')
    cy.get('[data-testid="checkbox"]').check()
    
    // Clica no botão de cadastrar
    cy.get('[data-testid="cadastrar"]').click()
    
    // Verifica se a mensagem de erro é exibida
    cy.get('[data-testid="alert"]').should('be.visible')
    cy.get('[data-testid="alert"]').should('contain', 'Este email já está sendo usado')
  })

  it('Deve validar campos obrigatórios', () => {
    // Tenta cadastrar sem preencher campos obrigatórios
    cy.get('[data-testid="cadastrar"]').click()

    cy.get('[data-dismiss="alert"]').should('contain', 'Nome não pode ficar em branco')
    cy.get('[data-dismiss="alert"]').should('contain', 'Email não pode ficar em branco')
    cy.get('[data-dismiss="alert"]').should('contain', 'Senha não pode ficar em branco')
    
    // Verifica se permanece na página de cadastro
    cy.url().should('include', '/cadastrarusuarios')
  })

  it('Deve validar formato de email inválido', () => {
    // Preenche com email inválido
    cy.get('[data-testid="nome"]').type('Usuário Teste')
    cy.get('[data-testid="email"]').type('emailinvalido')
    cy.get('[data-testid="password"]').type('senha123')
    cy.get('[data-testid="checkbox"]').check()
    
    // Clica no botão de cadastrar
    cy.get('[data-testid="cadastrar"]').click()
    
    // Verifica se permanece na página de cadastro
    cy.url().should('include', '/cadastrarusuarios')
  })
}) 