# +A Educação — Desafio Técnico

Este repositório contém a solução do desafio técnico.

## Estrutura do projeto

* `/api` — API Node.js (NestJS) ✅
* `/spa` — Aplicação Vue.js (SPA) ✅

## Requisitos

* Node.js v24+ (LTS)
* Docker e Docker Compose
* NPM (ou PNPM/Yarn)

---

## Subindo o banco de dados (PostgreSQL)

Na raiz do repositório, execute:

```bash
npm run docker:up
```

Isso irá iniciar um container PostgreSQL via Docker Compose.

> Certifique-se de que a porta configurada no `docker-compose.yml` esteja livre (default: `5432`).

---

## Rodando o Back-end (API NestJS)

1. Acesse a pasta da API:

```bash
cd api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

5. Inicie a API em modo desenvolvimento:

```bash
npm run start:dev
```

A API ficará disponível em:

```
http://localhost:3000
```

---

## Rodando o Front-end (Vue.js SPA)

1. Acesse a pasta do front-end:

```bash
cd spa
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:3001
```

> A porta pode variar conforme a configuração do Vite.

---

## Comunicação Front-end ↔ Back-end

O front-end consome a API rodando localmente.

Certifique-se de que a variável de ambiente do front-end esteja configurada corretamente:

```env
VITE_API_URL=http://localhost:3000
```

---

## Scripts úteis

### Raiz do projeto

```bash
npm run docker:up     # Sobe o banco PostgreSQL
```

### API

```bash
npm run start:dev     # API em modo desenvolvimento
npm run build         # Build de produção
npm run test          # Testes
```

### SPA

```bash
npm run dev           # Front-end em modo desenvolvimento
npm run build         # Build de produção
npm run preview       # Preview do build
```

---

## Observações

* Este projeto utiliza uma arquitetura desacoplada entre front-end e back-end.
* O ambiente foi preparado para facilitar testes locais e desenvolvimento.
* Não é necessário subir o front-end via Docker para este desafio.
