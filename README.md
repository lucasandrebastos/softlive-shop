# 🛍️ Product Manager – CRUD App

Aplicação web para gerenciamento de produtos (CRUD) desenvolvida com **React 19**, **Vite**, **TypeScript** e **React Query**.  
Permite criar, listar, editar e excluir produtos com nome, descrição, preço e categoria.

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Instale as dependências

> Recomendado: use `pnpm` para performance e gerenciamento eficiente de pacotes

```bash
pnpm install
```

> Alternativamente, use:
> ```bash
> npm install
> # ou
> yarn install
> ```

### 3. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## 📜 Scripts disponíveis

| Comando        | Descrição                                       |
|----------------|--------------------------------------------------|
| `pnpm dev`     | Inicia o servidor de desenvolvimento             |
| `pnpm build`   | Cria a build de produção em `/dist`              |
| `pnpm preview` | Pré-visualiza a build localmente                 |
| `pnpm lint`    | Roda o linter de código (se configurado)         |

---

## 🌐 Aplicação publicada

Você pode acessar a versão online da aplicação aqui:

🔗 [https://nome-da-sua-app.vercel.app](https://nome-da-sua-app.vercel.app)

> **Observação:** substitua pelo link gerado após o deploy no [Vercel](https://vercel.com) ou [Netlify](https://netlify.com)

---

## 🧪 Stack utilizada

- ✅ React 19
- ✅ Vite
- ✅ TypeScript
- ✅ React Query
- ✅ pnpm

---

## 📁 Estrutura do projeto

```
src/
├── components/         # Componentes reutilizáveis
├── pages/              # Páginas principais (Home, Create, Edit)
├── services/           # Funções de API (fetch, create, update, delete)
├── routes/             # Configuração das rotas
├── types/              # Tipos TypeScript
├── main.tsx            # Ponto de entrada + React Query Provider
└── App.tsx             # Container de rotas
```

---

## 👨‍💻 Autor

Desenvolvido por **Lucas Bastos** – [linkedin.com/in/lucas-bastos-dev](https://linkedin.com/in/lucas-bastos-dev)

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License**.
