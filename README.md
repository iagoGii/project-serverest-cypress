# 🚀 Projeto de Automação Cypress - Serverest

Este projeto contém testes automatizados para o frontend e API da aplicação Serverest.

## 📋 Sobre o Projeto

- **Frontend**: https://front.serverest.dev/login
- **API**: https://serverest.dev/
- **Framework**: Cypress
- **Linguagem**: JavaScript

## 🏗️ Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── frontend/          # Testes E2E do frontend
│   │   ├── login.cy.js
│   │   ├── cadastro.cy.js
│   │   └── produtos.cy.js
│   └── api/              # Testes de API
│       ├── usuarios.cy.js
│       ├── produtos.cy.js
│       └── carrinhos.cy.js
├── fixtures/
│   ├── frontend/         # Dados para testes frontend
│   │   └── loginData.json
│   └── api/             # Dados para testes API
│       ├── userData.json
│       └── productData.json
├── support/
│   └── commands.js      # Comandos customizados
└── pages/              # Page Objects (estrutura preparada)
    ├── frontend/
    └── api/
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

## 🚀 Como Executar os Testes

### Executar todos os testes
```bash
npm run cypress:run
```

### Executar apenas testes de frontend
```bash
npm run cypress:run:frontend
```

### Executar apenas testes de API
```bash
npm run cypress:run:api
```

### Abrir o Cypress em modo interativo
```bash
npm run cypress:open
```

## 📝 Cenários de Teste Implementados

### ✅ Frontend (3 cenários)
1. **Login** - Validação de login com credenciais válidas e inválidas
   - Login com credenciais válidas
   - Login com credenciais inválidas
   - Validação de campos obrigatórios
   - Navegação para página de cadastro

2. **Cadastro** - Criação de novo usuário
   - Cadastro com dados válidos
   - Validação de email duplicado
   - Validação de campos obrigatórios
   - Validação de formato de email

3. **Produtos** - Navegação e interação com produtos
   - Navegação para página de produtos
   - Adição de produto ao carrinho
   - Visualização de detalhes do produto
   - Navegação para carrinho de compras
   - Logout do sistema

### ✅ API (3 cenários)
1. **Usuários** - CRUD completo de usuários
   - Listar todos os usuários
   - Criar novo usuário
   - Buscar usuário por ID
   - Atualizar usuário existente
   - Excluir usuário
   - Validação de email duplicado

2. **Produtos** - CRUD completo de produtos
   - Listar todos os produtos
   - Criar novo produto
   - Buscar produto por ID
   - Atualizar produto existente
   - Excluir produto
   - Validação de dados inválidos
   - Busca de produtos por nome

3. **Carrinhos** - Operações de carrinho de compras
   - Listar todos os carrinhos
   - Criar novo carrinho
   - Buscar carrinho por ID
   - Adicionar produto ao carrinho
   - Excluir carrinho
   - Validação de produto inexistente
   - Validação de quantidade insuficiente
   - Finalizar compra

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

## 📊 Status dos Testes

- **Testes de API**: ✅ Todos passando (6/6 testes)
- **Testes de Frontend**: ✅ Implementados e prontos para execução
- **Cobertura**: CRUD completo para usuários, produtos e carrinhos

## 🎯 Boas Práticas Aplicadas

- ✅ Estrutura organizada e escalável
- ✅ Separação clara entre testes de frontend e API
- ✅ Comandos customizados reutilizáveis
- ✅ Dados de teste em fixtures
- ✅ Validações robustas
- ✅ Tratamento de casos de erro
- ✅ Código limpo e bem documentado

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

**Iago Oliveira**