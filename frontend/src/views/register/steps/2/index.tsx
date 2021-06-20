import React from "react";
import { toast } from "react-toastify";
import Models from "src/models";
import API from "src/services/api"

const step2 = ({
  inputs,
  step,
  maxSteps,
  onChange,
  prevStep,
  nextStep,
  clearForm,
  loading,
  setLoad,
}: {inputs: Models.Form, step: number, maxSteps: number, onChange: any, prevStep: any, nextStep: any, clearForm: any, loading: boolean, setLoad: any} ) => {
  const checkValidity = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.checkValidity() ? checkPassword() : e.stopPropagation();
  };

  const checkPassword = () => {
    inputs.password1 !== inputs.password2 ? toast.error("Password must match") : submitForm();
  };

  const submitForm = async () => {
    try {
      setLoad(true);
      const res = await API.register(inputs);
      res.data === 'ok' ? next() : toast.error(res);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoad(false);
    }
  };

  const next = () => {
    clearForm();
    nextStep();
  }

  return (
    <div className="container reg-container">
      <div className="d-flex justify-content-center h-100">
        <div className="card reg-card card-body shadow-sm">
          <form onSubmit={checkValidity}>
            <h2 className="text-center mt-3">Register</h2>
            <div className="text-center text-secondary mb-4">
              Step {step} of {maxSteps}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                id="password1"
                name="password1"
                defaultValue={inputs.password1}
                placeholder="Password"
                onChange={onChange("password1")}
                className="form-control my-1"
              />
              <label>Password</label>
              <input
                type="password"
                required
                id="password2"
                name="password2"
                defaultValue={inputs.password2}
                placeholder="Confirm Password"
                onChange={onChange("password2")}
                className="form-control my-1"
              />
            </div>
            {loading ? (
              <button className="btn btn-success btn-block">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </button>
            ) : (
              <button className="btn btn-success btn-block" type="submit">
                Register
              </button>
            )}
            <button className="btn btn-primary btn-block" onClick={prevStep}>
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default step2;
