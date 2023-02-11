import './QuestionList.css';
import React, { useState, useEffect } from 'react';



const QuestionList = ({ topicID }) => {

  let [questions, setQuestions] = React.useState([]) // state hook

  React.useEffect(() => {                           // side effect hook

    // call API with props.greeting parameter
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'false');
    headers.append('GET', 'POST', 'OPTIONS');

    let params = {
      headers: headers,
      method: "GET"
    }

    fetch(`http://localhost:5050/api/QuestionsByTopicID/${topicID}`, params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        console.log(obj);
        setQuestions(obj);
      }).catch(err => { console.log(err); });

  }, [topicID])


  return (
    <div className="callout callout-info" key={topicID}>
      {questions && questions.map(item =>
        <>
          <h5 key={item.QID}> {item.Question} </h5>
          <p key={item.QID}> {item.QuestionDescription} </p>
        </>
      )}
    </div>
  );
};


export default QuestionList;

/*

    // // temporary check item
    // var isPresent = false;
    // // check if item exists in topics array
    // isPresent = topics.filter(item => { if (item.TID == ques.TID) { return true; } });

    // // add the item in topics array if the element does not exists already
    // if (isPresent == false) {
    //   var hold = { TID: ques.TID, TopicName: ques.TopicName, Header: banner[(index % 5)] };
    //   topics.push(hold);
    //   index++;
    // }
  
    // const cardsItems = this.state.questions && this.state.questions.map((item) =>
    //   <div className="callout callout-danger" key={item.TID}>
    //     <h5>{item.TID}</h5>
    //     <p>{item.TopicName}</p>
    //   </div>
    // );

    //const cardsItems = topics.map((item) => {

    // getting filtered questions 
    // let dataTable = this.state.questions.filter(ques => {
    //   return ques.TID == item.TID;
    // });

    // console.log(dataTable);
    // // iterate questions and make HTML
    // let QuesHTML = dataTable.map(row => {
    //   <div className={`callout ${item.Header}`} key={row.QID}>
    //     <h5>{row.Question}</h5>
    //     <p>{row.QuestionDescription}</p>
    //   </div>
    // });

    // console.log("----------");
    // console.log(item);
    // console.log("----------");


    //});

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

    fetch('http://localhost:5050/api/Questions', params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        this.setState({ questions: obj }, () => {

          // this is the call back function of set state for topics         

          let index = 0;
          let tempList = [];
          let banner = ['callout-info', 'callout-danger', 'callout-warning', 'callout-success', 'callout-info'];

          this.state.questions && this.state.questions.forEach(ques => {

            // temporary check item
            var isPresent = false;

            // check if item exists in topics array
            isPresent = tempList.filter(item => { if (item.TID == ques.TID) { return true; } });

            // add the item in topics array if the element does not exists already
            if (isPresent == false) {
              var hold = { TID: ques.TID, TopicName: ques.TopicName, Header: banner[(index % 5)] };
              tempList.push(hold);
              index++;
            }

          });
          this.setState({ topics: tempList });

          // set state call back function ends here...
        });
      })
      .catch(err => { console.log(err); });
  }
*/