import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">AutoFlow</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-wrap">
          <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/automobiles">Automobiles</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/automobiles/create">Add a automobiles</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/technicians">Technicians</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/technicians/create">Add a Technician</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/appointments">Service Appointments</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/appointments/create">Create a Service Appointment</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/appointments/history">Service History</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/customers/">Customer List</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/customers/new/">New Customer</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/salespeople/">Salespeople</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/salespeople/new/">New Salesperson</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/sales/">Sales List</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/sales/new/">New Sale</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/manufacturers/">Manufacturers</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/manufacturers/new/">Add a Manufacturer</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/models/">Vehicle Models</NavLink>
            </li>
            <li className="nav-item fs-5 px-4">
              <NavLink className="nav-link" aria-current="page" to="/api/models/new/">New Vehicle Model</NavLink>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  )
}

export default Nav;
