import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessScreen = ({ formType, formData, handleReset }) => (
  <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl">
    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
    <h2 className="text-2xl font-extrabold text-white mb-2">Success!</h2>
    <p className="text-gray-400 mb-6">
      You have successfully completed the {formType} process.
    </p>
    <p className="text-xs text-indigo-300">
      Welcome, {formData.name} ({formData.email})
    </p>
    <button
      onClick={() => handleReset(false)}
      className="mt-6 w-full py-3 text-sm font-semibold text-indigo-900 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition duration-200 shadow-md"
    >
      Go to Login
    </button>
  </div>
);

export default SuccessScreen;
