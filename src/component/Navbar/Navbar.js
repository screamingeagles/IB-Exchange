import './Navbar.css';

function Navbar() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a  href="false" className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars"></i></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="false" className="nav-link">Home</a>
      </li>
    </ul>
  </nav>
  );
}

export default Navbar;
