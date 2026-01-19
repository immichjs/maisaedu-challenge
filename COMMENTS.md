## 1) Arquitetura da Solução

A solução foi construída com **separação clara entre Backend e Frontend**, cada um adotando boas práticas adequadas ao seu contexto, mantendo foco em legibilidade, manutenção e alinhamento com os critérios do desafio.

---

### Backend (API)

A API foi desenvolvida utilizando **NestJS v11 (Node.js + TypeScript)**, seguindo uma arquitetura modular baseada nos princípios de **Clean Architecture** e **Domain-Driven Design em sua forma pragmática (DDD-Lite)**.

Cada módulo representa um *bounded context* isolado. No caso do módulo `student`, a estrutura foi organizada em quatro camadas principais, respeitando o princípio de dependência para dentro (camadas externas dependem das internas, nunca o contrário).

#### Presentation Layer

Responsável exclusivamente pela interface HTTP da aplicação. Contém os controllers que:

* Recebem as requisições
* Validam dados via DTOs
* Delegam a execução para os casos de uso

Não contém regras de negócio.

#### Application Layer

Contém os **use cases**, responsáveis por orquestrar o fluxo de execução da aplicação.
Essa camada coordena as operações do domínio através de contratos, sem conhecer detalhes de infraestrutura.

Aqui também ficam DTOs de aplicação e erros específicos de fluxo.

#### Domain Layer

Representa o núcleo do negócio e contém:

* Entidades
* Value Objects
* Regras de domínio
* Erros de domínio
* Interfaces de repositório

Essa camada é totalmente independente de frameworks, banco de dados ou bibliotecas externas.

#### Infrastructure Layer

Responsável pelas implementações técnicas, como:

* Entidades ORM
* Implementações concretas dos repositórios
* Mapeadores entre domínio e persistência

Essa camada depende do domínio, mas o domínio não depende dela.

#### Benefícios da Arquitetura Backend

* Baixo acoplamento entre camadas
* Alta coesão
* Facilidade de manutenção
* Facilidade para testes unitários
* Evolução futura sem refatorações estruturais

A abordagem segue **DDD-Lite**, aplicando os principais conceitos do DDD de forma pragmática e adequada ao escopo do desafio, evitando overengineering.

---

### Frontend (Web)

O frontend foi desenvolvido com **Vue 3 + TypeScript**, utilizando **Vuetify** como biblioteca de UI, com foco em clareza, organização e experiência do usuário.

#### Estrutura e Organização

* **File-based routing** para definição de rotas
* Componentização por responsabilidade:

  * `StudentsTable`
  * `StudentActions`
  * `StudentDeleteDialog`
  * `StudentsHeader`
  * `StudentsPagination`
* Separação clara entre:

  * Pages (orquestração)
  * Components (UI reutilizável)
  * Services (comunicação com API)

#### Comunicação com a API

A comunicação com o backend foi centralizada em **services**, isolando chamadas HTTP e facilitando manutenção e possíveis refatorações futuras.

#### Gerenciamento de Estado

Foi utilizado **Pinia** de forma enxuta, apenas para estados globais realmente necessários (ex: snackbar/notificações), evitando complexidade desnecessária.

#### Validações e UX

* Validações básicas no frontend para feedback imediato ao usuário
* Mensagens de sucesso e erro centralizadas via snackbar
* Fluxos claros de criação, edição, listagem e exclusão

#### Decisões Importantes no Frontend

* **CPF e RA não são editáveis** após criação, refletindo regra de negócio
* O RA é gerado no frontend para acelerar a entrega
* Máscara de CPF aplicada apenas para exibição, mantendo envio normalizado para a API
* Paginação e busca são feitas via backend, mantendo o frontend simples e performático

---

## 2) Bibliotecas de Terceiros Utilizadas

### Backend

* **NestJS** — framework principal da API
* **@nestjs/swagger & swagger-ui-express** — documentação OpenAPI
* **class-validator & class-transformer** — validação e transformação de DTOs
* **TypeORM** — ORM para PostgreSQL
* **pg** — driver PostgreSQL
* **dotenv** — configuração de variáveis de ambiente

### Frontend

* **Vue 3**
* **TypeScript**
* **Vuetify** — UI framework
* **Pinia** — gerenciamento de estado global
* **Axios** — comunicação HTTP

---

## 3) O que eu melhoraria com mais tempo

### Backend

* Implementar **autenticação e autorização (Google OAuth + JWT + roles)**
* Adicionar **versionamento de API** (`/v1/students`)
* Criar **testes E2E**
* Implementar **soft delete**
* Adicionar **logs estruturados e health checks**
* Padronizar ainda mais o tratamento global de erros

### Frontend

* Adicionar **testes unitários com Vitest e Vue Test Utils**
* Criar **testes de integração simples para páginas críticas**
* Melhorar feedback visual de loading em ações específicas
* Extrair o formulário de aluno para um componente reutilizável (create/edit)
* Implementar **autenticação e autorização (Google OAuth + JWT + roles)**

---

## 4) Requisitos Obrigatórios Não Entregues

Todos os requisitos obrigatórios descritos no desafio foram entregues.

---

## Observações Técnicas

* A listagem de alunos suporta **paginação e busca unificada** via parâmetro `q`, realizando busca parcial e case-insensitive em múltiplos campos (nome, email, RA e CPF).
* A exclusão de registros foi implementada como **hard delete**, conforme critério de aceite do desafio.
* O RA é gerado no frontend utilizando o padrão `^[A-Z0-9]{6}$` para acelerar a entrega.

Em um cenário de produção, a geração do RA deveria ser responsabilidade do backend, garantindo unicidade e evitando colisões. Essa decisão foi tomada conscientemente devido à limitação de tempo e documentada explicitamente.

---

## Considerações Finais

O foco da solução foi entregar um sistema **simples, bem organizado, legível e alinhado com boas práticas**, priorizando clareza arquitetural, responsabilidade bem definida e facilidade de manutenção, sem introduzir complexidade desnecessária para o escopo do desafio.
