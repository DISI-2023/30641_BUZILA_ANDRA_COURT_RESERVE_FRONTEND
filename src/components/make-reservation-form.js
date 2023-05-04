import React, { useState } from "react";
import LoginValidators from "../validators/login-validators";
import { Button, FormGroup, Input, Label } from "reactstrap";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

const courtIdInit = {
  value: "",
  placeholder: "Enter the court id...",
  valid: false,
  touched: false,
  validationRules: {
    isRequired: true,
  },
};

function MakeReservationForm({ toggleModal }) {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formValue, setFormValue] = useState(courtIdInit);
  const [reservationDate, setReservationDate] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );
  const [leavingTime, setLeavingTime] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );

  function resetFields() {
    let element = { ...formValue };
    element.value = "";
    element.valid = false;
    element.touched = false;
    setFormValue(() => element);

    let formIsValid = false;
    setFormIsValid(() => formIsValid);
  }

  function handleChange(event) {
    let value = event.target.value;

    let updatedValue = { ...formValue };

    updatedValue.value = value;
    updatedValue.touched = true;
    updatedValue.valid = LoginValidators(value, updatedValue.validationRules);

    setFormValue(() => updatedValue);
  }

  function handleSubmit() {
    let data = {};
    resetFields();
  }

  return (
    <div>
      <FormGroup id="courtId">
        <Label for="courtIdField"> Court ID: </Label>
        <Input
          type={"text"}
          name="courtId"
          id="courtIdField"
          placeholder={formValue.placeholder}
          onChange={handleChange}
          value={formValue.value}
          touched={formValue.touched ? 1 : 0}
          valid={formValue.valid}
          required
        />
        {formValue.touched && !formValue.valid && (
          <div className={"error-message"}> * Court ID is required * </div>
        )}
      </FormGroup>

      <DatePicker
        value={reservationDate}
        onChange={setReservationDate}
        format={"yyyy-MM-dd"}
        style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
      />
      <TimePicker
        value={arrivalTime}
        onChange={setArrivalTime}
        style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
      />
      <TimePicker
        value={leavingTime}
        onChange={setLeavingTime}
        style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
      />

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
    </div>
  );
}
export default MakeReservationForm;
