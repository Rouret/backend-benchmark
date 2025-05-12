# Web Framework Performance Benchmark

This project provides a comprehensive performance comparison between various web frameworks, featuring an interactive visualization dashboard to analyze and compare results.

## Why This Tool?

Web framework selection is a critical decision in software development. Performance metrics are essential data points in this decision-making process, but raw benchmark numbers can be difficult to interpret. This tool aims to:

1. **Standardize Testing:** Create a consistent methodology for comparing web frameworks
2. **Visualize Performance:** Present benchmark data in an intuitive, interactive interface
3. **Enable Smart Decisions:** Help developers make informed choices based on quantitative performance data
4. **Support Comparison:** Allow direct framework-to-framework comparison with relative performance indicators

## Benchmarking Tools

- **[wrk](https://github.com/wg/wrk)**: A modern HTTP benchmarking tool capable of generating significant load when run on a single multi-core CPU.

## Frameworks Tested

Basic tests with a simple endpoint returning "Hello World" string:

- [NestJs](./nest-hello-world/) - A progressive Node.js framework for building efficient and scalable server-side applications
- [ElysiaJs](./elysia-hello-world/) - A Bun-first framework with end-to-end type safety

## How to Use the Visualization Dashboard

The performance visualization dashboard provides an interactive interface for exploring benchmark results:

### Features

1. **Category Tabs**: Switch between different test categories
2. **Sorting Options**: Sort results by Requests/sec, Latency, or Throughput
3. **Interactive Comparison**: Click on any framework to select it as a reference for comparison
4. **Performance Metrics**:
   - **Latency (ms)**: Time to respond to a request (lower is better)
   - **Requests/sec**: Number of requests handled per second (higher is better)
   - **Throughput (MB/sec)**: Data transfer rate (higher is better)
5. **Ranking Indicators**:
   - 🥇 First place
   - 🥈 Second place
   - 🥉 Third place
   - #n Position number for other ranks
6. **Relative Performance**: When a framework is selected, see how others compare:
   - `+2.0x` means 2 times better than the selected framework
   - `-3.0x` means 3 times worse than the selected framework

### How to Run the Dashboard

```bash
# Navigate to the webapp directory
cd webapp

# Install dependencies
npm install

# Start the development server
npm run dev
```
