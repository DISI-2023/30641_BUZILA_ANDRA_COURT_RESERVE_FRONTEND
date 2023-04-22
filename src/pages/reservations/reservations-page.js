import SimpleTable from "../../components/table/simple-table";
import * as ReservationsAPI from "../../api/reservations-api";
import React, {useEffect, useState} from "react";
import ErrorHandler from "../../commons/errorhandling/error-handler";

const dummyData = [
    {
        locationId: '1',
        locationAddress: 'Cluj-Napoca',
        locationLongitude: 'sadasdsadasd',
        locationLatitude: 'dvzczcxzxc',
        courtId: '1',
        courtType: 'ceva',
        courtName: 'altceva'
    },
    {
        locationId: '1',
        locationAddress: 'Cluj-Napoca',
        locationLongitude: 'sadasdsadasd',
        locationLatitude: 'dvzczcxzxc',
        courtId: '1',
        courtType: 'ceva',
        courtName: 'altceva'
    },
];

const courtsColumns = [
    { Header: 'Location ID', accessor: "locationId" },
    { Header: 'Location Address', accessor: "locationAddress" },
    { Header: 'Location Longitude', accessor: "locationLongitude" },
    { Header: 'Location Latitude', accessor: "locationLatitude" },
    { Header: 'Court ID', accessor: "courtId" },
    { Header: 'Court Type', accessor: "courtType" },
    { Header: 'Court Name', accessor: "courtName" },
];

function ReservationsPage(){

    const[data, setData] = useState([]);
    const [columns, setColumns] = useState(courtsColumns);
    const[error, setError] = useState(0);

    useEffect(() => {
        //fetchAllLocationsWithCourts();
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

    function fetchAllLocationsWithCourts(){
        return ReservationsAPI.getAllLocationsWithCourts((result, status) => {
            if (result != null && status == 200){
                setData(result);
            }
            else{
                setError(status);
            }
        })
    }

    return(
        <div>
            <SimpleTable data={dummyData} columns={columns}/>
            {
                error > 0 && <ErrorHandler />
            }
        </div>
    );
}

export default ReservationsPage;