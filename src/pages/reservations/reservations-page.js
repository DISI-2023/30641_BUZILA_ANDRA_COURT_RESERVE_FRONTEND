import SimpleTable from "../../components/table/simple-table";

const data = [
    { col1: 'Minsk', col2: '27', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'Vilnius', col2: '30', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'London', col2: '23', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'Vilnius', col2: '30', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'London', col2: '23', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'Minsk', col2: '27', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'Vilnius', col2: '30', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'London', col2: '23', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'Minsk', col2: '27', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'Vilnius', col2: '30', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'London', col2: '23', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'Minsk', col2: '27', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'Vilnius', col2: '30', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'London', col2: '23', col3: 'rain', col4: 'bla', col5: 'tra' },
    { col1: 'Minsk', col2: '27', col3: 'rain', col4: 'bla', col5: 'tra' },
];

const columns = [
        { Header: 'City', accessor: 'col1', },
        { Header: 'Temperature', accessor: 'col2', },
        { Header: 'Weather Forecast', accessor: 'col3', },
        { Header: 'Weather Forecast', accessor: 'col4', },
        { Header: 'Weather Forecast', accessor: 'col5', },
];

function ReservationsPage(){
    return(
        <div>
            <SimpleTable data={data} columns={columns}/>
        </div>
    );
}

export default ReservationsPage;