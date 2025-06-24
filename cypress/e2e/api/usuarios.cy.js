describe('Testes de API - Usuários', () => {
  const baseUrl = 'https://serverest.dev'
  let userId

  it('Deve listar todos os usuários', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/usuarios`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('usuarios')
      expect(response.body.usuarios).to.be.an('array')
    })
  })

  it('Deve criar um novo usuário', () => {
    const timestamp = Date.now()
    const userData = {
      nome: `Usuário Teste API ${timestamp}`,
      email: `usuario${timestamp}@api.com`,
      password: 'senha123',
      administrador: 'true'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/usuarios`,
      body: userData,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
      expect(response.body).to.have.property('_id')
      userId = response.body._id
    })
  })

  it('Deve buscar um usuário específico por ID', () => {
    // Primeiro cria um usuário
    const timestamp = Date.now()
    const userData = {
      nome: `Usuário Busca ${timestamp}`,
      email: `busca${timestamp}@api.com`,
      password: 'senha123',
      administrador: 'true'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/usuarios`,
      body: userData,
      failOnStatusCode: false
    }).then((createResponse) => {
      const createdUserId = createResponse.body._id
      
      // Busca o usuário criado
      cy.request({
        method: 'GET',
        url: `${baseUrl}/usuarios/${createdUserId}`,
        failOnStatusCode: false
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(200)
        expect(getResponse.body).to.have.property('nome', userData.nome)
        expect(getResponse.body).to.have.property('email', userData.email)
      })
    })
  })

  it('Deve atualizar um usuário existente', () => {
    // Primeiro cria um usuário
    const timestamp = Date.now()
    const userData = {
      nome: `Usuário Atualizar ${timestamp}`,
      email: `atualizar${timestamp}@api.com`,
      password: 'senha123',
      administrador: 'true'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/usuarios`,
      body: userData,
      failOnStatusCode: false
    }).then((createResponse) => {
      const createdUserId = createResponse.body._id
      
      // Dados para atualização
      const updateData = {
        nome: `Usuário Atualizado ${timestamp}`,
        email: `atualizado${timestamp}@api.com`,
        password: 'novaSenha123',
        administrador: 'false'
      }

      // Atualiza o usuário
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/usuarios/${createdUserId}`,
        body: updateData,
        failOnStatusCode: false
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200)
        expect(updateResponse.body).to.have.property('message', 'Registro alterado com sucesso')
      })
    })
  })

  it('Deve excluir um usuário', () => {
    // Primeiro cria um usuário
    const timestamp = Date.now()
    const userData = {
      nome: `Usuário Excluir ${timestamp}`,
      email: `excluir${timestamp}@api.com`,
      password: 'senha123',
      administrador: 'true'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/usuarios`,
      body: userData,
      failOnStatusCode: false
    }).then((createResponse) => {
      const createdUserId = createResponse.body._id
      
      // Exclui o usuário
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/usuarios/${createdUserId}`,
        failOnStatusCode: false
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200)
        expect(deleteResponse.body).to.have.property('message', 'Registro excluído com sucesso')
      })
    })
  })

  it('Deve validar criação de usuário com email duplicado', () => {
    const userData = {
      nome: 'Usuário Duplicado',
      email: 'fulano@qa.com', // Email já existente
      password: 'senha123',
      administrador: 'true'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/usuarios`,
      body: userData,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message', 'Este email já está sendo usado')
    })
  })
}) 