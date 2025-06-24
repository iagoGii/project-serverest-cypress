describe('Testes de Produtos - Frontend Serverest', () => {
  beforeEach(() => {
    // Faz login antes de cada teste
    cy.visit('https://front.serverest.dev/login')
    cy.get('[data-testid="email"]').type('fulano@qa.com')
    cy.get('[data-testid="senha"]').type('teste')
    cy.get('[data-testid="entrar"]').click()
    
    // Aguarda carregar a página principal
    cy.url().should('include', '/admin/home')
  })

  it('Deve navegar para a página de produtos', () => {
    // Clica no menu de produtos
    cy.get('[data-testid="listar-produtos"]').click()
    
    // Verifica se foi redirecionado para a página de produtos
    cy.url().should('include', '/admin/listarprodutos')
    
    // Verifica se a lista de produtos está visível
    cy.get('[data-testid="lista-produtos"]').should('be.visible')
  })

  it('Deve adicionar produto ao carrinho', () => {
    // Navega para a página de produtos
    cy.get('[data-testid="listar-produtos"]').click()
    cy.url().should('include', '/admin/listarprodutos')
    
    // Clica no primeiro produto para adicionar ao carrinho
    cy.get('[data-testid="adicionarProduto"]').first().click()
    
    // Verifica se a mensagem de sucesso é exibida
    cy.get('[data-testid="alert"]').should('be.visible')
    cy.get('[data-testid="alert"]').should('contain', 'Produto adicionado com sucesso')
  })

  it('Deve visualizar detalhes de um produto', () => {
    // Navega para a página de produtos
    cy.get('[data-testid="listar-produtos"]').click()
    cy.url().should('include', '/admin/listarprodutos')
    
    // Clica no primeiro produto para ver detalhes
    cy.get('[data-testid="produto"]').first().click()
    
    // Verifica se os detalhes do produto estão visíveis
    cy.get('[data-testid="nome"]').should('be.visible')
    cy.get('[data-testid="preco"]').should('be.visible')
    cy.get('[data-testid="descricao"]').should('be.visible')
  })

  it('Deve navegar para o carrinho de compras', () => {
    // Clica no ícone do carrinho
    cy.get('[data-testid="carrinho"]').click()
    
    // Verifica se foi redirecionado para a página do carrinho
    cy.url().should('include', '/admin/carrinho')
    
    // Verifica se a página do carrinho está carregada
    cy.get('[data-testid="carrinho"]').should('be.visible')
  })

  it('Deve fazer logout com sucesso', () => {
    // Clica no botão de logout
    cy.get('[data-testid="logout"]').click()
    
    // Verifica se foi redirecionado para a página de login
    cy.url().should('include', '/login')
    
    // Verifica se o formulário de login está visível
    cy.get('[data-testid="email"]').should('be.visible')
    cy.get('[data-testid="senha"]').should('be.visible')
  })
}) 