import SimpleTable from "../../components/table/simple-table";
import * as ReservationsAPI from "../../api/reservations-api";
import React, { useEffect, useState } from "react";
import ErrorHandler from "../../commons/errorhandling/error-handler";
import SearchCourts from "../../components/search-courts";

const dummyData = [
  {
    locationId: "1",
    locationAddress: "Cluj-Napoca",
    locationLongitude: "sadasdsadasd",
    locationLatitude: "dvzczcxzxc",
    courtId: "1",
    courtType: "ceva",
    courtName: "altceva",
  },
  {
    locationId: "1",
    locationAddress: "Cluj-Napoca",
    locationLongitude: "sadasdsadasd",
    locationLatitude: "dvzczcxzxc",
    courtId: "1",
    courtType: "ceva",
    courtName: "altceva",
  },
];

const courtsColumns = [
  { Header: "Location ID", accessor: "locationId" },
  { Header: "Location Address", accessor: "locationAddress" },
  { Header: "Location Longitude", accessor: "locationLongitude" },
  { Header: "Location Latitude", accessor: "locationLatitude" },
  { Header: "Court ID", accessor: "courtId" },
  { Header: "Court Type", accessor: "courtType" },
  { Header: "Court Name", accessor: "courtName" },
];

function ReservationsPage() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(courtsColumns);
  const [error, setError] = useState(0);

  useEffect(() => {
    fetchAllLocationsWithCourts();
  }, []);

  function fetchAvailableCourts(searchInput) {
    return ReservationsAPI.getAvailableCourts(searchInput, (result, status) => {
      if (result !== null && status === 200) {
        setData(result);
      } else {
        setError(status);
      }
    });
  }

  function fetchAllLocationsWithCourts() {
    return ReservationsAPI.getAllLocationsWithCourts((result, status) => {
      if (result != null && status === 200) {
        // imi returneaza lista cu: (id_court, type_court, name_court, location_id, location_address);
        // trebuie sa mapez fiecare tupla la (location_id, locations_address, location_long, location_lat,
        // court_id, court_type, court_name);
        setData([]);
        result = dummyData;
        result.map((elem) =>
          elem.map(
            data.push({
              locationId: elem[0],
              locationAddress: elem[1],
              locationLongitude: elem[2],
              locationLatitude: elem[3],
              courtId: elem[4],
              courtType: elem[5],
              courtName: elem[6],
            })
          )
        );
      } else {
        setError(status);
      }
    });
  }

  return (
    <div>
      <SimpleTable data={dummyData} columns={columns} />
      <SearchCourts searchFunction={fetchAvailableCourts} />
      {error > 0 && <ErrorHandler />}
    </div>
  );
}

export default ReservationsPage;
