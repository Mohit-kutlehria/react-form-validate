import React from 'react';

const CustomInput = React.memo(
  ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    onBlur,
    error,
    icon: Icon,
  }) => (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-indigo-400" />
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full py-2 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 bg-gray-700 text-white
          ${Icon ? 'pl-10' : 'pl-4'}
          ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-600 focus:ring-indigo-500 focus:border-indigo-500'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
);

export default CustomInput;
