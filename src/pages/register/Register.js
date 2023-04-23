import React, { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import { postRequest } from "../../api/httpUtils";
import { PAGES_URL } from "../../constants/PagesUrl";
import { validateEmail } from "../../validators/EmailValidator";

const Register = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    wrongInputFormat: "",
  });

  const [passwordConfirmed, setPasswordConfirmed] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      const response = await postRequest("/User", {
        //changes may be needed after the backend is ready
        id: 0,
        email: input.email,
        password: input.passwordhash,
      });
      if (response.status === 200) {
        setRegistrationSuccess(true);
      }
    } catch (err) {
      setError({ ...error, wrongInputFormat: err.response.data });
    }
    try {
      //changes may be needed after the backend is ready
      await postRequest("/User/ExtractUserId", input.email);
    } catch (err) {
      setError({ ...error, wrongInputFormat: "Email format is wrong!" });
    }
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter email!";
          } else if (!validateEmail(value)) {
            stateObj[name] = "Please enter a valid email address!";
            setValidEmail(false);
          } else {
            setValidEmail(true);
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password!";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password do not match!";
            setPasswordConfirmed(false);
          } else if (
            !validator.isStrongPassword(value, {
              minLength: 8,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            })
          ) {
            stateObj["password"] =
              "Password must contain at least 8 characters, 1 lowercase character, 1 uppercase character, 1 number and 1 symbol!";
            setPasswordConfirmed(false);
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
            setPasswordConfirmed(true);
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password!";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password do not match!";
            setPasswordConfirmed(false);
          } else {
            setPasswordConfirmed(true);
          }
          break;

        default:
          break;
      }
      return stateObj;
    });
  };

  return (
    <div className="register">
      <div className="background-box">
        <form>
          <h3>Create a new account</h3>
          <div className="form-line">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
          </div>
          {error.email && <span className="err">{error.email}</span>}
          <div className="form-line">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
          </div>
          {error.password && <span className="err">{error.password}</span>}
          <div className="form-line">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
            ></input>
          </div>
          {error.confirmPassword && (
            <span className="err">{error.confirmPassword}</span>
          )}
          <div className="form-submit">
            <button
              className="btn"
              onClick={onFinish}
              disabled={
                !(
                  input.email &&
                  input.password &&
                  input.confirmPassword &&
                  passwordConfirmed &&
                  validEmail
                )
              }
            >
              Register
            </button>
            <br />
            {registrationSuccess && (
              <span className="success">Registration successful!</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
