import { Button, Input } from "reactstrap";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";

function SearchCourts({ searchFunction, spareFunction }) {
  const [locationId, setLocationId] = useState(null);
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );

  function handleChange(event) {
    setLocationId(() => event.target.value);
  }

  function submitSearch() {
    if (
      time !== null &&
      value !== null &&
      locationId !== null &&
      locationId !== ""
    ) {
      value.setHours(Number(time.split(":")[0]));
      let searchInput = {
        locationId: locationId,
        dateForCourts: value.toISOString(),
      };
      searchFunction(searchInput);
    } else {
      spareFunction();
    }
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "1% 0 1% 0" }}
    >
      <Input
        type="search"
        placeholder="...type location id"
        defaultValue={locationId}
        onChange={handleChange}
        style={{ width: "25%", alignSelf: "center", margin: "0 1% 0 1%" }}
      />
      <DatePicker
        value={value}
        onChange={setValue}
        format={"yyyy-MM-dd"}
        style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
      />
      <TimePicker
        value={time}
        onChange={setTime}
        style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
      />
      <Button
        type="submit"
        color="primary"
        onClick={submitSearch}
        style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchCourts;
