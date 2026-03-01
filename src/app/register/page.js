"use client";

import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setStep, setDirection, updateField, setErrors, persistState } from "@/store/registrationSlice";
import { useState } from "react";
import OtpModal from "@/components/registration/OtpModal";
import StepIndicator from "@/components/registration/StepIndicator";

const steps = [
  { fields: [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
    { name: "username", label: "Username", type: "text", placeholder: "johndoe" },
  ]},
  { fields: [
    { name: "email", label: "Email", type: "email", placeholder: "john@example.com" },
    { name: "phone", label: "Phone", type: "tel", placeholder: "+1 234 567 890" },
  ]},
  { fields: [
    { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
  ]},
  { fields: [
    { name: "address", label: "Address", type: "text", placeholder: "123 Main St" },
    { name: "city", label: "City", type: "text", placeholder: "New York" },
  ]},
];

const stepLabels = ["Personal", "Contact", "Security", "Address"];

function validate(stepIndex, formData) {
  const errs = {};
  const currentFields = steps[stepIndex].fields;
  currentFields.forEach(({ name }) => {
    if (!formData[name]?.trim()) errs[name] = "This field is required";
  });
  if (stepIndex === 1 && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errs.email = "Invalid email address";
  }
  if (stepIndex === 2 && formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
    errs.confirmPassword = "Passwords do not match";
  }
  return errs;
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { step, formData, errors, direction } = useSelector((s) => s.registration);
  const [showOtp, setShowOtp] = useState(false);

  const handleChange = (field, value) => {
    dispatch(updateField({ field, value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      dispatch(setErrors(newErrors));
    }
  };

  const next = () => {
    const errs = validate(step, formData);
    if (Object.keys(errs).length) {
      dispatch(setErrors(errs));
      return;
    }
    dispatch(setDirection(1));
    dispatch(setStep(step + 1));
    dispatch(persistState());
  };

  const back = () => {
    dispatch(setDirection(-1));
    dispatch(setStep(step - 1));
    dispatch(persistState());
  };

  const handleSubmit = () => {
    const errs = validate(step, formData);
    if (Object.keys(errs).length) {
      dispatch(setErrors(errs));
      return;
    }
    setShowOtp(true);
  };

  const isLast = step === steps.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-8 overflow-hidden">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Step {step + 1} of {steps.length}</p>
          </div>

          {/* Step Indicator */}
          <StepIndicator stepLabels={stepLabels} step={step} />

          {/* Animated Steps */}
          <div className="relative min-h-45">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="space-y-4"
              >
                {steps[step].fields.map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={formData[name]}
                      onChange={(e) => handleChange(name, e.target.value)}
                      placeholder={placeholder}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm transition-all ${
                        errors[name] ? "border-red-400 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                      }`}
                    />
                    <AnimatePresence>
                      {errors[name] && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs text-red-500 mt-1"
                        >
                          {errors[name]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {step > 0 ? (
              <button onClick={back} className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors">
                Back
              </button>
            ) : <div />}
            <button
              onClick={isLast ? handleSubmit : next}
              className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              {isLast ? "Submit" : "Continue"}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showOtp && <OtpModal onClose={() => setShowOtp(false)} />}
      </AnimatePresence>
    </div>
  );
}
