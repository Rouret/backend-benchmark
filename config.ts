import type { Test } from "./src/types";


export const TestConfig = {
    duration: 30,
    nbThreads: 8,
    nbConnections: 100,
}

export const TESTS: Test = {
    "Hello World": {
        testCases: [
            {
                name: "NestJs",
                url: "http://localhost:3000",
                basePath: "nest-hello-world",
                setupCommand: "npm run build",
                runCommand: "npm run start:prod",
            },
            {
                name: "ElysiaJs",
                url: "http://localhost:3000",
                basePath: "elysia-hello-world",
                runCommand: "bun run start",
            },
            {
                name: "Hono",
                url: "http://localhost:3000",
                basePath: "hono-hello-world",
                runCommand: "bun run dev",
            },
        ],
    },
    "Input Validation": {
        testCases: [
            {
                name: "NestJs",
                url: "http://localhost:3000",
                basePath: "nest-input-validation",
                setupCommand: "npm run build",
                runCommand: "npm run start:prod",
            },
            {
                name: "ElysiaJs",
                url: "http://localhost:3000",
                basePath: "elysia-hello-world",
                runCommand: "bun run start",
            },
            {
                name: "Hono",
                url: "http://localhost:3000",
                basePath: "hono-input-validation",
                runCommand: "bun run dev",
            },
        ],
        customScript: "post-input-validation.lua"
    }
}
