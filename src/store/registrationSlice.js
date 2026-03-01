import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem("registration");
    return saved ? JSON.parse(saved) : null;
  } catch(error) { return null; }
};

const initialState = loadState() || {
  step: 0,
  formData: {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
  },
  errors: {},
  direction: 1,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    setDirection(state, action) {
      state.direction = action.payload;
    },
    updateField(state, action) {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    clearErrors(state) {
      state.errors = {};
    },
    resetRegistration(state) {
      state.step = 0;
      state.formData = initialState.formData;
      state.errors = {};
      state.direction = 1;
    },
    persistState(state) {
      if (typeof window !== "undefined") {
        localStorage.setItem("registration", JSON.stringify({
          step: state.step,
          formData: state.formData,
          errors: {},
          direction: 1,
        }));
      }
    },
  },
});

export const {
  setStep, setDirection, updateField, setErrors, clearErrors, resetRegistration, persistState,
} = registrationSlice.actions;

export default registrationSlice.reducer;
