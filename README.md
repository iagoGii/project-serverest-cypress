# 🚀 Projeto de Automação Cypress - Serverest

Este projeto contém testes automatizados para o frontend e API da aplicação Serverest.

## 📋 Sobre o Projeto

- **Frontend**: https://front.serverest.dev/login
- **API**: https://serverest.dev/
- **Framework**: Cypress
- **Linguagem**: JavaScript

## 📁 Estrutura do Projeto

```
project-serverest-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── api/           # Testes de API (usuarios.cy.js)
│   │   └── frontend/      # Testes de Frontend (cadastro, produtos, etc)
│   ├── fixtures/          # Dados de teste (ex: imagens, jsons)
│   ├── pages/
│   │   └── api/           # Page Objects para API (UsuarioApi.js)
│   └── support/
│       └── commands.js    # Comandos customizados para Cypress
├── cypress.config.js      # Configuração do Cypress
├── package.json           # Scripts e dependências
├── README.md              # Documentação do projeto
└── ...
```

## 🛠️ Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## ⚙️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd project-serverest-cypress
```

2. Instale as dependências:
```bash
npm install
```
## 🛠️ Boas Práticas Adotadas

### Commands Customizados
- Centralização de comandos para ações repetitivas (ex: preencher campos, login, cadastro de produto)
- Exemplo:
  - `cy.CadastrarProduto()`
  - `cy.EmailUser(email)`
  - `cy.PasswordUser(senha)`
  - `cy.CheckboxUser()`
  - `cy.CadastrarUser()`

### Page Object (API)
- Criação do arquivo `UsuarioApi.js` para geração de dados dinâmicos e centralização da lógica de dados de usuário
- Métodos:
  - `gerarUsuarioCadastro()`
  - `gerarUsuarioAtualizacao()`
  - `gerarUsuarioEmailInvalido()`
  - `gerarUsuarioCamposVazios()`

### Organização dos Cenários
- Separação clara entre testes de frontend e API
- Uso de fixtures para dados compartilhados e upload de arquivos
- Uso de variáveis globais e/ou fixtures para compartilhar dados entre cenários (ex: _id do usuário)
- Testes independentes e reutilizáveis
- Dados dinâmicos com Faker para evitar conflitos e garantir robustez

## 📦 Scripts Úteis

- Rodar todos os testes no navegador padrão:
  ```bash
  npx cypress run
  ```
- Rodar todos os testes no Chrome headless:
  ```bash
  npm run cy:chrome
  ```
- Rodar apenas testes de API ou frontend (exemplo):
  ```bash
  npx cypress run --spec "cypress/e2e/api/usuarios.cy.js"
  npx cypress run --spec "cypress/e2e/frontend/cadastro.cy.js"
  ```

## 🧪 Cenários de Teste

### Frontend
- **Cadastro de usuário com sucesso**
- **Cadastro com e-mail já existente**
- **Cadastro sem preencher campos obrigatórios**
- **Login com usuário cadastrado**
- **Cadastro de produto com sucesso**
- **Upload de imagem no cadastro de produto**

### API
- **Cadastro de usuário com sucesso (POST)**
- **Buscar usuário cadastrado por _id (GET)**
- **Atualizar usuário cadastrado (PUT)**
- **Deletar usuário cadastrado (DELETE)**
- **Cadastro com e-mail já existente (POST)**
- **Cadastro sem preencher campos obrigatórios (POST)**
- **Cadastro com e-mail inválido (POST)**

## 🛠️ Funcionalidades Implementadas

### Comandos Customizados
- `cy.login()` - Login automático no frontend
- `cy.createUser()` - Criação de usuário via API
- `cy.createProduct()` - Criação de produto via API
- `cy.checkSuccessMessage()` - Verificação de mensagens de sucesso
- `cy.checkErrorMessage()` - Verificação de mensagens de erro

### Dados de Teste
- Fixtures organizados por tipo de teste
- Dados reutilizáveis para diferentes cenários
- Validações de casos positivos e negativos

## 🚀 Melhorias Implementadas

### 1. Configuração de Ambiente
- **Arquivo `.env`**: Centraliza todas as URLs e configurações do ambiente usando dotenv
- **Configuração do Cypress**: Timeouts otimizados e configurações de retry
- **Plugin dotenv**: Carregamento automático das variáveis de ambiente

### 2. Comandos Customizados
- **Navegação**: `visitCadastro()`, `visitLogin()`, `visitProdutos()`
- **Ações**: `cadastrarUsuario()`, `fazerLogin()`
- **Utilitários**: `gerarDadosUnicos()`, `verificarMensagemSucesso()`, `verificarMensagemErro()`

### 3. Estrutura de Testes
- **Testes Frontend**: Cadastro, Login, Produtos
- **Testes API**: Cadastro de usuários, atualização, listagem, cenários positivos e negativos e exclusão.
- **Fixtures**: Dados de teste organizados

## 👨‍💻 Autor

**Iago Oliveira**

## 📝 Observações
- Todos os dados de teste são gerados dinamicamente, evitando duplicidade.
- O projeto segue boas práticas de automação, com código limpo, reutilizável e fácil de manter.
- Para upload de arquivos, utilize a pasta `cypress/fixtures`.

---