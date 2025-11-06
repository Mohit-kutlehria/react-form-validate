import React from 'react';
import { CheckCircle } from 'lucide-react';

const StepIndicator = ({ step }) => {
  const steps = ['Name/Email', 'Password', 'Details'];
  return (
    <div className="flex justify-between p-6 pt-4">
      {steps.map((title, index) => {
        const s = index + 1;
        return (
          <div key={s} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                s === step
                  ? 'bg-indigo-500 text-white shadow-lg ring-4 ring-indigo-300/50'
                  : s < step
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-600 text-gray-400'
              }`}
            >
              {s < step ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
            <p
              className={`mt-2 text-xs font-medium text-center ${
                s === step ? 'text-indigo-400' : 'text-gray-500'
              }`}
            >
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
