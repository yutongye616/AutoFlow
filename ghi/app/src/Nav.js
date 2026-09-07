import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="d-flex flex-column flex-shrink-0 p-3 text-white sidebar">
      <NavLink to="/" className="d-flex align-items-center mb-3 text-white text-decoration-none">
        <span className="fs-4 fw-bold">AutoFlow</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/">Home</NavLink>
        </li>

        <li className="mt-3 mb-1 px-3 text-white-50 text-uppercase small fw-bold">Inventory</li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/automobiles">Automobiles</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/automobiles/create">Add an Automobile</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/manufacturers/">Manufacturers</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/manufacturers/new/">Add a Manufacturer</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/models/">Vehicle Models</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/models/new/">New Vehicle Model</NavLink>
        </li>

        <li className="mt-3 mb-1 px-3 text-white-50 text-uppercase small fw-bold">Service</li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/technicians">Technicians</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/technicians/create">Add a Technician</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/appointments">Service Appointments</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/appointments/create">Create a Service Appointment</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/appointments/history">Service History</NavLink>
        </li>

        <li className="mt-3 mb-1 px-3 text-white-50 text-uppercase small fw-bold">Sales</li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/customers/">Customer List</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/customers/new/">New Customer</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/salespeople/">Salespeople</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/salespeople/new/">New Salesperson</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/sales/">Sales List</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/api/sales/new">New Sale</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;
