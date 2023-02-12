import './Sidebar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Topics from '../Topics/Topics';

class sideBarComponent extends React.Component {

  fetchData() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'false');
    headers.append('GET', 'POST', 'OPTIONS');

    let params = {
      headers: headers,
      method: "GET"
    }

    fetch('http://localhost:5050/api/Topics', params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        this.setState(prevState => ({
          ...prevState.value,
          menus: obj
        }));
      })
      .catch(err => { console.log(err); });
  }


  constructor(props) {
    super(props);
    this.state = {
      menus: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const menuRows = this.state.menus && this.state.menus.map((link) =>
      <li className="nav-item" key={link.TID}>
        <Link to={`/Topics/${link.TID}`} component={Topics} key={link.TID} className="nav-link">
          <i className="nav-icon fas fa-th"></i>
          <p>{link.TopicName}</p>
        </Link>
      </li >
    );

    return (

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/*  Brand Logo */}
        <a href="false" className="brand-link">
          <img src="/logo.svg" alt="Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">IB Exchange</span>
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
                  {menuRows}
                </ul>
              </li>
            </ul>
          </nav>
          {/*  -- /.sidebar-menu -- */}
        </div>
        {/*  -- /.sidebar -- */}
      </aside>

    )
  }
}


export default sideBarComponent;
