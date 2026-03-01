"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetRegistration } from "@/store/registrationSlice";
import { Mail, Smartphone, MessageSquare } from "lucide-react";

const otpMethods = [
  { id: "email", label: "Email", icon: <Mail className="w-5 h-5" /> },
  { id: "sms", label: "SMS", icon: <Smartphone className="w-5 h-5" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <MessageSquare className="w-5 h-5" /> },
];

const contentVariants = {
  enter: { opacity: 0, scale: 0.95 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function OtpModal({ onClose }) {
  const [phase, setPhase] = useState("select");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError("");
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const verifyOtp = () => {
    const code = otp.join("");
    if (code === "1234") {
      dispatch(resetRegistration());
      if (typeof window !== "undefined") localStorage.removeItem("registration");
      onClose();
      router.push("/shop");
    } else {
      setOtpError("Invalid OTP. Try 1234.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {phase === "select" ? (
            <motion.div
              key="select"
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Verify your identity</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Where should we send the OTP?</p>
              <div className="space-y-3">
                {otpMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPhase("verify")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent hover:bg-accent/5 transition-all text-left"
                  >
                    <span className="text-gray-600 dark:text-gray-400">{method.icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{method.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="verify"
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Enter OTP</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">We sent a 4-digit code to your device</p>
              <div className="flex justify-center gap-3 mb-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-xl font-bold rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all ${
                      otpError ? "border-red-400 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                    }`}
                  />
                ))}
              </div>
              <AnimatePresence>
                {otpError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-red-500 text-center mb-4"
                  >
                    {otpError}
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                onClick={verifyOtp}
                className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                Verify
              </button>
              <button
                onClick={() => { setPhase("select"); setOtp(["", "", "", ""]); setOtpError(""); }}
                className="w-full py-2 mt-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Choose another method
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
