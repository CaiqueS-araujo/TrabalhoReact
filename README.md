# ⚡ Liga Pokémon





\

## 📖 Sobre o Projeto

**Liga Pokémon** é uma aplicação web desenvolvida durante a residência TIC do **Serratec**, inspirada no universo Pokémon.

O projeto tem como objetivo aplicar conceitos modernos de desenvolvimento web, incluindo consumo de APIs externas, autenticação de usuários, rotas protegidas, acessibilidade e integração entre front-end e back-end.

A aplicação permite que os usuários explorem informações dos Pokémon através da Pokédex, montem equipes personalizadas utilizando Pokémon de diferentes gerações e participem de batalhas simuladas contra adversários aleatórios.

---

## 🎯 Objetivos do Projeto

* Praticar consumo de APIs REST.
* Desenvolver uma aplicação React completa.
* Implementar autenticação utilizando JWT.
* Trabalhar com rotas privadas.
* Integrar front-end e back-end.
* Aplicar conceitos de acessibilidade.
* Utilizar banco de dados PostgreSQL.
* Simular cenários reais de desenvolvimento web.

---

# 🚀 Funcionalidades

## 🔐 Sistema de Login

A aplicação possui um sistema de autenticação próprio desenvolvido em Java utilizando Spring Boot.

### Recursos

* Cadastro de usuários
* Login autenticado
* Geração de Token JWT
* Armazenamento do token no Local Storage
* Controle de sessão
* Proteção de rotas privadas

O usuário precisa estar autenticado para acessar as funcionalidades principais da aplicação.

---

## 📚 Pokédex

A Pokédex permite consultar informações dos Pokémon consumindo dados diretamente da PokéAPI.

### Funcionalidades

* Busca por nome do Pokémon
* Busca por ID do Pokémon
* Exibição de imagem
* Exibição do nome
* Exibição dos tipos
* Consulta dinâmica via API

---

## ⚔️ Liga Pokémon

A principal funcionalidade do projeto.

Nela o usuário pode:

* Selecionar Pokémon de diferentes gerações
* Montar seu próprio time
* Criar estratégias de batalha
* Enfrentar Pokémon gerados aleatoriamente
* Simular batalhas

Todos os dados utilizados são obtidos através da PokéAPI.

---

## 🌙 Tema Claro e Escuro

A aplicação possui alternância entre:

* ☀️ Modo Claro
* 🌙 Modo Escuro

Proporcionando melhor experiência visual para diferentes preferências dos usuários.

---

## ♿ Acessibilidade

O projeto conta com integração do **VLibras**, oferecendo suporte de acessibilidade para usuários com deficiência auditiva.

---

## 🚫 Página de Erro

A aplicação possui uma página de erro personalizada para rotas inexistentes.

Caso o usuário tente acessar uma rota inválida, será redirecionado para uma página de erro amigável.

---

# 🔒 Segurança

## JWT

A autenticação utiliza JSON Web Token (JWT).

Fluxo:

1. Usuário realiza login.
2. API valida as credenciais.
3. Token JWT é gerado.
4. Token é armazenado no Local Storage.
5. Rotas protegidas verificam a existência do token.
6. Caso não exista token válido, o acesso é bloqueado.

---

# 🔗 APIs Utilizadas

## PokéAPI

Responsável por fornecer:

* Nome dos Pokémon
* Imagens
* Tipos
* Informações gerais
* Dados utilizados na simulação de batalhas

## API Login

API própria desenvolvida para:

* Cadastro de usuários
* Login
* Geração de JWT
* Validação de acesso

---

# 🛠 Tecnologias Utilizadas

## Front-End

* React
* Vite
* React Router DOM
* Axios
* CSS Modules

## Back-End

* Java 17
* Spring Boot
* Spring Security
* JWT

## Banco de Dados

* PostgreSQL

## APIs

* PokéAPI
* API Login

---

# 📂 Estrutura Geral do Projeto

```text
LigaPokemon/
│
├── API_LOGIN/
│   └── apiLogin-0.0.1-SNAPSHOT.jar
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── routes/
│   ├── services/
│   └── assets/
│
├── public/
│
├── package.json
│
└── README.md
```

---

# ⚙️ Requisitos para Execução

## Front-End

* Node.js instalado
* NPM instalado

## Back-End

* Java 17.0.2 LTS
* Java configurado nas variáveis de ambiente do sistema

---

# 🚀 Como Executar o Projeto

## 1️⃣ Clonar o Repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2️⃣ Abrir o Projeto

Abra a pasta do projeto utilizando o VS Code.

---

## 3️⃣ Executar a API

A API encontra-se dentro da pasta:

```text
API_LOGIN
```

Abra um terminal dentro desta pasta.

Execute:

```bash
java -jar apiLogin-0.0.1-SNAPSHOT.jar
```

Aguarde a inicialização completa da API.

⚠️ É obrigatório executar a API antes de iniciar o Front-End.

---

## 4️⃣ Executar o Front-End

Abra um terminal na raiz do projeto.

Execute:

```bash
npm install
```

Depois:

```bash
npm run dev
```

Após a inicialização, o Vite exibirá o endereço local da aplicação.

Normalmente:

```text
http://localhost:5173
```

---

# 🔑 Credenciais para Teste

Utilize as seguintes credenciais para acessar o sistema:

### Usuário

```text
teste@gmail.com
```

### Senha

```text
teste4434
```

---

# 🧠 Conceitos Aplicados

* Consumo de APIs REST
* React Hooks
* Componentização
* Rotas protegidas
* JWT
* Spring Security
* Integração Front-End e Back-End
* PostgreSQL
* Local Storage
* Acessibilidade
* Responsividade
* Simulação de regras de negócio

---

# 👨‍💻 Equipe

* Kaique Abranches
* Douglas
* Paulo Guilherme
* Gabriel Mendonça
* Caique Araújo

---

# 🎓 Projeto Acadêmico

Projeto desenvolvido durante a residência TIC do Serratec, com foco na aplicação prática de tecnologias modernas para desenvolvimento web, integração de sistemas e consumo de APIs.

---

## 📜 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos e educacionais.
