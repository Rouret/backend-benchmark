import type { SortMetric } from "../domain/benchmark.types";
import { useBenchmarkResults } from "../infra/useBenchmarkResults";
import { BenchmarkCharts } from "./BenchmarkCharts";

export const BenchmarkView = () => {
  const {
    categories,
    currentCategory,
    sortBy,
    selectedFramework,
    filteredResults,
    rankings,
    setActiveCategory,
    setSortBy,
    setSelectedFramework,
    getComparisonRatio,
  } = useBenchmarkResults();

  // Function to display rank with indicator
  const getRankLabel = (rank: number) => {
    if (rank === 1) return "🥇 ";
    if (rank === 2) return "🥈 ";
    if (rank === 3) return "🥉 ";
    return "";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Benchmark Results</h1>
      {/* Tabs */}
      <div className="flex space-x-1 rounded-xl border border-gray-700 p-1">
        {categories.map((category) => (
          <button
            key={category}
            className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 
              ${
                category === currentCategory
                  ? "border-gray-500 border text-gray-100"
                  : "text-gray-400 hover:text-gray-100 hover:border-gray-700 hover:border"
              }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {/* Controls */}
        <div className="flex items-center gap-4 mb-6">
          <label className="text-gray-300">Sort by: </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortMetric)}
            className="bg-transparent rounded-md border-gray-700 text-gray-100 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          >
            <option value="requestsPerSecond">Requests/sec</option>
            <option value="latency">Latency</option>
            <option value="bytesPerSecond">Throughput</option>
          </select>
          {selectedFramework && (
            <button
              className="ml-4 px-4 py-2 text-sm font-medium text-gray-300 border border-gray-700 rounded-md hover:border-gray-500 hover:text-gray-100"
              onClick={() => setSelectedFramework(null)}
            >
              Clear Selection
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="border-b border-gray-700 px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Framework
                </th>
                <th className="border-b border-gray-700 px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Latency (ms)
                </th>
                <th className="border-b border-gray-700 px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Requests/sec
                </th>
                <th className="border-b border-gray-700 px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Throughput (MB/sec)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => {
                const ranking = rankings.find(
                  (r) => r.name === result.testCase.name
                )!;

                const selectedResult = selectedFramework
                  ? filteredResults.find(
                      (r) => r.testCase.name === selectedFramework
                    )
                  : null;

                const latencyRatio = selectedResult
                  ? getComparisonRatio(
                      result.metrics.latency,
                      selectedResult.metrics.latency,
                      false
                    )
                  : "";

                const requestsRatio = selectedResult
                  ? getComparisonRatio(
                      result.metrics.requestsPerSecond,
                      selectedResult.metrics.requestsPerSecond,
                      true
                    )
                  : "";

                const bytesRatio = selectedResult
                  ? getComparisonRatio(
                      result.metrics.bytesPerSecond,
                      selectedResult.metrics.bytesPerSecond,
                      true
                    )
                  : "";

                return (
                  <tr
                    key={index}
                    className={`hover:bg-gray-800/50 cursor-pointer border-b border-gray-700 ${
                      result.testCase.name === selectedFramework
                        ? "bg-gray-800/25"
                        : ""
                    }`}
                    onClick={() => setSelectedFramework(result.testCase.name)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {result.testCase.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {getRankLabel(ranking.latencyRank)}
                      {result.metrics.latency}
                      {latencyRatio && (
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                            latencyRatio.startsWith("+")
                              ? "border-green-500 text-green-400"
                              : "border-red-500 text-red-400"
                          }`}
                        >
                          {latencyRatio}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {getRankLabel(ranking.requestsRank)}
                      {result.metrics.requestsPerSecond.toLocaleString()}
                      {requestsRatio && (
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                            requestsRatio.startsWith("+")
                              ? "border-green-500 text-green-400"
                              : "border-red-500 text-red-400"
                          }`}
                        >
                          {requestsRatio}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {getRankLabel(ranking.bytesRank)}
                      {(result.metrics.bytesPerSecond / 1024 / 1024).toFixed(2)}
                      {bytesRatio && (
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                            bytesRatio.startsWith("+")
                              ? "border-green-500 text-green-400"
                              : "border-red-500 text-red-400"
                          }`}
                        >
                          {bytesRatio}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Info */}
        <div className="mt-4 text-sm text-gray-400">
          {selectedFramework ? (
            <p>
              Current selection:{" "}
              <span className="font-medium text-gray-100">
                {selectedFramework}
              </span>
              . Click another framework to see the difference.
            </p>
          ) : (
            <p className="italic">
              👆 Click any framework to select it as comparison reference
            </p>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-4 mt-20">Charts</h1>
        {/* Charts */}
        <BenchmarkCharts data={filteredResults} />
      </div>
    </div>
  );
};
