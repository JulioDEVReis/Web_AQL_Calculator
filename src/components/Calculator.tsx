import React, { useState } from 'react';

interface CalculationResult {
  aqlCount: number;
  inspectionQuantity: string;
  periodicity: number;
  intervals: Array<{
    start: number;
    end: number;
  }>;
  defects: {
    critical: number;
    major: number;
    minor: number;
  };
}

export function Calculator() {
  const [batchSize, setBatchSize] = useState('');
  const [results, setResults] = useState<CalculationResult | null>(null);

  const calculateAQL = () => {
    if (!batchSize) {
      alert('Please enter a batch size');
      return;
    }

    const size = parseInt(batchSize);
    const aqlCount = size <= 35000 ? 2 : 3;
    const inspectionQuantity = size <= 35000 ? "100, 100 (Total: 200)" : "66, 66, 68 (Total: 200)";
    const periodicity = size / (aqlCount - 1);

    setResults({
      aqlCount,
      inspectionQuantity,
      periodicity,
      intervals: calculateIntervals(size, periodicity),
      defects: calculateDefects(size)
    });
  };

  const calculateIntervals = (size: number, periodicity: number) => {
    const intervals = [];
    let start = 0;
    let end = periodicity / 2;

    for (let i = 0; i < (size <= 35000 ? 2 : 3); i++) {
      intervals.push({
        start: Math.round(start),
        end: Math.round(end)
      });
      start = end + 1;
      end = start + periodicity;
      if (end > size) end = size;
    }

    return intervals;
  };

  const calculateDefects = (size: number) => {
    if (size <= 35000) {
      return {
        critical: 0,
        major: 3,
        minor: 14
      };
    }
    return {
      critical: 0,
      major: 5,
      minor: 21
    };
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Batch Size
          </label>
          <input
            type="number"
            value={batchSize}
            onChange={(e) => setBatchSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter batch size"
          />
        </div>

        <button
          onClick={calculateAQL}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Calculate AQL
        </button>

        {results && (
          <div className="mt-8 space-y-6 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900">Results</h2>
            
            <div className="grid gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900">AQL Information</h3>
                <div className="mt-2 space-y-2 text-sm text-gray-600">
                  <p>Number of AQLs: {results.aqlCount}</p>
                  <p>Inspection Quantity: {results.inspectionQuantity}</p>
                  <p>Periodicity: {Math.round(results.periodicity)}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900">Intervals</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  {results.intervals.map((interval, index) => (
                    <p key={index}>
                      AQL {index + 1}: {interval.start} to {interval.end}
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900">Acceptable Defects</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Critical: {results.defects.critical}</p>
                  <p>Major: {results.defects.major}</p>
                  <p>Minor: {results.defects.minor}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}