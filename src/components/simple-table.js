import {useEffect, useMemo, useState} from "react";
// import {Table} from "reactstrap";
import {useTable, useResizeColumns} from "react-table";
import {Table} from "reactstrap";

const dummyData = [
    [1,'Tanner Linsley', 26],
    [2, 'Tanner Linsley', 26],
    [3, 'Tanner Linsley', 26]
];

const dummyColumns = [
    "id",
    "name",
    "age"
];

function SimpleTable(props) {

    // const [data, setData] = useState(dummyData);
    // const [columns, setColumns] = useState(dummyColumns);
    // const [processedData, setProcessedData] = useState([]);
    // const [processedRow, setProcessedRow] = useState([]);
    // const [processedColumns, setProcessedColumns] = useState([]);

    const data = useMemo(
        () => [
            {
                col1: 'Minsk',
                col2: '27',
                col3: 'rain',
            },
            {
                col1: 'Vilnius',
                col2: '30',
                col3: 'rain',
            },
            {
                col1: 'London',
                col2: '23',
                col3: 'rain',
            },
        ],
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'City',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Temperature',
                accessor: 'col2',
            },
            {
                Header: 'Weather Forecast',
                accessor: 'col3', // accessor is the "key" in the data
            },
        ],
        []
    )

    // function processColumns(){
    //     columns.forEach(item => {
    //         setProcessedColumns(allColumns => [...allColumns, <th key={columns.indexOf(item)} scope="col">{item}</th>]);
    //     });
    // }
    //
    // function processData(){
    //     setProcessedRow([]);
    //     data.forEach(item => {
    //         item.forEach(element => {
    //             setProcessedRow(allElements => [...allElements, <td key={item.indexOf(element)}>{element}</td>]);
    //         });
    //         console.log("Processed Row: " + processedRow);
    //         setProcessedData(allData => [...allData, <tr key={data.indexOf(item)}>{processedRow}</tr>]);
    //     });
    // }

    // useEffect(() => {
    //
    //     processColumns();
    //     processData();
    //
    //     console.log("Processed Columns: " + processedColumns);
    //     console.log("Processed Data: " + processedData);
    //
    //
    // }, []);

    // return(
    //     <div>
    //         {/*<Table bordered hover responsive>*/}
    //         {/*    <thead>*/}
    //         {/*        <tr key={1000}>{processedColumns}</tr>*/}
    //         {/*    </thead>*/}
    //         {/*    <tbody>{processedData}</tbody>*/}
    //         {/*</Table>*/}
    //
    //     </div>
    // );
    const {
        getTableProps, // getTableProps returns "role: table";
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow, // renders the rows in cells;
    } = useTable({ columns, data },  useResizeColumns);

    return (
        <div>
            <Table bordered hover responsive {...getTableProps()} style={{border: "3px solid blue", borderRadius: "10px"}}>
                <thead className="table-secondary">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => {
                            const {render, getHeaderProps} = column
                            return (
                                <th {...getHeaderProps()}>{render("Header")}</th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()} className="table-secondary">
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}
export default SimpleTable;