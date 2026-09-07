import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerList from './Sales/CustomerList';
import CustomerForm from './Sales/CustomerForm';
import SalesPeopleList from './Sales/SalesPeopleList';
import SalesPersonForm from './Sales/SalesPersonForm';
import SalesList from './Sales/SalesList';
import SaleForm from './Sales/SaleForm';
import ManufacturerList from './Inventory/ManufacturerList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import VehicleModelList from './Inventory/VehicleModelList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import AppointmentHistory from './Service/AppointHistory';
import TechnicianList from './Service/TechList';
import TechnicianForm from './Service/TechForm';
import AppointmentForm from './Service/AppointForm';
import AppointmentList from './Service/AppointList';
import AutomobileForm from './Inventory/AutoForm';
import AutomobileList from './Inventory/AutoList';


function App() {
  return (
    <BrowserRouter>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Nav />
      <div className="container-fluid p-4">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/api/customers/" element={<CustomerList />} />
          <Route path="/api/customers/new/" element={<CustomerForm />} />
          <Route path="/api/salespeople/" element={<SalesPeopleList />} />
          <Route path="/api/salespeople/new/" element={<SalesPersonForm />} />
          <Route path="/api/sales/" element={<SalesList />} />
          <Route path="/api/sales/new" element={<SaleForm />} />
          <Route path="/api/manufacturers/" element={<ManufacturerList />}/>
          <Route path="/api/manufacturers/new/" element={<ManufacturerForm />} />
          <Route path="/api/models/" element={<VehicleModelList />} />
          <Route path="/api/models/new/" element={<VehicleModelForm />} />
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="create" element={<AutomobileForm />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="create" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentHistory />} />
          </Route>
        </Routes>

      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
