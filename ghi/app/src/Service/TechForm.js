import React, { useEffect, useState } from 'react';

function TechForm() {
    const [first_name, setFirst] = useState('');
    const handleFirstChange = (event) => {
        const value = event.target.value;
        setFirst(value);
    }
    const [last_name, setLast] = useState ('');
    const handleLastChange = (event) => {
        const value = event.target.value;
        setLast(value);
    }
    const [employee_id, setId] = useState('');
    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setId(value);
    }

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data ={
            first_name,
            last_name,
            employee_id,
        };
        const techUrl = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(techUrl, fetchConfig);
        if (response.ok) {
            const newTech = await response.json();
            console.log(newTech);
            setFirst('');
            setLast('');
            setId('');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Technician</h1>
                    <form onSubmit={handleSubmit} id="create-tech-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstChange} placeholder="first_name" required type="text" name="first_name" value={first_name} id="first_name" className="form-control"/>
                            <label htmlFor="first_name">First name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastChange} placeholder="last_name" required type="text" name="last_name" value={last_name} id="last_name" className="form-control"/>
                            <label htmlFor="last_name">Last name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmployeeIdChange} placeholder="employee_id" required type="text" name="employee_id" value={employee_id} id="employee_id" className="form-control"/>
                            <label htmlFor="employee_id">Employee ID...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TechForm;
