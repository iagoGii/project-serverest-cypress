describe("Testes de API - Carrinhos", () => {
  const baseUrl = "https://serverest.dev";
  let cartId;
  let productId;
  let userId;

  beforeEach(() => {
    // Cria um produto e usuário para usar nos testes
    const timestamp = Date.now();

    // Cria um produto
    const productData = {
      nome: `Produto Carrinho ${timestamp}`,
      preco: 100,
      descricao: "Produto para testes de carrinho",
      quantidade: 50,
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/produtos`,
      body: productData,
      failOnStatusCode: false,
    }).then((response) => {
      productId = response.body._id;
    });

    // Cria um usuário
    const userData = {
      nome: `Usuário Carrinho ${timestamp}`,
      email: `carrinho${timestamp}@teste.com`,
      password: "senha123",
      administrador: "true",
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/usuarios`,
      body: userData,
      failOnStatusCode: false,
    }).then((response) => {
      userId = response.body._id;
    });
  });

  it("Deve listar todos os carrinhos", () => {
    cy.api({
      method: "GET",
      url: `${baseUrl}/carrinhos`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("carrinhos");
      expect(response.body.carrinhos).to.be.an("array");
    });
  });

  it("Deve criar um novo carrinho", () => {
    const cartData = {
      produtos: [
        {
          idProduto: productId,
          quantidade: 2,
        },
      ],
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/carrinhos`,
      body: cartData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property(
        "message",
        "Cadastro realizado com sucesso"
      );
      expect(response.body).to.have.property("_id");
      cartId = response.body._id;
    });
  });

  it("Deve buscar um carrinho específico por ID", () => {
    // Primeiro cria um carrinho
    const cartData = {
      produtos: [
        {
          idProduto: productId,
          quantidade: 1,
        },
      ],
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/carrinhos`,
      body: cartData,
      failOnStatusCode: false,
    }).then((createResponse) => {
      const createdCartId = createResponse.body._id;

      // Busca o carrinho criado
      cy.api({
        method: "GET",
        url: `${baseUrl}/carrinhos/${createdCartId}`,
        failOnStatusCode: false,
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.have.property("produtos");
        expect(getResponse.body.produtos).to.be.an("array");
        expect(getResponse.body.produtos[0]).to.have.property(
          "idProduto",
          productId
        );
      });
    });
  });

  it("Deve adicionar produto ao carrinho existente", () => {
    // Primeiro cria um carrinho
    const initialCartData = {
      produtos: [
        {
          idProduto: productId,
          quantidade: 1,
        },
      ],
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/carrinhos`,
      body: initialCartData,
      failOnStatusCode: false,
    }).then((createResponse) => {
      const createdCartId = createResponse.body._id;

      // Adiciona mais produtos ao carrinho
      const addProductData = {
        produtos: [
          {
            idProduto: productId,
            quantidade: 3,
          },
        ],
      };

      cy.api({
        method: "PUT",
        url: `${baseUrl}/carrinhos/${createdCartId}`,
        body: addProductData,
        failOnStatusCode: false,
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body).to.have.property(
          "message",
          "Registro alterado com sucesso"
        );
      });
    });
  });

  it("Deve excluir um carrinho", () => {
    // Primeiro cria um carrinho
    const cartData = {
      produtos: [
        {
          idProduto: productId,
          quantidade: 1,
        },
      ],
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/carrinhos`,
      body: cartData,
      failOnStatusCode: false,
    }).then((createResponse) => {
      const createdCartId = createResponse.body._id;

      // Exclui o carrinho
      cy.api({
        method: "DELETE",
        url: `${baseUrl}/carrinhos/${createdCartId}`,
        failOnStatusCode: false,
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body).to.have.property(
          "message",
          "Registro excluído com sucesso"
        );
      });
    });
  });

  it("Deve validar criação de carrinho com produto inexistente", () => {
    const invalidCartData = {
      produtos: [
        {
          idProduto: "produto_inexistente",
          quantidade: 1,
        },
      ],
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/carrinhos`,
      body: invalidCartData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        "Produto não encontrado"
      );
    });
  });

  it("Deve validar quantidade insuficiente de produto", () => {
    const cartData = {
      produtos: [
        {
          idProduto: productId,
          quantidade: 1000, // Quantidade maior que o estoque
        },
      ],
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/carrinhos`,
      body: cartData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "message",
        "Produto não possui quantidade suficiente"
      );
    });
  });

  it("Deve finalizar compra do carrinho", () => {
    // Primeiro cria um carrinho
    const cartData = {
      produtos: [
        {
          idProduto: productId,
          quantidade: 1,
        },
      ],
    };

    cy.api({
      method: "POST",
      url: `${baseUrl}/carrinhos`,
      body: cartData,
      failOnStatusCode: false,
    }).then((createResponse) => {
      const createdCartId = createResponse.body._id;

      // Finaliza a compra
      cy.api({
        method: "DELETE",
        url: `${baseUrl}/carrinhos/concluir-compra`,
        body: { idCarrinho: createdCartId },
        failOnStatusCode: false,
      }).then((finishResponse) => {
        expect(finishResponse.status).to.eq(200);
        expect(finishResponse.body).to.have.property(
          "message",
          "Compra realizada com sucesso"
        );
      });
    });
  });
});
