import React, { useEffect, useState } from "react";
import LoginValidators from "../validators/login-validators";
import { Button, FormGroup, Input, Label } from "reactstrap";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import * as ReservationsAPI from "../api/reservations-api";

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
  const [formValue, setFormValue] = useState(courtIdInit);
  const [reservationDate, setReservationDate] = useState(new Date());
  const [arrivingTime, setArrivingTime] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );
  const [leavingTime, setLeavingTime] = useState(
    new Date().getHours() + 1 + ":" + new Date().getMinutes()
  );
  const [price, setPrice] = useState(null);

  useEffect(() => {
    setPrice(() => null);
  }, [reservationDate, arrivingTime, leavingTime]);

  function resetFields() {
    let element = { ...formValue };
    element.value = "";
    element.valid = false;
    element.touched = false;
    setFormValue(() => element);

    setReservationDate(() => new Date());
    setArrivingTime(
      () => new Date().getHours() + ":" + new Date().getMinutes()
    );
    setLeavingTime(
      () => new Date().getHours() + 1 + ":" + new Date().getMinutes()
    );
  }

  function handleChange(event) {
    let value = event.target.value;

    let updatedValue = { ...formValue };

    updatedValue.value = value;
    updatedValue.touched = true;
    updatedValue.valid = LoginValidators(value, updatedValue.validationRules);

    setFormValue(() => updatedValue);
    setPrice(() => null);
  }

  function makeReservationAtCourt(data) {
    return ReservationsAPI.makeReservation(data, (result, status) => {
      if (result !== null && status === 200) {
        alert("Your reservation was successfully processed!");
        toggleModal();
      } else {
        alert(
          "The court id is invalid or the court is not available for the chosen interval"
        );
      }
    });
  }

  function calculateReservationPriceForUser(data) {
    return ReservationsAPI.calculateReservationPrice(data, (result, status) => {
      if (result !== null && status === 200) {
        setPrice(() => result.price);
      } else {
        alert(
          "The court id is invalid or the court is not available for the chosen interval"
        );
      }
    });
  }

  function handleSubmit() {
    if (
      Number(arrivingTime.split(":")[0]) >= Number(leavingTime.split(":")[0])
    ) {
      alert("Arriving time hour has to be lower than leaving time hour!");
    } else {
      reservationDate.setHours(Number(arrivingTime.split(":")[0]));
      reservationDate.setMinutes(Number(arrivingTime.split(":")[1]));
      const arrDate = reservationDate.toISOString();
      reservationDate.setHours(Number(leavingTime.split(":")[0]));
      reservationDate.setMinutes(Number(leavingTime.split(":")[1]));
      const leaveDate = reservationDate.toISOString();
      let data = {
        user_id: JSON.parse(localStorage.getItem("loggedUser")).id,
        court_id: formValue.value,
        arrivingTime: arrDate,
        leavingTime: leaveDate,
      };
      makeReservationAtCourt(data);
      resetFields();
    }
  }

  function handleGetPriceSubmit() {
    if (
      Number(arrivingTime.split(":")[0]) >= Number(leavingTime.split(":")[0])
    ) {
      alert("Arriving time hour has to be lower than leaving time hour!");
    } else {
      reservationDate.setHours(Number(arrivingTime.split(":")[0]));
      reservationDate.setMinutes(Number(arrivingTime.split(":")[1]));
      const arrDate = reservationDate.toISOString();
      reservationDate.setHours(Number(leavingTime.split(":")[0]));
      reservationDate.setMinutes(Number(leavingTime.split(":")[1]));
      const leaveDate = reservationDate.toISOString();
      let data = {
        user_id: JSON.parse(localStorage.getItem("loggedUser")).id,
        court_id: formValue.value,
        arrivingTime: arrDate,
        leavingTime: leaveDate,
      };
      calculateReservationPriceForUser(data);
    }
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormGroup id="reservationDate">
          <Label> Reservation Date: </Label>
          <DatePicker
            value={reservationDate}
            onChange={setReservationDate}
            format={"yyyy-MM-dd"}
            valid={reservationDate !== null}
            style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
          />
          {reservationDate === null && (
            <div className={"error-message"}>
              {" "}
              * Reservation date is required *{" "}
            </div>
          )}
        </FormGroup>

        <FormGroup id="arrivalTime">
          <Label> Arrival Time: </Label>
          <TimePicker
            value={arrivingTime}
            onChange={setArrivingTime}
            valid={arrivingTime !== null}
            style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
          />
          {arrivingTime === null && (
            <div className={"error-message"}>
              {" "}
              * Arriving time is required *{" "}
            </div>
          )}
        </FormGroup>

        <FormGroup id="leavingTime">
          <Label> Leaving Time: </Label>
          <TimePicker
            value={leavingTime}
            onChange={setLeavingTime}
            valid={leavingTime !== null}
            style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
          />
          {leavingTime === null && (
            <div className={"error-message"}>
              {" "}
              * Leaving time is required *{" "}
            </div>
          )}
        </FormGroup>
      </div>

      <FormGroup id="price">
        <Label for="priceField"> Price: </Label>
        <Input
          type={"text"}
          name="price"
          id="priceField"
          placeholder={""}
          onChange={handleChange}
          value={price == null ? "" : price}
          disabled
        />
      </FormGroup>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1% 0 0 0",
        }}
      >
        <Button
          type={"submit"}
          color={"primary"}
          disabled={price === null}
          onClick={handleSubmit}
          style={{ margin: "0 1% 0 0" }}
        >
          {" "}
          Reserve Court{" "}
        </Button>

        <Button
          type={"submit"}
          color={"primary"}
          disabled={
            !formValue.valid ||
            reservationDate === null ||
            arrivingTime === null ||
            leavingTime === null
          }
          onClick={handleGetPriceSubmit}
          style={{ margin: "0 0 0 1%" }}
        >
          {" "}
          Calculate Price{" "}
        </Button>
      </div>
    </div>
  );
}
export default MakeReservationForm;
