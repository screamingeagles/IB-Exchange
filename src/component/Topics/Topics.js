import './Topics.css';
import React from 'react';
import Question from '../QuestionList/QuestionList';
//import { useParams } from "react-router-dom";
//import { withRouter } from "react-router";


class TopicsComponent extends React.Component {

  fetchData(paramID) {

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

  // const { match } = this.props;

  constructor(props) {
    super(props);

    //console.log("--------------");
    // let { id } = this.props;
    //console.log(id);
    //const { TopicID } = this.props;
    //console.log(studentId);
    //console.log("--------------");

    this.state = {
      question: ''
    };
  }

  componentDidMount() {
    this.fetchData(5);
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
export default TopicsComponent;