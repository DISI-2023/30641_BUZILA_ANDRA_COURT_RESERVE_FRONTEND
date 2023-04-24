import SimpleTable from "../../components/table/simple-table";
import * as ReservationsAPI from "../../api/reservations-api";
import React, { useEffect, useState } from "react";
import ErrorHandler from "../../commons/errorhandling/error-handler";
import SearchCourts from "../../components/search-courts";

const courtsColumns = [
  { Header: "Location ID", accessor: "location_id" },
  { Header: "Location Address", accessor: "location_address" },
  { Header: "Location Longitude", accessor: "location_longitude" },
  { Header: "Location Latitude", accessor: "location_latitude" },
  { Header: "Court Type", accessor: "type" },
  { Header: "Court Name", accessor: "name" },
];

const initialValues = {
  locationId: "",
  locationAddress: "",
  locationLongitude: 0,
  locationLatitude: 0,
  availableCourts: [],
};

function ReservationsPage() {
  const [data, setData] = useState([]);
  const [columns] = useState(courtsColumns);
  const [error, setError] = useState(0);

  useEffect(() => {
    fetchAllLocationsWithCourts();
  }, []);

  function fetchAvailableCourts(searchInput) {
    return ReservationsAPI.getAvailableCourts(searchInput, (result, status) => {
      if (result !== null && status === 200) {
        setData([]);
        let index = 0;
        let newElement = {
          location_id: 0,
          location_address: 0,
          location_longitude: 0,
          location_latitude: 0,
          type: "",
          name: "",
        };
        result.availableCourts.forEach((elem) => {
          console.log("Elem: " + elem);
          if (index % 3 === 1) {
            newElement.type = elem;
          } else if (index % 3 === 2) {
            newElement.name = elem;
          } else {
            newElement.location_id = result.locationId;
            newElement.location_address = result.locationAddress;
            newElement.location_longitude = result.locationLongitude;
            newElement.location_latitude = result.locationLatitude;
            console.log(newElement.locationId);
            setData((previousData) => [...previousData, newElement]);
          }
          index++;
        });
      } else {
        setError(status);
      }
    });
  }

  function fetchAllLocationsWithCourts() {
    return ReservationsAPI.getAllLocationsWithCourts((result, status) => {
      if (result != null && status === 200) {
        let courtsList = [];
        result.forEach((elem) => {
          let newElement = {
            location_id: elem.location_id,
            location_address: elem.location_address,
            location_longitude: elem.location_longitude,
            location_latitude: elem.location_latitude,
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

  return (
    <div>
      <SimpleTable data={data} columns={columns} />
      <SearchCourts
        searchFunction={fetchAvailableCourts}
        spareFunction={fetchAllLocationsWithCourts}
      />
      {error > 0 && <ErrorHandler />}
    </div>
  );
}

export default ReservationsPage;
