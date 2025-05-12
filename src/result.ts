import type { Result } from "./types";

export const extractResult = (lines: string[]): Result => {
    const result: Result = {
        latency: 0,
        requestsPerSecond: 0,
        bytesPerSecond: 0
    };

    for (const line of lines) {
        // Extraction de la latence moyenne
        if (line.includes("Latency")) {
            const latencyMatch = line.match(/Latency\s+(\d+\.\d+)ms/);
            if (latencyMatch && latencyMatch[1]) {
                result.latency = parseFloat(latencyMatch[1]);
            }
        }

        // Extraction des requêtes par seconde
        if (line.includes("Requests/sec:")) {
            const reqMatch = line.match(/Requests\/sec:\s+(\d+\.\d+)/);
            if (reqMatch && reqMatch[1]) {
                result.requestsPerSecond = parseFloat(reqMatch[1]);
            }
        }

        // Extraction des octets par seconde
        if (line.includes("Transfer/sec:")) {
            const transferMatch = line.match(/Transfer\/sec:\s+(\d+\.\d+)(MB|KB|B)/);
            if (transferMatch && transferMatch[1] && transferMatch[2]) {
                const value = parseFloat(transferMatch[1]);
                const unit = transferMatch[2];

                // Conversion en bytes
                switch (unit) {
                    case "MB":
                        result.bytesPerSecond = value * 1024 * 1024;
                        break;
                    case "KB":
                        result.bytesPerSecond = value * 1024;
                        break;
                    case "B":
                        result.bytesPerSecond = value;
                        break;
                }
            }
        }
    }

    return result;
}
