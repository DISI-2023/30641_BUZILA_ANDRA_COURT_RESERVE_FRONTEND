import React, { useEffect, useState } from "react";
import { FormGroup, Input, Label, Button } from "reactstrap";

import LoginValidators from "../validators/login-validators";
import ErrorHandler from "../commons/errorhandling/error-handler";
import * as AdminAPI from "../api/admin-api";
import { useNavigate } from "react-router-dom";

const formInit = {
  id: {
    value: "",
    placeholder: "...court id",
    valid: false,
    touched: false,
    validationRules: {
      // emailValidation: true,
    },
  },
  type: {
    value: "",
    placeholder: "Type...",
    valid: false,
    touched: false,
    validationRules: {
      // isRequired: true,
      // minLength: true,
    },
  },
  name: {
    value: "",
    placeholder: "Name...",
    valid: false,
    touched: false,
    validationRules: {
      // isRequired: true,
      // minLength: true,
    },
  },
};

function UpdateCourtForm() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formValues, setFormValues] = useState(formInit);
  const [error, setError] = useState(0);

  let navigate = useNavigate();

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

  function updateCourt(court) {
    return AdminAPI.modifyCourt(court, (result, status) => {
      if (result !== null && (status === 200 || status === 201)) {
        console.log(
          "(FROM POST)Successfully updated court with id: " + court.id
        );
      } else {
        setError(status);
      }
    });
  }

  function handleSubmit() {
    let court = {
      id: formValues.id.value,
      type: formValues.type.value,
      name: formValues.name.value,
    };
    updateCourt(court);
    console.log("You pressed the submit button!");
  }

  return (
    <div>
      <FormGroup id="id">
        <Label for="idField"> ID: </Label>
        <Input
          type={"text"}
          name="id"
          id="idField"
          placeholder={formValues.id.placeholder}
          onChange={handleChange}
          defaultValue={formValues.id.value}
          touched={formValues.id.touched ? 1 : 0}
          valid={formValues.id.valid}
          required
        />
        {formValues.id.touched && !formValues.id.valid && (
          <div className={"error-message"}>
            {" "}
            * ID must have a valid format *{" "}
          </div>
        )}
      </FormGroup>

      <FormGroup id="type">
        <Label for="typeField"> Type: </Label>
        <Input
          type="text"
          name="type"
          id="typeField"
          placeholder={formValues.type.placeholder}
          onChange={handleChange}
          defaultValue={formValues.type.value}
          touched={formValues.type.touched ? 1 : 0}
          valid={formValues.type.valid}
          required
        />
        {formValues.type.touched && !formValues.type.valid && (
          <div className={"error-message"}>
            {" "}
            * Type must have a valid format *{" "}
          </div>
        )}
      </FormGroup>

      <FormGroup id="name">
        <Label for="nameField"> Name: </Label>
        <Input
          type="text"
          name="name"
          id="nameField"
          placeholder={formValues.name.placeholder}
          onChange={handleChange}
          defaultValue={formValues.name.value}
          touched={formValues.name.touched ? 1 : 0}
          valid={formValues.name.valid}
          required
        />
        {formValues.name.touched && !formValues.name.valid && (
          <div className={"error-message"}>
            {" "}
            * Name must have a valid format *{" "}
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

      {error > 0 && <ErrorHandler />}
    </div>
  );
}

export default UpdateCourtForm;
