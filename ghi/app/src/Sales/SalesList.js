import React, { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState('');
    const [salespeople, setSalespeople] = useState([]);

    const getData = async () => {
        const salesResponse = await fetch('http://localhost:8090/api/sales/');
        const salespeopleResponse = await fetch('http://localhost:8090/api/salespeople/');

        if (salesResponse.ok && salespeopleResponse.ok) {
            const salesData = await salesResponse.json();
            const salespeopleData = await salespeopleResponse.json();

            setSales(salesData.sale);
            setSalespeople(salespeopleData.salesperson);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (selectedSalesperson) {
            const filtered = sales.filter(sale => sale.salesperson.employee_id === selectedSalesperson);
            setFilteredSales(filtered);
        } else {
            setFilteredSales(sales);
        }
    }, [selectedSalesperson, sales]);

    const handleSalespersonChange = (e) => {
        const value = e.target.value;
        setSelectedSalesperson(value);
    }

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8090/api/sales/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setSales((prevSales) => prevSales.filter((sale) => sale.id !== id));
        }
    }

    return (
        <div>
            <h1>Sales</h1>
            <div className="mb-3">
                <label htmlFor="salespersonFilter">Filter by Salesperson:</label>
                <select
                    id="salespersonFilter"
                    className="form-select"
                    value={selectedSalesperson}
                    onChange={handleSalespersonChange}
                >
                    <option value="">All Salespeople</option>
                    {salespeople.map(salesperson => (
                        <option key={salesperson.id} value={salesperson.employee_id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    ))}
                </select>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Name</th>
                        <th>Salesperson Employee ID</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>${sale.price}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(sale.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesList;
