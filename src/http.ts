export const httpTestRunner = async (basePath: string, url: string, customScript?: string): Promise<string[]> => {
    const args = ["wrk", "-t8", "-c100", "-d30s"];

    if (customScript) {
        args.push(`-s`);
        args.push(`/Users/lucasrouret/Documents/lab/benchmark/scripts/${customScript}`);
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
