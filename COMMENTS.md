# COMMENTS.md

## 1) Arquitetura da Solução

A aplicação foi construída utilizando **NestJS v11 (Node.js + TypeScript)** com uma arquitetura modular baseada em princípios de **Clean Architecture** e **Domain-Driven Design em sua forma pragmática (DDD-Lite)**.

Cada módulo representa um _bounded context_ isolado. No caso do módulo `student`, a estrutura foi organizada em quatro camadas principais, respeitando o princípio de dependência para dentro (camadas externas dependem das internas, nunca o contrário):

### Presentation Layer

Responsável exclusivamente pela interface HTTP da aplicação. Contém os controllers que recebem as requisições, validam os dados via DTOs e delegam a execução para os casos de uso.

Não contém regras de negócio.

### Application Layer

Contém os _use cases_ da aplicação, responsáveis por orquestrar o fluxo de execução. Essa camada coordena as operações do domínio através de contratos, sem conhecer detalhes de infraestrutura.

Aqui ficam também DTOs de aplicação e erros específicos do fluxo.

### Domain Layer

Representa o núcleo do negócio. Contém:

- Entidades
- Value Objects
- Regras de domínio
- Erros de domínio
- Interfaces de repositório

Essa camada é totalmente independente de frameworks, banco de dados ou bibliotecas externas.

### Infrastructure Layer

Responsável pelas implementações técnicas, como:

- Entidades ORM
- Implementações concretas dos repositórios
- Mapeadores entre domínio e persistência

Essa camada depende do domínio, mas o domínio não depende dela.

### Benefícios da Arquitetura

Essa separação garante:

- Baixo acoplamento entre camadas
- Alta coesão
- Facilidade de manutenção
- Facilidade para testes unitários
- Evolução futura para arquiteturas distribuídas sem refatoração estrutural

A arquitetura segue o conceito de **DDD-Lite**, aplicando os principais conceitos do Domain-Driven Design de forma pragmática e adequada ao escopo do desafio, evitando overengineering.

---

## 2) Bibliotecas de Terceiros Utilizadas

- **NestJS** — framework principal da API.
- **@nestjs/swagger & swagger-ui-express** — documentação OpenAPI/Swagger.
- **class-validator & class-transformer** — validação e transformação de DTOs.
- **TypeORM** — ORM para PostgreSQL.
- **pg** — driver PostgreSQL.
- **dotenv** — configuração de variáveis de ambiente.

---

## 3) O que eu melhoraria com mais tempo

- Implementar **autenticação e autorização (JWT + roles)**.
- Adicionar **versionamento de API** (`/v1/students`).
- Criar **testes unitários e testes E2E** com Jest.
- Definir um **padrão global de tratamento de erros**.
- Implementar **soft delete** para preservação histórica dos dados.
- Adicionar **logs estruturados e health checks**.
- Criar documentação arquitetural com diagrama de camadas.

---

## 4) Requisitos Obrigatórios Não Entregues

- Frontend em Vue.js não foi implementado, pois o foco foi direcionado para a construção da API.

---

## Observações Técnicas

A funcionalidade de listagem de alunos suporta paginação e busca unificada através do parâmetro `q`, realizando busca parcial e case-insensitive em múltiplos campos (nome, email, RA e CPF), mantendo a API simples e alinhada ao escopo do desafio.

A exclusão de registros foi implementada como **hard delete**, seguindo estritamente o critério de aceite do desafio. Em um cenário de produção, seria recomendada a adoção de soft delete.
