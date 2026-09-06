import { useEffect, useState } from 'react';

function VehicleModelList() {
    const [models, setModels] = useState([]);

    const getData = async () => {
    const response = await fetch('http://localhost:8100/api/models/');

    if (response.ok) {
        const data = await response.json();
        setModels(data.models);
    }
    }


    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8100/api/models/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setModels((prevModels) => prevModels.filter((model) => model.id !== id));
        }
    }

    useEffect(()=>{
        getData()
    }, [])
    return (
        <div>
            <h1>Models</h1>
            <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {models.map((model) => {
                return (
                <tr key={model.href}>
                    <td>{ model.name }</td>
                    <td>{ model.manufacturer.name }</td>
                    <td>
                        {model.picture_url && (
                            <img
                                src={model.picture_url}
                                alt={`Image of ${model.name}`}
                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                        )}
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(model.id)}
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
        )
}

export default VehicleModelList;
