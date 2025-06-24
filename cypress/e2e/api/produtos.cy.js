describe('Testes de API - Produtos', () => {
  const baseUrl = 'https://serverest.dev'
  let productId

  it('Deve listar todos os produtos', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/produtos`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('produtos')
      expect(response.body.produtos).to.be.an('array')
    })
  })

  it('Deve criar um novo produto', () => {
    const timestamp = Date.now()
    const productData = {
      nome: `Produto Teste API ${timestamp}`,
      preco: 100,
      descricao: 'Produto criado via API para testes',
      quantidade: 10
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/produtos`,
      body: productData,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
      expect(response.body).to.have.property('_id')
      productId = response.body._id
    })
  })

  it('Deve buscar um produto específico por ID', () => {
    // Primeiro cria um produto
    const timestamp = Date.now()
    const productData = {
      nome: `Produto Busca ${timestamp}`,
      preco: 150,
      descricao: 'Produto para teste de busca',
      quantidade: 5
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/produtos`,
      body: productData,
      failOnStatusCode: false
    }).then((createResponse) => {
      const createdProductId = createResponse.body._id
      
      // Busca o produto criado
      cy.request({
        method: 'GET',
        url: `${baseUrl}/produtos/${createdProductId}`,
        failOnStatusCode: false
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(200)
        expect(getResponse.body).to.have.property('nome', productData.nome)
        expect(getResponse.body).to.have.property('preco', productData.preco)
        expect(getResponse.body).to.have.property('descricao', productData.descricao)
      })
    })
  })

  it('Deve atualizar um produto existente', () => {
    // Primeiro cria um produto
    const timestamp = Date.now()
    const productData = {
      nome: `Produto Atualizar ${timestamp}`,
      preco: 200,
      descricao: 'Produto para teste de atualização',
      quantidade: 15
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/produtos`,
      body: productData,
      failOnStatusCode: false
    }).then((createResponse) => {
      const createdProductId = createResponse.body._id
      
      // Dados para atualização
      const updateData = {
        nome: `Produto Atualizado ${timestamp}`,
        preco: 250,
        descricao: 'Produto atualizado via API',
        quantidade: 20
      }

      // Atualiza o produto
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/produtos/${createdProductId}`,
        body: updateData,
        failOnStatusCode: false
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200)
        expect(updateResponse.body).to.have.property('message', 'Registro alterado com sucesso')
      })
    })
  })

  it('Deve excluir um produto', () => {
    // Primeiro cria um produto
    const timestamp = Date.now()
    const productData = {
      nome: `Produto Excluir ${timestamp}`,
      preco: 300,
      descricao: 'Produto para teste de exclusão',
      quantidade: 8
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/produtos`,
      body: productData,
      failOnStatusCode: false
    }).then((createResponse) => {
      const createdProductId = createResponse.body._id
      
      // Exclui o produto
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/produtos/${createdProductId}`,
        failOnStatusCode: false
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200)
        expect(deleteResponse.body).to.have.property('message', 'Registro excluído com sucesso')
      })
    })
  })

  it('Deve validar criação de produto com dados inválidos', () => {
    const invalidProductData = {
      nome: '', // Nome vazio
      preco: -10, // Preço negativo
      descricao: 'Produto com dados inválidos',
      quantidade: 0 // Quantidade zero
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/produtos`,
      body: invalidProductData,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('Deve buscar produtos por nome', () => {
    const searchTerm = 'Logitech'

    cy.request({
      method: 'GET',
      url: `${baseUrl}/produtos?nome=${searchTerm}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('produtos')
      // Verifica se os produtos retornados contêm o termo de busca
      if (response.body.produtos.length > 0) {
        response.body.produtos.forEach(produto => {
          expect(produto.nome.toLowerCase()).to.include(searchTerm.toLowerCase())
        })
      }
    })
  })
}) 