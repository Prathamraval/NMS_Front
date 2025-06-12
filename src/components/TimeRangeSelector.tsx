import React from 'react';
import { TimeRange } from '../types';

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ selected, onChange }) => {
  const ranges: { value: TimeRange; label: string }[] = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '90d', label: '90d' },
    { value: '1y', label: '1y' },
  ];

  return (
    <div className="flex bg-gray-700 rounded-md p-1">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            selected === range.value
              ? 'bg-indigo-600 text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;