import './Answers.css';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Answers = () => {

  const { QID } = useParams();

  let [answers, setAnswers] = React.useState([]) // state hook

  React.useEffect(() => {
    // console.log("Calling Ansers");

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'false');
    headers.append('GET', 'POST', 'OPTIONS');

    let params = {
      headers: headers,
      method: "GET"
    }

    fetch(`http://localhost:5050/api/AnswersByQuestionID/${QID}`, params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        setAnswers(obj);
      }).catch(err => { console.log(err); });
  }, [QID]);


  return (
    answers && answers.map(item =>
      <blockquote key={item.AID} className={(item.CorrectAnswer == item.AID ? 'quote-secondary' : ' ')}>
        <p> {item.AnswerText}</p>
        <small>Answer By <cite title="Source Title">{item.UserName}</cite> on {item.AnswerDate}</small>
      </blockquote>
    )
  );
};

export default Answers;


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
  <Editor
            placeholder="Tell a story..."
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap} />
    //});

*/