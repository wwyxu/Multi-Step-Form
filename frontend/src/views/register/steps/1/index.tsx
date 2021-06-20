import React from "react";
import { toast } from "react-toastify";
import Models from "src/models";
import API from "src/services/api"

const step1 = ({
  inputs,
  step,
  maxSteps,
  onChange,
  nextStep,
  loading,
  setLoad,
}: {inputs: Models.Form, step: number, maxSteps: number, onChange: any, nextStep: any, loading: boolean, setLoad: any}) => {
  const checkValidity = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.checkValidity() ? submitForm() : e.stopPropagation();
  };

  const submitForm = async () => {
    try {
      setLoad(true);
      const body: Models.Step1 = { email: inputs.email, name: inputs.name };
      const res = await API.verify(body);
      res.data === 'ok' ? nextStep() : toast.error(res);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoad(false);
    }
  };

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
              <label >Name</label>
              <input
                type="text"
                required
                id="name"
                name="name"
                defaultValue={inputs.name}
                placeholder="Name"
                onChange={onChange("name")}
                className="form-control my-1"
              />
              <label className="mt-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                defaultValue={inputs.email}
                placeholder="Email"
                onChange={onChange("email")}
                className="form-control my-1"
                required
              />
            </div>
            {loading ? (
              <button className="btn btn-primary btn-block">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </button>
            ) : (
              <button className="btn btn-primary btn-block" type="submit">
                Next
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default step1;
