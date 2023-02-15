import './Answers.css';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Answers = () => {

  const { QID } = useParams();

  let [answers, setAnswers] = React.useState([]) // state hook

  React.useEffect(() => {
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