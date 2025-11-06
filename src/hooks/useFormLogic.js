import { useState, useCallback, useMemo } from 'react';
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../utils/validations';

export const useFormLogic = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const formType = isRegistering ? 'Registration' : 'Login';
  const maxStep = isRegistering ? 3 : 1;
  const successStep = maxStep + 1;

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }, []);

  const runValidation = useCallback(
    (name, value) => {
      let error = null;

      if (name === 'name') error = validateName(value);
      else if (name === 'email') error = validateEmail(value);
      else if (name === 'password') error = validatePassword(value);
      else if (name === 'confirmPassword' && isRegistering) {
        if (value !== formData.password) error = 'Passwords do not match.';
        else if (!value) error = 'Confirmation is required.';
      } else if (name === 'gender' && isRegistering && !value)
        error = 'Please select a gender.';
      else if (name === 'termsAccepted' && isRegistering && !value)
        error = 'You must accept the terms and conditions.';

      return error;
    },
    [formData.password, isRegistering]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (e.target.type === 'checkbox' || e.target.type === 'radio') return;
      const error = runValidation(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [runValidation]
  );

  const validateCurrentStep = useCallback(() => {
    const fields = !isRegistering
      ? ['name', 'email', 'password']
      : step === 1
      ? ['name', 'email']
      : step === 2
      ? ['password', 'confirmPassword']
      : ['gender', 'termsAccepted'];

    const stepErrors = {};
    fields.forEach((field) => {
      const error = runValidation(field, formData[field]);
      if (error) stepErrors[field] = error;
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }, [formData, isRegistering, runValidation, step]);

  const handleSubmit = useCallback(() => {
    if (!validateCurrentStep()) {
      setSubmissionStatus('error');
      return;
    }

    setSubmissionStatus('loading');
    setTimeout(() => {
      setSubmissionStatus('success');
      setStep(successStep);
    }, 1000);
  }, [validateCurrentStep, successStep]);

  const handleNext = useCallback(() => {
    if (step === maxStep) handleSubmit();
    else if (validateCurrentStep()) {
      setErrors({});
      setStep(step + 1);
    } else {
      setSubmissionStatus('error');
    }
  }, [step, maxStep, handleSubmit, validateCurrentStep]);

  const handleReset = useCallback((isReg) => {
    setIsRegistering(isReg);
    setStep(1);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      termsAccepted: false,
    });
    setErrors({});
    setSubmissionStatus(null);
  }, []);

  const isStepValid = useMemo(() => {
    const hasErrors = Object.values(errors).some((e) => e !== null);
    if (hasErrors) return false;
    if (!isRegistering)
      return (
        !validateName(formData.name) &&
        !validateEmail(formData.email) &&
        !validatePassword(formData.password)
      );
    if (step === 1)
      return !validateName(formData.name) && !validateEmail(formData.email);
    if (step === 2)
      return (
        !validatePassword(formData.password) &&
        !runValidation('confirmPassword', formData.confirmPassword)
      );
    if (step === 3) return formData.gender !== '' && formData.termsAccepted;
    return false;
  }, [formData, errors, step, isRegistering, runValidation]);

  return {
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
  };
};
