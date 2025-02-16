import React from 'react';

interface ResultsProps {
  results: {
    aqlCount: number;
    inspectionQuantity: string;
    periodicity: number;
    intervals: Array<{ start: number; end: number }>;
    defects: {
      critical: number;
      major: number;
      minor: number;
    };
  };
}

export function Results({ results }: ResultsProps) {
  return (
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
                AQL {index + 1}: {Math.round(interval.start)} to {Math.round(interval.end)}
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
  );
}