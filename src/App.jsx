import React from 'react';
import { Mail, Lock, User, ArrowRight, XCircle } from 'lucide-react';
import { useFormLogic } from './hooks/useFormLogic';
import CustomInput from './components/inputs/CustomInput';
import CheckboxInput from './components/inputs/CheckboxInput';
import StepIndicator from './components/ui/StepIndicator';
import SuccessScreen from './components/ui/SuccessScreen';

const App = () => {
  const {
    isRegistering,
    setIsRegistering,
    step,
    setStep,
    formData,
    errors,
    submissionStatus,
    formType,
    maxStep,
    successStep,
    isStepValid,
    handleChange,
    handleBlur,
    handleNext,
    handleSubmit,
    handleReset,
  } = useFormLogic();

  const renderStepContent = () => {
    if (step === successStep)
      return (
        <SuccessScreen
          formType={formType}
          formData={formData}
          handleReset={handleReset}
        />
      );

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isRegistering ? `Registration - Step ${step} of 3` : 'Login'}
        </h2>

        {/* Step 1 */}
        {(!isRegistering || step === 1) && (
          <>
            <CustomInput
              id="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              icon={User}
            />
            <CustomInput
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              icon={Mail}
            />
          </>
        )}

        {/* Step 2 */}
        {(!isRegistering || step === 2) && (
          <>
            <CustomInput
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              icon={Lock}
            />
            {isRegistering && (
              <CustomInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                icon={Lock}
              />
            )}
          </>
        )}

        {/* Step 3 */}
        {isRegistering && step === 3 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Gender
              </label>
              <div className="flex gap-6 text-gray-300">
                {['male', 'female', 'other'].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="text-indigo-500 focus:ring-indigo-500 border-gray-600 bg-gray-700"
                    />
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="mt-1 text-xs text-red-400">{errors.gender}</p>
              )}
            </div>

            <CheckboxInput
              id="termsAccepted"
              label="I agree to the Terms and Conditions"
              checked={formData.termsAccepted}
              onChange={handleChange}
              error={errors.termsAccepted}
            />
          </>
        )}

        {/* Buttons */}
        <div className="mt-6">
          <button
            onClick={isRegistering ? handleNext : handleSubmit}
            disabled={!isStepValid || submissionStatus === 'loading'}
            className={`w-full py-3 flex items-center justify-center rounded-lg font-semibold transition duration-200 ${
              isStepValid && submissionStatus !== 'loading'
                ? 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-md'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {submissionStatus === 'loading' ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                {isRegistering && step < maxStep ? 'Next Step' : formType}
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>

          {submissionStatus === 'error' && (
            <p className="flex items-center justify-center mt-4 text-sm text-red-400">
              <XCircle className="w-4 h-4 mr-2" /> Please fix the errors above.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl backdrop-blur-sm">
        {step !== successStep && (
          <>
            <div className="flex w-full p-2 bg-gray-700 rounded-t-xl">
              <button
                onClick={() => handleReset(false)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition duration-300 ${
                  !isRegistering
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-600'
                }`}
              >
                <User className="inline w-4 h-4 mr-2" /> Login
              </button>
              <button
                onClick={() => handleReset(true)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition duration-300 ${
                  isRegistering
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-600'
                }`}
              >
                <User className="inline w-4 h-4 mr-2" /> Register
              </button>
            </div>

            {isRegistering && <StepIndicator step={step} />}
          </>
        )}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default App;
