import { httpTestRunner } from "./http";
import { extractResult } from "./result";
import { logger } from "./logger";
import type { Result, TestCase, TestResult } from "./types";

export const executeCommand = async (command: string, basePath: string, name: string, purpose: string): Promise<void> => {
    logger.info(`${purpose}: ${command} dans ${basePath}`);

    const parts = command.split(" ");
    const process = Bun.spawn(parts, {
        cwd: basePath,
        stdout: "ignore",
        stderr: "ignore"
    });
    const exitCode = await process.exited;

    if (exitCode !== 0) {
        throw new Error(`La commande ${purpose} pour ${name} a échoué avec le code ${exitCode}`);
    }
}



export const setupPhase = async ({ setupCommand, basePath, name }: TestCase): Promise<void> => {
    if (setupCommand) {
        logger.info(`Setup for ${name}...`);
        await executeCommand(setupCommand, basePath, name, "Configuration");
    }
}


export const runPhase = async ({ runCommand, basePath, name, url }: TestCase, category: string, customScript?: string): Promise<TestResult | null> => {

    logger.info(`Démarrage du serveur ${name} avec: ${runCommand}`);
    const runParts = runCommand.split(" ");
    const runProcess = Bun.spawn(runParts, {
        cwd: basePath,
        stdout: "ignore",
        stderr: "ignore"
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        const lines = await httpTestRunner(basePath, url, customScript);
        return {
            testCase: { runCommand, basePath, name, url },
            metrics: extractResult(lines),
            category
        };
    } finally {
        logger.info(`Arrêt du serveur ${name}...`);
        runProcess.kill();
    }
}
