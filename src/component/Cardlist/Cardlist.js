import './Cardlist.css';
import React from 'react';
import Question from '../QuestionList/QuestionList';

class CardlistComponent extends React.Component {

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
        this.setState({ topics: obj });
      }).catch(err => { console.log(err); });
  }

  constructor(props) {
    super(props);
    this.state = {
      topics: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {

    const cardBlocks = this.state.topics && this.state.topics.map(item =>
      <div className="col-md-6" key={item.TID}>
        <div className="card card-default">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fas fa-bullhorn"></i>
              &nbsp; {item.TopicName}
            </h3>
          </div>
          <div className="card-body">
            <Question topicID={item.TID} />
          </div>
        </div>
      </div>
    );


    return (
      <div className="row">
        {cardBlocks}
      </div>
    );
  }
}
export default CardlistComponent;