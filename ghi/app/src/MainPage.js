import { NavLink } from 'react-router-dom';

function MainPage() {
  return (
    <div className="hero px-4 py-5 text-center">
      <div className="hero-glow" />
      <h1 className="display-3 fw-bold text-white mb-2">AutoFlow</h1>
      <div className="hero-accent mx-auto mb-4" />
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4 text-light">
          The premiere solution for automobile dealership
          management!
        </p>
        <NavLink to="/automobiles" className="btn btn-danger btn-lg px-4 fw-semibold">
          View Inventory
        </NavLink>
      </div>
      <div className="hero-stripes" />
    </div>
  );
}

export default MainPage;
