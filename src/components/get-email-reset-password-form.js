import React, { useState } from "react";
import LoginValidators from "../validators/login-validators";
import { Button, FormGroup, Input, Label } from "reactstrap";
import * as ResetPasswordAPI from "../api/reset-password-api";

const emailInit = {
  value: "",
  placeholder: "Ex: nume@domeniu.com...",
  valid: false,
  touched: false,
  validationRules: {
    emailValidation: true,
  },
};

function GetEmailResetPasswordForm({ toggleModal }) {
  const [formEmail, setFormEmail] = useState(emailInit);

  function handleChange(event) {
    let value = event.target.value;

    let updatedValue = { ...formEmail };

    updatedValue.value = value;
    updatedValue.touched = true;
    updatedValue.valid = LoginValidators(value, updatedValue.validationRules);

    setFormEmail(() => updatedValue);
  }

  function getEmail(data) {
    return ResetPasswordAPI.getResetPasswordEmail(data);
  }

  function handleSubmit() {
    let data = {
      email: formEmail.value,
    };
    getEmail(data);
    alert("Check your mailbox to reset your password!");
    toggleModal();
  }

  return (
    <div>
      <FormGroup id="email">
        <Label for="emailField"> Email: </Label>
        <Input
          type={"text"}
          name="email"
          id="emailField"
          placeholder={formEmail.placeholder}
          onChange={handleChange}
          value={formEmail.value}
          touched={formEmail.touched ? 1 : 0}
          valid={formEmail.valid}
          required
        />
        {formEmail.touched && !formEmail.valid && (
          <div className={"error-message"}>
            {" "}
            * Email must have a valid format *{" "}
          </div>
        )}
      </FormGroup>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type={"submit"}
          color={"primary"}
          disabled={!formEmail.valid}
          onClick={handleSubmit}
        >
          {" "}
          Get email{" "}
        </Button>
      </div>
    </div>
  );
}
export default GetEmailResetPasswordForm;
