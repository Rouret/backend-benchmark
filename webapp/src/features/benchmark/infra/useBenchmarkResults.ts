import { useMemo, useState } from 'react';
import results from '../../../result.json';
import type { Result, SortMetric } from '../domain/benchmark.types';

export const useBenchmarkResults = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortMetric>("requestsPerSecond");
    const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

    const categories = useMemo(() => {
        const uniqueCategories = new Set<string>();
        (results as Result[]).forEach((result) => {
            uniqueCategories.add(result.category);
        });
        return Array.from(uniqueCategories);
    }, []);

    const currentCategory = activeCategory || categories[0];

    const filteredResults = useMemo(() => {
        return (results as Result[])
            .filter((result) => result.category === currentCategory)
            .sort((a, b) => {
                if (sortBy === "latency") {
                    return a.metrics.latency - b.metrics.latency;
                } else if (sortBy === "requestsPerSecond") {
                    return b.metrics.requestsPerSecond - a.metrics.requestsPerSecond;
                } else {
                    return b.metrics.bytesPerSecond - a.metrics.bytesPerSecond;
                }
            });
    }, [currentCategory, sortBy]);

    const rankings = useMemo(() => {
        const latencyRank = [...filteredResults].sort(
            (a, b) => a.metrics.latency - b.metrics.latency
        );
        const requestsRank = [...filteredResults].sort(
            (a, b) => b.metrics.requestsPerSecond - a.metrics.requestsPerSecond
        );
        const bytesRank = [...filteredResults].sort(
            (a, b) => b.metrics.bytesPerSecond - a.metrics.bytesPerSecond
        );

        const getRank = (array: Result[], result: Result) =>
            array.findIndex((item) => item.testCase.name === result.testCase.name) + 1;

        return filteredResults.map((result) => ({
            name: result.testCase.name,
            latencyRank: getRank(latencyRank, result),
            requestsRank: getRank(requestsRank, result),
            bytesRank: getRank(bytesRank, result),
        }));
    }, [filteredResults]);

    const getComparisonRatio = (
        value: number,
        referenceValue: number,
        higherIsBetter: boolean
    ): string => {
        if (!selectedFramework) return "";
        if (value === referenceValue) return "";

        let ratio: number;
        let isImprovement: boolean;

        if (higherIsBetter) {
            ratio = value / referenceValue;
            isImprovement = ratio > 1;
        } else {
            ratio = value / referenceValue;
            isImprovement = ratio < 1;
        }

        const formattedRatio = (isImprovement ? ratio : 1 / ratio).toFixed(1);
        return isImprovement ? `+${formattedRatio}x` : `-${formattedRatio}x`;
    };

    return {
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
    };
}; 
