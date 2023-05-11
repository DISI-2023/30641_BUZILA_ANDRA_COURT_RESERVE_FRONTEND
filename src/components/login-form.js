import React, { useState, useContext, useEffect } from "react";
import { FormGroup, Input, Label, Button } from "reactstrap";

import LoginValidators from "../validators/login-validators";
import ErrorHandler from "../commons/errorhandling/error-handler";
import * as UserAPI from "../api/login-api";
import { AppContext } from "../App";
import GetEmailResetPasswordModal from "./get-email-reset-password-modal";

const formInit = {
  email: {
    value: "",
    placeholder: "Ex: nume@domeniu.com...",
    valid: false,
    touched: false,
    validationRules: {
      emailValidation: true,
    },
  },
  password: {
    value: "",
    placeholder: "Password...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      minLength: true,
    },
  },
};

function LoginForm({ toggleModal }) {
  const { setIsLoggedIn, setIsAdmin } = useContext(AppContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formValues, setFormValues] = useState(formInit);
  const [passwordType, setPasswordType] = useState("password");

  const [error, setError] = useState(0);

  useEffect(() => {
    resetFields();
  }, []);

  function resetFields() {
    let elements = { ...formValues };
    elements["email"].value = "";
    elements["email"].valid = false;
    elements["email"].touched = false;

    elements["password"].value = "";
    elements["password"].valid = false;
    elements["password"].touched = false;
    setFormValues(() => elements);

    let formIsValid = false;
    setFormIsValid(() => formIsValid);
  }

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    let updatedValues = { ...formValues };

    let updatedFormElement = updatedValues[name];

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = LoginValidators(
      value,
      updatedFormElement.validationRules
    );
    updatedValues[name] = updatedFormElement;

    let formIsValid = true;
    for (let updatedFormElementName in updatedValues) {
      formIsValid = updatedValues[updatedFormElementName].valid && formIsValid;
    }

    setFormValues(() => updatedValues);
    setFormIsValid(() => formIsValid);
  }

  function saveUser(userData) {
    localStorage.setItem("loggedUser", JSON.stringify(userData));
  }

  function loginUser(user) {
    return UserAPI.loginUser(user, (result, status) => {
      if (result !== null && (status === 200 || status === 201)) {
        saveUser(result);
        onClickLogin();
        let loggedUser = localStorage.getItem("loggedUser");
        if (loggedUser != null) {
          let role = JSON.parse(loggedUser).role;
          if (role === "admin") {
            setIsAdmin(true);
            localStorage.setItem("isAdmin", true);
          }
        }
        toggleModal();
      } else {
        setError(status);
      }
    });
  }

  const onClickLogin = () => {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
  };

  function handleSubmit() {
    let user = {
      email: formValues.email.value,
      password: formValues.password.value,
    };
    loginUser(user);
    resetFields();
  }

  function togglePassword() {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  return (
    <div>
      <FormGroup id="email">
        <Label for="emailField"> Email: </Label>
        <Input
          type={"text"}
          name="email"
          id="emailField"
          placeholder={formValues.email.placeholder}
          onChange={handleChange}
          value={formValues.email.value}
          touched={formValues.email.touched ? 1 : 0}
          valid={formValues.email.valid}
          required
        />
        {formValues.email.touched && !formValues.email.valid && (
          <div className={"error-message"}>
            {" "}
            * Email must have a valid format *{" "}
          </div>
        )}
      </FormGroup>

      <FormGroup id="password">
        <Label for="passwordField"> Password: &nbsp; </Label>
        <Input type={"checkbox"} onClick={togglePassword} />
        <Input
          type={passwordType}
          name="password"
          id="passwordField"
          placeholder={formValues.password.placeholder}
          onChange={handleChange}
          value={formValues.password.value}
          touched={formValues.password.touched ? 1 : 0}
          valid={formValues.password.valid}
          required
        />
        {formValues.password.touched && !formValues.password.valid && (
          <div className={"error-message"}>
            {" "}
            * Password must have a valid format *{" "}
          </div>
        )}
      </FormGroup>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type={"submit"}
          color={"primary"}
          disabled={!formIsValid}
          onClick={handleSubmit}
        >
          {" "}
          Login{" "}
        </Button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <GetEmailResetPasswordModal />
      </div>

      {error > 0 && <ErrorHandler />}
    </div>
  );
}

export default LoginForm;
