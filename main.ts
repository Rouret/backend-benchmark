import { runPhase, setupPhase } from "./src/command";
import { logger } from "./src/logger";
import type { Test, TestCase, TestResult } from "./src/types";

const TESTS: Test = {
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

export const TestConfig = {
    duration: 30,
    nbThreads: 8,
    nbConnections: 100,
}

const runTestCase = async (testCase: TestCase, category: string, customScript?: string): Promise<TestResult | null> => {
    try {
        logger.info(`Exécution du test pour ${testCase.name}...`);
        await setupPhase(testCase);
        return await runPhase(testCase, category, customScript);
    } catch (error) {
        logger.error(`Erreur lors de l'exécution`, error);
        return null;
    }
}

const runAllTests = async () => {
    const allResults: TestResult[] = [];

    for (const category in TESTS) {

        const categoryTests = TESTS[category]?.testCases;

        if (categoryTests && Array.isArray(categoryTests)) {
            logger.info(`Démarrage des tests pour la catégorie "${category}"`);

            for (const testCase of categoryTests) {
                const result = await runTestCase(testCase, category, TESTS[category]?.customScript);
                if (result) {
                    allResults.push(result);
                    logger.success(`Test ${testCase.name} terminé avec succès`);
                } else {
                    logger.warn(`Test ${testCase.name} n'a pas produit de résultat`);
                }
            }
        }
    }

    return allResults;
}

const numberOfTests = Object.keys(TESTS).reduce((acc, category) => acc + (TESTS[category]?.testCases?.length || 0), 0);
const estimatedTimes = numberOfTests * TestConfig.duration;

logger.info(`Minimum time to run all tests: ${estimatedTimes} seconds`);

const result = await runAllTests();

Bun.write("./webapp/src/result.json", JSON.stringify(result, null, 2));
