import { useEffect, useState } from 'react';


function AutomobileList() {
    const [autos, setAuto] = useState([]);

    const getData = async() => {
        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(autoUrl);

        if (response.ok) {
            const data = await response.json();
            setAuto(data.autos)
        }
    }

    useEffect(()=>{
        getData()
    }, []);

    const handleDelete = async (vin) => {
        const response = await fetch(`http://localhost:8100/api/automobiles/${vin}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setAuto((prevAutos) => prevAutos.filter((auto) => auto.vin !== vin));
        }
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Automobile List</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {autos.map(autos => {
                    const key = autos.id;
                    return (
                        <tr key={key}>
                            <td> { autos.vin } </td>
                            <td> { autos.color } </td>
                            <td> { autos.year } </td>
                            <td> { autos.model.name } </td>
                            <td> { autos.model.manufacturer.name } </td>
                            <td> { autos.sold ? 'Yes' : 'No' } </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(autos.vin)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
        </div>
        </div>
    );
}


export default AutomobileList;
