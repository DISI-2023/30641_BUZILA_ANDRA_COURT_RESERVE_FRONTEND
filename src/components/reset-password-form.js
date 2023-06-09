import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import React, { useState } from "react";
import LoginValidators from "../validators/login-validators";
import * as ResetPasswordAPI from "../api/reset-password-api";
import { useNavigate } from "react-router-dom";

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
  confirmPassword: {
    value: "",
    placeholder: "Enter your password one last time...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      minLength: true,
    },
  },
};

function ResetPasswordForm() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formValues, setFormValues] = useState(formInit);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  let navigate = useNavigate();

  function togglePassword() {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  function toggleConfirmPassword() {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
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

  function resetPassword(data) {
    return ResetPasswordAPI.resetPassword(data, (result, status) => {
      if (result !== null && status === 200) {
        alert("Your password has been reset successfully!");
        navigate("/");
      } else {
        alert("There isn't an account with this email!");
      }
    });
  }

  function handleSubmit() {
    let data = {
      email: formValues.email.value,
      password: formValues.password.value,
      confirmPassword: formValues.confirmPassword.value,
    };
    resetPassword(data);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "5% 0 0 0",
      }}
    >
      <Card className="col-sm-6">
        <CardTitle style={{ fontWeight: "bold" }}>
          Enter your email and new password:
        </CardTitle>
        <CardBody>
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

          <FormGroup id="confirmPassword">
            <Label for="confirmPasswordField"> Confirm Password: &nbsp; </Label>
            <Input type={"checkbox"} onClick={toggleConfirmPassword} />
            <Input
              type={confirmPasswordType}
              name="confirmPassword"
              id="confirmPasswordField"
              placeholder={formValues.confirmPassword.placeholder}
              onChange={handleChange}
              value={formValues.confirmPassword.value}
              touched={formValues.confirmPassword.touched ? 1 : 0}
              valid={formValues.confirmPassword.valid}
              required
            />
            {formValues.confirmPassword.touched &&
              !formValues.confirmPassword.valid &&
              formValues.password.value !==
                formValues.confirmPassword.value && (
                <div className={"error-message"}>
                  {" "}
                  * Password must have a valid format *{" "}
                </div>
              )}
            {formValues.password.value !== formValues.confirmPassword.value && (
              <div className={"error-message"}>
                {" "}
                * Passwords must be the same to proceed *{" "}
              </div>
            )}
          </FormGroup>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type={"submit"}
              color={"primary"}
              disabled={
                !formIsValid ||
                formValues.password.value !== formValues.confirmPassword.value
              }
              onClick={handleSubmit}
            >
              {" "}
              Reset{" "}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
export default ResetPasswordForm;
