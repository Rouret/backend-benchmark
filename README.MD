# Web Framework Benchmark

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org)
[![Bun](https://img.shields.io/badge/Bun-1.0-orange.svg)](https://bun.sh)

<img src="./docs/webapp.png" alt="Webapp" width="600"/>

A comprehensive tool for comparing performance metrics across different web frameworks (Javascript).

## 🌐 Live Demo

Check out our AI-powered web application:
[https://backend-benchmark-webapp.vercel.app/](https://backend-benchmark-webapp.vercel.app/)

## Want to add new test ?

- [📝 How to Contribute](#contribute)
- OR create an issue i will do it

## 📊 Features

- Comprehensive benchmarking of web frameworks (ElysiaJS and NestJS)
- Interactive data visualization
- Performance metrics comparison
- Real-time framework ranking
- Relative performance analysis

## 🚀 Prerequisites

Required tools to run this project:

- **[Node.js](https://nodejs.org/)** (v20.x or higher)
- **[Bun](https://bun.sh/)**
- **[Encore](https://encore.dev/)**
- **[npm](https://www.npmjs.com/)**

Quick setup:

```bash
# Install Bun (macOS and Linux)
curl -fsSL https://bun.sh/install | bash

# Verify installations
node --version
bun --version
```

## 🛠️ Supported Frameworks

- **[NestJS](https://nestjs.com/)** - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **[ElysiaJS](https://elysiajs.com)** - An ergonomic framework for humans with end-to-end type safety and exceptional developer experience. Powered by Bun.
- **[Hono](https://hono.dev/)** - A fast, lightweight web framework built on Web Standards, supporting any JavaScript runtime. (Thanks @marek-e!)
- **[Encore](https://encore.dev/)** - Open Source TypeScript Backend Framework
  for robust type-safe applications

<section id="contribute"></section>

## 📝 How to Contribute

1. Initialize your project in the root folder following the pattern: `$frameworkName-$usecase`  
   Example for NestJS hello world implementation:
   [nest-hello-world](./nest-hello-world/)

2. Add your test configuration in [config.ts](./config.ts):

```typescript
"Hello World": {
    testCases: [
        {
            name: "NestJS",
            url: "http://localhost:3000",
            basePath: "nest-hello-world", // The folder name
            setupCommand: "npm run build", // Optional setup command
            runCommand: "npm run start:prod", // The run command
        },
    ],
},
```

3. Run

```typescript
bun run main.ts
```
