describe('Testes de Login - Frontend Serverest', () => {
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://front.serverest.dev/login')
  })

  it('Deve fazer login com credenciais válidas', () => {
    // Dados de teste válidos
    const email = 'fulano@qa.com'
    const password = 'teste'

    // Preenche o formulário de login
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="senha"]').type(password)
    
    // Clica no botão de login
    cy.get('[data-testid="entrar"]').click()
    
    // Verifica se foi redirecionado para a página principal
    cy.url().should('include', '/admin/home')
    
    // Verifica se o nome do usuário está visível
    cy.get('[data-testid="nome"]').should('be.visible')
  })

  it('Deve exibir erro com credenciais inválidas', () => {
    // Dados de teste inválidos
    const email = 'usuario@invalido.com'
    const password = 'senhaerrada'

    // Preenche o formulário com dados inválidos
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="senha"]').type(password)
    
    // Clica no botão de login
    cy.get('[data-testid="entrar"]').click()
    
    // Verifica se a mensagem de erro é exibida
    cy.get('[data-testid="alert"]').should('be.visible')
    cy.get('[data-testid="alert"]').should('contain', 'Email e/ou senha inválidos')
  })

  it('Deve validar campos obrigatórios', () => {
    // Tenta fazer login sem preencher os campos
    cy.get('[data-testid="entrar"]').click()
    
    // Verifica se permanece na página de login
    cy.url().should('include', '/login')
  })

  it('Deve navegar para a página de cadastro', () => {
    // Clica no link para cadastro
    cy.get('[data-testid="cadastrar"]').click()
    
    // Verifica se foi redirecionado para a página de cadastro
    cy.url().should('include', '/cadastrarusuarios')
  })
}) 