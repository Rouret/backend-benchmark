export interface Metrics {
    latency: number;
    requestsPerSecond: number;
    bytesPerSecond: number;
}

export interface TestCase {
    runCommand: string;
    basePath: string;
    name: string;
    url: string;
}

export interface Result {
    testCase: TestCase;
    metrics: Metrics;
    category: string;
}

export type SortMetric = "requestsPerSecond" | "latency" | "bytesPerSecond"; 
