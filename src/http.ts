import { TestConfig } from "../config";

export const httpTestRunner = async (basePath: string, url: string, customScript?: string): Promise<string[]> => {
    const args = ["wrk", `-t${TestConfig.nbThreads}`, `-c${TestConfig.nbConnections}`, `-d${TestConfig.duration}s`];
    const currentDir = import.meta.dir;

    if (customScript) {
        args.push(`-s`);
        args.push(`${currentDir}/../scripts/${customScript}`);
    }

    args.push(url);

    const subprocess = Bun.spawn(args, {
        cwd: basePath,
        stdout: "pipe",
        stderr: "ignore"
    });

    const output = await new Response(subprocess.stdout).text();
    await subprocess.exited;
    return output.split("\n").filter(line => line.trim() !== "");
}
