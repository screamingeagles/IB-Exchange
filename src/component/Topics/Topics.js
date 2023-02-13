import './Topics.css';
import React from 'react';
import QuestionList from '../QuestionList/QuestionList';

class TopicsComponent extends React.Component {

  fetchData(paramID) {
    console.log("fetch called with :" + paramID);
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'false');
    headers.append('GET', 'POST', 'OPTIONS');

    let params = {
      headers: headers,
      method: "GET"
    }

    fetch(`http://localhost:5050/api/QuestionsByTopicID/${paramID}`, params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        this.setState({ question: obj });
      }).catch(err => { console.log(err); });
  }

  

  constructor(props) {
    super(props);
    this.state = {
      question: ''
    };
  }

  componentDidMount() {
    const params = window.location.href.split('/');
    const TopicID = params[params.length-1];
    this.fetchData(TopicID);
  }

  render() {
    const cardBlocks = this.state.question && this.state.question.map(item =>
      <div className="col-md-12" key={item.TID}>
        <div className="card card-default">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fas fa-bullhorn"></i>
              &nbsp; {item.TopicName}
            </h3>
          </div>
          <div className="card-body">
            <QuestionList topicID={item.TID} />
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
export default TopicsComponent;