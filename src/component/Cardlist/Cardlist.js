import './Cardlist.css';
import React from 'react';

class CardlistComponent extends React.Component {
  render(){
    return (
      <div className="card">
      <div className="card-header">
        <h3 className="card-title">Items Table</h3>

        <div className="card-tools">
          <div className="input-group input-group-sm" style={{width: 150 + 'px'}}>
            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />

            <div className="input-group-append">
              <button type="submit" className="btn btn-default">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body table-responsive p-0" style={{height: 300 + 'px'}}>
        <table className="table table-head-fixed text-nowrap">
          <thead>
            <tr>
              <th>ID -1</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>183</td>
              <td>John Doe</td>
              <td>11-7-2014</td>
              <td>
                <div className="form-group">
                  <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                    <input type="checkbox" className="custom-control-input" id="customSwitch3" />
                    <label className="custom-control-label" >Disabled</label>
                  </div>
                  </div>
                </td>
              <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* /.card-body */}
      </div>
    )
  }
}
export default CardlistComponent;