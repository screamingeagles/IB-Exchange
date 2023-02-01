import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/*  Brand Logo */}
    <a href="false" className="brand-link">
      <img src="/logo.svg" alt="Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">Test App</span>
    </a>

    {/*  -- Sidebar -- */}
    <div className="sidebar">

      {/*  -- Sidebar Menu -- */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/*  -- Add icons to the links using the .nav-icon className with font-awesome or any other icon font library -- */}
          <li className="nav-item">
            <a href="false" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Home Page
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="false" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>List</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="false" className="nav-link">
                  <i className="nav-icon fas fa-edit"></i>
                  <p>Add</p>
                </a>
              </li>              
            </ul>
          </li>
         </ul>
      </nav>
      {/*  -- /.sidebar-menu -- */}
    </div>
    {/*  -- /.sidebar -- */}
  </aside>
  );
}

export default Sidebar;
