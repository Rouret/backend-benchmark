export type TestCase = {
    name: string;
    url: string;
    basePath: string;
    setupCommand?: string;
    runCommand: string;
}

export type Test = Record<string, {
    testCases: TestCase[];
    customScript?: string;
}>

export type Result = {
    latency: number;
    requestsPerSecond: number;
    bytesPerSecond: number;
}

export type TestResult = {
    testCase: TestCase;
    metrics: Result;
    category: string;
}
