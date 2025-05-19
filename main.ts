import { TestConfig, TESTS } from "./config";
import { runPhase, setupPhase } from "./src/command";
import { logger } from "./src/logger";
import type { TestCase, TestResult } from "./src/types";

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
