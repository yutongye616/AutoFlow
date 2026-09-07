import React, { useEffect, useState } from 'react';

function ServHist() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFiltered] = useState([]);
  const [searchVin, setSearchVin] = useState('');

  const getData = async () => {
    const url = 'http://localhost:8080/api/appointments/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
      setFiltered(data.appointments);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFiltered(
      appointments.filter((appointment) =>
        appointment.vin.toLowerCase().includes(searchVin.toLowerCase())
      )
    );
  }, [searchVin, appointments]);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/api/appointments/${id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    }
  };


  return (
    <div className="row">
        <h1>Service History</h1>
          <div className="mb-3">
            <label htmlFor="vinSearch" className="form-label">
              Search by VIN:
            </label>
            <input
              type="text"
              className="form-control"
              id="vinSearch"
              value={searchVin}
              onChange={(car) => setSearchVin(car.target.value)}
            />
          </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer</th>
                    <th>VIP?</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredAppointments.map((appointment) => {
                const key = appointment.id;
                const [date, fullTime] = appointment.date_time.split('T');
                const time = fullTime.slice(0, 5);
                const formattedTime = new Date(`2000-01-01T${time}Z`).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit',});
                    return (
                        <tr key={key}>
                            <td> { appointment.vin } </td>
                            <td> { appointment.customer } </td>
                            <td> { appointment.vip ? 'Yes' : 'No' } </td>
                            <td> { date } </td>
                            <td> { formattedTime }  </td>
                            <td> { appointment.techname } </td>
                            <td> { appointment.service_reason } </td>
                            <td> { appointment.status } </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(appointment.id)}
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
    );
}

export default ServHist;
