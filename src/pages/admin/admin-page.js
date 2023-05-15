import React, { useEffect, useState } from "react";
import SimpleTable from "../../components/table/simple-table";
import ErrorHandler from "../../commons/errorhandling/error-handler";
import { Button, Input } from "reactstrap";
import * as ReservationsAPI from "../../api/reservations-api";
import * as AdminAPI from "../../api/admin-api";
import UpdateCourtModal from "../../components/update-court-modal";
import AddLocationForm from "../../components/AddLocationForm";
import AddCourtForm from "../../components/AddCourtForm";
import "./admin-page.scss";

const courtsColumns = [
  { Header: "Location ID", accessor: "location_id" },
  { Header: "Location Address", accessor: "location_address" },
  { Header: "Location Longitude", accessor: "location_longitude" },
  { Header: "Location Latitude", accessor: "location_latitude" },
  { Header: "Court ID", accessor: "court_id" },
  { Header: "Court Type", accessor: "type" },
  { Header: "Court Name", accessor: "name" },
];

const formInit = {
  id: {
    value: "",
    placeholder: "...court id",
    valid: false,
    touched: false,
    validationRules: {
      idValidation: true,
      isRequired: true,
    },
  },
  type: {
    value: "",
    placeholder: "Type...",
    valid: true,
    touched: false,
    validationRules: {},
  },
  name: {
    value: "",
    placeholder: "Name...",
    valid: true,
    touched: false,
    validationRules: {},
  },
};

function AdminPage() {
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isAddCourtOpen, setIsAddCourtOpen] = useState(false);
  const [data, setData] = useState([]);
  const [columns] = useState(courtsColumns);
  const [courtId, setCourtId] = useState(null);
  const [courtData, setCourtData] = useState(formInit);
  const [error, setError] = useState(0);

  useEffect(() => {
    getAllCourtsWithLocationData();
  }, []);

  const onAddLocationClicked = () => {
    setIsAddLocationOpen(true);
  };

  const onAddCourtClicked = () => {
    setIsAddCourtOpen(true);
  };

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
            court_id: elem.id,
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

  function deleteCourtById() {
    let court = {
      id: courtId,
    };
    deleteCourt(court);
  }

  function handleChange(event) {
    setCourtId(() => event.target.value);
  }

  function getCourtData(updateCourtId) {
    data.forEach((elem) => {
      if (elem.court_id === updateCourtId) {
        let newValue = { ...courtData };
        newValue["type"].value = elem.type;
        newValue["name"].value = elem.name;
        setCourtData(() => newValue);
      }
    });
  }

  return (
    <div>
      {!isAddLocationOpen && (
        <button className="btn-add" onClick={onAddLocationClicked}>
          Add location
        </button>
      )}
      {isAddLocationOpen && (
        <AddLocationForm setIsOpen={setIsAddLocationOpen} />
      )}{" "}
      {!isAddCourtOpen && (
        <button className="btn-add" onClick={onAddCourtClicked}>
          Add court
        </button>
      )}
      {isAddCourtOpen && <AddCourtForm setIsOpen={setIsAddCourtOpen} />}
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
          onClick={deleteCourtById}
          style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
        >
          Delete
        </Button>
        <UpdateCourtModal
          getData={getCourtData}
          courtData={courtData}
          updateTable={getAllCourtsWithLocationData}
          style={{ alignSelf: "center", margin: "0 1% 0 1%" }}
        />
      </div>
      {error > 0 && <ErrorHandler />}
    </div>
  );
}
export default AdminPage;
