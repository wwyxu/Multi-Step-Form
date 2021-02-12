import React, { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password1: "",
    password2: "",
  });

  const [loading, setLoading] = useState(false);

  // Form Progress
  const [step, setStep] = useState(1);
  const [maxSteps] = useState(2);

  // Go to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Reset Form Progress
  const resetStep = () => {
    setStep(1);
  };

  // Clear Inputs
  const clearForm = () => {
    setInputs({ email: "", name: "", password1: "", password2: "" });
  };

  const setLoad = (boolean) => {
    setLoading(boolean);
  };

  const onChange = (input) => (e) =>
    setInputs({ ...inputs, [input]: e.target.value });

  switch (step) {
    case 1:
      return (
        <Step1
          inputs={inputs}
          step={step}
          maxSteps={maxSteps}
          onChange={onChange}
          nextStep={nextStep}
          loading={loading}
          setLoad={setLoad}
        />
      );
    case 2:
      return (
        <Step2
          inputs={inputs}
          step={step}
          maxSteps={maxSteps}
          onChange={onChange}
          nextStep={nextStep}
          prevStep={prevStep}
          clearForm={clearForm}
          loading={loading}
          setLoad={setLoad}
        />
      );
    case 3:
      return (
        <div className="container reg-container">
          <div className="d-flex justify-content-center h-100">
            <div className="card reg-card card-body">
              <h2 className="text-center text-secondary my-3">Success!</h2>
              <button className="btn btn-primary" onClick={resetStep}>
                Register Again!
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="container reg-container">
          <div className="d-flex justify-content-center h-100">
            <div className="card reg-card card-body">Multi-Step Form</div>
          </div>
        </div>
      );
  }
};

export default Register;
