# TaskProject - Documentação do Projeto Front-End

## 📦 Estrutura do Projeto
```
src/
├── assets/ # Arquivos estáticos (imagens, SVG, etc.)
├── components/ # Componentes reutilizáveis
│ ├── footer/ # Componente do rodapé
│ ├── loading/ # Componente de carregamento
│ ├── Nav/ # Barra de navegação
│ └── Root/ # Componente pai que define o fundo da tela
├── config/ # Configurações globais (autenticação, temas, etc.)
├── pages/ # Páginas da aplicação
│ ├── auth/ # Páginas de autenticação (login, registro)
│ ├── error/ # Página de erro genérico
│ ├── notfound/ # Página "Não encontrado"
│ └── system/ # Páginas do sistema (após autenticação)
├── utils/ # Utilitários (helpers, formatação, etc.)
│ └── auth/ # Utilitários de autenticação
├── App.css # Estilos globais
├── App.tsx # Componente raiz da aplicação
├── main.tsx # Ponto de entrada da aplicação
└── ... # Outros arquivos de configuração
```

---

## 🛠️ Tecnologias Utilizadas

- **React 19** + **TypeScript**: Para construção de componentes tipados.
- **Vite**: Bundler e servidor de desenvolvimento.
- **Material-UI (MUI)**: Componentes UI estilizados.
- **Axios**: Cliente HTTP para integração com APIs.
- **React Router**: Gerenciamento de rotas.
- **Firebase**: Autenticação e serviços em nuvem.
- **ESLint**: Padronização e linting do código.

---

## 🚀 Como Executar

1. Instale as dependências:
   
```bash
   npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Para build de produção:

```bash
npm run build
```

---


## 📝 Padrões de Criação e Organização

- Todas as novas páginas devem ter como componente pai o Root localizado em /components/Root. Esse componente define o fundo da tela e garante um layout padrão.

- Componentes reutilizáveis devem ser armazenados na pasta /components.

- As páginas da aplicação estão organizadas dentro da pasta /pages, separadas por funcionalidade.

- Funções auxiliares e lógicas compartilhaveis devem ser armazenadas em /utils.

---


## 🔄 Provider Abstrato

A classe `ApiProvider<T>` localizada em /utils/provider abstrai chamadas para a API, fornecendo métodos genéricos para manipulação de dados:

- `getOne(id)`: Retorna um registro específico

- `getMany(filter?)`: Retorna uma lista de registros, opcionalmente filtrados

- `postOne(data)`: Cria um novo registro

- `postMany(dataArray)`: Cria vários registros simultaneamente

- `putOne(id, data)`: Atualiza um registro específico

- `putMany(dataArray)`: Atualiza múltiplos registros

- `deleteOne(id)`: Exclui um registro

- `deleteMany(ids)`: Exclui múltiplos registros

Esse provider garante um código mais limpo e reutilizável ao padronizar a interação com APIs REST.

---


## ✅ Boas Práticas

- **Separação de responsabilidades**: O código deve ser modular, com lógica de negócio separada dos componentes de interface.

- **Uso de TypeScript**: Todos os arquivos devem utilizar TypeScript para garantir tipagem estática e evitar erros comuns.

- **Padrão de commits**: Utilizar mensagens de commit descritivas e padronizadas, ex: feat: adiciona novo componente de loading.

- **Consistência no estilo de código**: O projeto utiliza ESLint para garantir a padronização do código.


---


## 🚀 Como Rodar o Projeto

### Instalação das dependências

```bash
npm install
```

### Rodando o ambiente de desenvolvimento

```bash
npm run dev
```

### Build para produção

```bash
npm run build
```

---


### Verificação de estilo de código

## 🎨 Estilização

**Cores Centralizadas**: Use as cores definidas em TS colors.ts para manter consistência.

```typescript
import { colors } from "../colors";
// Uso: background: colors.bg;
```

**CSS-in-JS**: Utilize @emotion/styled ou MUI para estilos dinâmicos.

---

## 🔐 Autenticação

**AuthMiddleware**: Gerencia acesso às rotas (ex: redirecionar usuários não autenticados).

**authUtils**: Utilitários para validação de senha, e-mail e gestão de tokens.

```typescript
// Exemplo de validação:
if (!authUtils.isValidEmail(email)) {
  alert("E-mail inválido!");
}
```

---


## 🛣️ Rotas

**Lazy Loading**: Carregamento dinâmico de páginas para otimização.

```tsx
const AuthPage = lazy(() => import("./pages/auth/auth"));
```

**Tratamento de Erros**: Rotas para error e notfound garantem experiência amigável.

---


## ✅ Boas Práticas

- **Reutilização**: Componentes comuns (ex: botões, formulários) devem ser criados em components/.

- **Tipagem Forte**: Sempre defina tipos/interfaces no TypeScript.

- **Separação de Responsabilidades**:
  - Páginas (pages/) são responsáveis por composição de componentes.
  - Lógica complexa deve ser isolada em hooks ou utilitários (utils/).

- **Clean Code**: Evite funções com mais de 30 linhas; divida em helpers quando necessário.

---


## 🎨 Paleta de Cores Padrão

| Propriedade | Valor |
|-------------|-------|
| bg | linear-gradient(90deg, #BD65CF 0%, #7F61BC 72%) |
| svg | rgba(128, 0, 128, 0.3) |
| pink | rgba(51, 2, 51, 0.81) |
| white | #FFFFFF |