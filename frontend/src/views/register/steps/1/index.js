import React from "react";
import fetch from "../../../../utils/fetch";
import { toast } from "react-toastify";

const step1 = ({
  inputs,
  step,
  maxSteps,
  onChange,
  nextStep,
  loading,
  setLoad,
}) => {
  const checkValidity = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    form.checkValidity() ? submitForm() : e.stopPropagation();
  };

  const submitForm = async () => {
    try {
      setLoad(true);

      const body = { email: inputs.email, name: inputs.name };

      const response = await fetch(
        "http://localhost:5000/users/verifyemail",
        "",
        body
      );

      response ? nextStep() : toast.error(response);
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
              <label for="name">Name</label>
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
              <label for="email" className="mt-1">
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
