import React, { useEffect, useState } from "react";
import SimpleTable from "../../components/table/simple-table";
import ErrorHandler from "../../commons/errorhandling/error-handler";
import { Button } from "reactstrap";
import { getRequest } from "../../api/httpUtils";

function MyReservations() {
  const courtsColumns = [
    {
      Header: "",
      accessor: "delete",
      Cell: ({ row }) => (
        <Button onClick={() => handleDelete(row)}>Delete</Button>
      ),
    },
    {
      Header: "",
      accessor: "search for players",
      Cell: ({ row }) => (
        <Button onClick={() => handleSearch(row)}>Search for Players</Button>
      ),
    },
    { Header: "Firstname", accessor: "user_firstname" },
    { Header: "Lastname", accessor: "user_lastname" },
    { Header: "Email", accessor: "user_email" },
    { Header: "Court Name", accessor: "court_name" },
    { Header: "Court Type", accessor: "court_type" },
    { Header: "Location", accessor: "court_location_address" },
    { Header: "Arriving time", accessor: "arrivingTime" },
    { Header: "Leaving time", accessor: "leavingTime" },
    { Header: "Price", accessor: "price" },
  ];

  const [data, setData] = useState([]);
  const [columns] = useState(courtsColumns);
  const [error, setError] = useState(0);
  const userId = JSON.parse(localStorage.getItem("loggedUser")).id;

  const handleDelete = async (row) => {
    try {
      const reservationId = row.original.id;

      setData((prevData) =>
        prevData.filter((item) => item.id !== reservationId)
      );
    } catch (error) {
      setError("Error! We cannot delete the reservation");
    }
  };

  const isDeleteDisabled = (row) => {
    const arrivalTime = new Date(row.original.arrivingTime);
    const currentTime = new Date();
    const differenceInHours = Math.floor(
      (arrivalTime - currentTime) / (1000 * 60 * 60)
    );
    return differenceInHours < 24;
  };

  const handleSearch = (row) => {};

  useEffect(() => {
    (async () => getAllReservations())();
    // eslint-disable-next-line
  }, []);

  const getAllReservations = async () => {
    try {
      const reservations = await getRequest(
        `/reservation/getAllReservations/${userId}`
      );
      setData(reservations.data);
    } catch (error) {
      setError("Error! We can not display the reservations");
    }
  };

  return (
    <div>
      <SimpleTable
        data={data}
        columns={columns.map((column) => ({
          ...column,
          Cell: (cellInfo) => {
            if (column.accessor === "delete") {
              return (
                <Button
                  onClick={() => handleDelete(cellInfo.row)}
                  disabled={isDeleteDisabled(cellInfo.row)}
                >
                  Delete
                </Button>
              );
            } else if (column.accessor === "search for players") {
              return <Button onClick={handleSearch}>Search for Players</Button>;
            } else {
              return cellInfo.value;
            }
          },
        }))}
      />
      {error > 0 && <ErrorHandler />}
    </div>
  );
}
export default MyReservations;
