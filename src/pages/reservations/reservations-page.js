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
  { Header: "Court ID", accessor: "id" },
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
        let courtsList = [];
        let index;
        for (index = 0; index < result.availableCourts.length; index += 3) {
          let newElement = {
            location_id: result.locationId,
            location_address: result.locationAddress,
            location_longitude: result.locationLongitude,
            location_latitude: result.locationLatitude,
            id: result.availableCourts[index],
            type: result.availableCourts[index + 1],
            name: result.availableCourts[index + 2],
          };
          courtsList.push(newElement);
        }
        setData((prevState) => courtsList);
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
            id: elem.id,
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
