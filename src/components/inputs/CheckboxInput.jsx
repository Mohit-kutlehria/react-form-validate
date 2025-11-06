import React from 'react';

const CheckboxInput = ({ id, label, checked, onChange, error }) => (
  <div className="mb-4">
    <div className="flex items-start">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 rounded text-indigo-600 border-gray-600 focus:ring-indigo-500 bg-gray-700"
      />
      <label
        htmlFor={id}
        className={`ml-3 text-sm font-medium ${
          error ? 'text-red-400' : 'text-gray-300'
        }`}
      >
        {label}
      </label>
    </div>
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

export default CheckboxInput;
