import UsuarioApi from "../../pages/api/UsuarioApi";

describe("Usuários - API Serverest", () => {
  let userId = null;
  let usuarioCadastro, usuarioAtualizacao;

  it("Deve cadastrar um novo usuário e salvar o _id", () => {
    usuarioCadastro = UsuarioApi.gerarUsuarioCadastro();

    cy.api({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      body: usuarioCadastro,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property(
        "message",
        "Cadastro realizado com sucesso"
      );
      userId = response.body._id;
    });
  });

  it("Deve buscar o usuário cadastrado pelo _id", () => {
    cy.api({
      method: "GET",
      url: `https://serverest.dev/usuarios/${userId}`,
      headers: { accept: "application/json" },
    }).then((getResponse) => {
      expect(getResponse.status).to.eq(200);
      expect(getResponse.body).to.have.property("nome", usuarioCadastro.nome);
      expect(getResponse.body).to.have.property("email", usuarioCadastro.email);
    });
  });

  it("Deve atualizar o usuário cadastrado com sucesso (PUT)", () => {
    usuarioAtualizacao = UsuarioApi.gerarUsuarioAtualizacao();

    cy.api({
      method: "PUT",
      url: `https://serverest.dev/usuarios/${userId}`,
      body: usuarioAtualizacao,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property(
        "message",
        "Registro alterado com sucesso"
      );
    });
  });

  it("Deve deletar o usuário cadastrado com sucesso (DELETE)", () => {
    cy.api({
      method: "DELETE",
      url: `https://serverest.dev/usuarios/${userId}`,
      headers: { accept: "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property(
        "message",
        "Registro excluído com sucesso"
      );
    });
  });

  it("Não deve permitir cadastro com email já existente", () => {
    const usuario = UsuarioApi.gerarUsuarioCadastro();

    cy.api({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      body: usuario,
    }).then((response) => {
      expect(response.status).to.eq(201);

      cy.api({
        method: "POST",
        url: "https://serverest.dev/usuarios",
        body: usuario,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body).to.have.property(
          "message",
          "Este email já está sendo usado"
        );
      });
    });
  });

  it("Não deve permitir cadastro sem preencher campos obrigatórios", () => {
    const usuarioVazio = UsuarioApi.gerarUsuarioCamposVazios();
    cy.api({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      body: usuarioVazio,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("nome");
      expect(response.body).to.have.property("email");
      expect(response.body).to.have.property("password");
    });
  });

  it("Não deve permitir cadastro com email inválido", () => {
    const usuarioInvalido = UsuarioApi.gerarUsuarioEmailInvalido();
    cy.api({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      body: usuarioInvalido,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("email");
    });
  });
});
