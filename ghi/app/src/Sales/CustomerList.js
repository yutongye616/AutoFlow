import { useEffect, useState } from 'react';

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const getData = async () => {
    const response = await fetch('http://localhost:8090/api/customers/');

    if (response.ok) {
        const data = await response.json();
        setCustomers(data.customer);
    }
    }


    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8090/api/customers/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
        }
    }

    useEffect(()=>{
        getData()
    }, [])
    return (
        <div>
            <h1>Customers</h1>
            <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => {
                return (
                <tr key={customer.id}>
                    <td>{ customer.first_name } { customer.last_name }</td>
                    <td>{ customer.address }</td>
                    <td>{ customer.phone_number }</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(customer.id)}
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

export default CustomerList;
