# nurbxfit-cli

A lightweight CLI tool for bootstrapping new projects from nurbxfit’s GitHub starter templates.

---

## ✨ Features

- **Quick scaffolding:** Create projects from templates (e.g., Hono + React SSR).
- **Automatic git setup:** Initializes a fresh git repository.
- **Minimal & clean:** Built with TypeScript.

---

## 📦 Installation

**Use via npx (no install required):**
```sh
npx nurbxfit-cli@latest create-cf-hono-react-ssr my-app
```

**Or install globally:**
```sh
npm install -g nurbxfit-cli
nurbxfit create-cf-hono-react-ssr my-app
```

---

## 🚀 Usage

Create a new Hono + React SSR project:
```sh
nurbxfit create-cf-hono-react-ssr my-app
```

This will:
- Clone the `cf-hono-react-ssr` template.
- Remove the old `.git` history.
- Initialize a new git repo with an initial commit.
- Set the `package.json` name to your project name.

---

## 📚 Available Commands

- `create-cf-hono-react-ssr <project-name>` — Creates a new Hono + React SSR project.

### Example: Interactive Template Selection

```sh
$ nurbxfit create my-app
? Choose a template
❯ cf-hono-react-ssr   https://github.com/nurbxfit/cf-hono-react-ssr
    cf-worker-auth-mcp  https://github.com/nurbxfit/cf-worker-anime-mcp
    js-langraph-chat    https://github.com/nurbxfit/js-langgraph-chat
```

### Example: Direct Template Selection
```sh
nurbxfit create my-app -t cf-hono-react-ssr
```
👉 It skips the prompt and goes straight to project creation.

*More templates coming soon!*

---

## 🛠 Development

Clone this repo and link it locally to test:

```sh
git clone https://github.com/nurbxfit/nurbxfit-cli.git
cd nurbxfit-cli
pnpm install
npm link   # symlinks "nurbxfit" command globally
```

Now you can run:
```sh
nurbxfit create-cf-hono-react-ssr test-app
```

Or you can preview locally without linking:
```sh
pnpm run start -- create-cf-hono-react-ssr test-app
```
or 
```sh
pnpm run preview create-cf-hono-react-ssr my-app
```