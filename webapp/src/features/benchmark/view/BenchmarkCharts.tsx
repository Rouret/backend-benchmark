import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { Result } from "../domain/benchmark.types";

interface BenchmarkChartsProps {
  data: Result[];
}

export const BenchmarkCharts = ({ data }: BenchmarkChartsProps) => {
  // Préparer les données pour les graphiques
  const chartData = data.map((result) => ({
    name: result.testCase.name,
    requestsPerSecond: result.metrics.requestsPerSecond,
    latency: result.metrics.latency,
    throughput: Number(
      (result.metrics.bytesPerSecond / 1024 / 1024).toFixed(2)
    ),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* Graphique des Requêtes/s */}
      <div className="p-6 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-100 mb-4">
          Requests per Second
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "#f3f4f6" }}
                itemStyle={{ color: "#9ca3af" }}
              />
              <Bar
                dataKey="requestsPerSecond"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-green-400"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Graphique de Latence */}
      <div className="p-6 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-100 mb-4">Latency (ms)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}ms`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "#f3f4f6" }}
                itemStyle={{ color: "#9ca3af" }}
              />
              <Bar
                dataKey="latency"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-blue-400"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Graphique de Débit */}
      <div className="p-6 border border-gray-700 rounded-lg md:col-span-2">
        <h3 className="text-lg font-medium text-gray-100 mb-4">
          Throughput (MB/s)
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} MB/s`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "#f3f4f6" }}
                itemStyle={{ color: "#9ca3af" }}
              />
              <Bar
                dataKey="throughput"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-purple-400"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
