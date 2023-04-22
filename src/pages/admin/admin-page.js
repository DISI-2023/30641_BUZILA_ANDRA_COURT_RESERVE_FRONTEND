import React, { useEffect, useState } from "react";
import SimpleTable from "../../components/table/simple-table";
import ErrorHandler from "../../commons/errorhandling/error-handler";
import { Button, Input } from "reactstrap";
import * as ReservationsAPI from "../../api/reservations-api";
import * as AdminAPI from "../../api/admin-api";

const courtsColumns = [
  { Header: "Location ID", accessor: "location_id" },
  { Header: "Location Address", accessor: "location_address" },
  { Header: "Location Longitude", accessor: "location_longitude" },
  { Header: "Location Latitude", accessor: "location_latitude" },
  { Header: "Court ID", accessor: "court_id" },
  { Header: "Court Type", accessor: "type" },
  { Header: "Court Name", accessor: "name" },
];

function AdminPage() {
  const [data, setData] = useState([]);
  const [columns] = useState(courtsColumns);
  const [allLocationsId, setAllLocationsId] = useState([]);
  const [courtId, setCourtId] = useState(null);
  const [error, setError] = useState(0);

  useEffect(() => {
    getAllCourtsWithLocationData();
  }, []);

  function getAllCourtsWithLocationData() {
    ReservationsAPI.getAllLocationsWithCourts((result, status) => {
      if (result != null && status === 200) {
        let courtsList = [];
        result.forEach((elem) => {
          let newElement = {
            location_id: elem.location_id,
            location_address: elem.location_address,
            location_longitude: elem.location_longitude,
            location_latitude: elem.location_latitude,
            // add court id;
            type: elem.type,
            name: elem.name,
          };
          courtsList.push(newElement);
        });
        setData((previousData) => courtsList);
      } else {
        setError(status);
      }
    });
  }

  function deleteCourt(court) {
    return AdminAPI.deleteCourt(court, (result, status) => {
      if (result != null && status === 200) {
        getAllCourtsWithLocationData(); // reload table;
      } else {
        setError(status);
      }
    });
  }

  function handleChange(event) {
    setCourtId(() => event.target.value);
  }

  return (
    <div>
      <SimpleTable data={data} columns={columns} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1% 0 1% 0",
        }}
      >
        <Input
          type="text"
          placeholder="...type court id"
          defaultValue={courtId}
          onChange={handleChange}
          style={{ width: "25%", alignSelf: "center", margin: "0 1% 0 1%" }}
        />
        <Button
          type="submit"
          color="primary"
          onClick={deleteCourt}
          style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
        >
          Delete
        </Button>
      </div>
      {error > 0 && <ErrorHandler />}
    </div>
  );
}
export default AdminPage;
