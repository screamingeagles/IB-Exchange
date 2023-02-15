import './Question.css';
import Answers from '../Answers/Answers';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';


const Question = () => {

  const { QID } = useParams();
  const [UsrID, setUserID] = useState(0);
  const [QuesID, setQuestionID] = useState(0);
  const [answerText, setAnswer] = useState('');
  let [question, setQuestion] = React.useState([]); // state hook

  const elmAnswer = useRef(null);

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

    fetch(`http://localhost:5050/api/Questions/${QID}`, params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        setQuestion(obj);
        obj.forEach(x => {
          setUserID(x.UID);
          setQuestionID(x.QID);
        });
      }).catch(err => { console.log(err); });

  }, [QID]);

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData()
    formData.append('UIQ', UsrID);
    formData.append('QID', QuesID);
    formData.append('UserResponse', answerText);

    const response = fetch('http://localhost:5050/api/Answer/Add', {
      method: 'POST',
      body: formData,
    }).then((obj) => {
      if (obj.statusText === "OK") {
        elmAnswer.current.value = '';
        setAnswer('');
      }
    }).catch(err => { console.log(err); });

    window.location.reload(false);
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header)  for topics Bread crum */}
      {question && question.map(item =>
        <React.Fragment key={item.TID}>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>{item.Question}</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">Home</li>
                    <li className="breadcrumb-item">Topics</li>
                    <li className="breadcrumb-item active">{item.TopicName}</li>
                  </ol>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">

                  <div className="col-md-12">
                    <div className="card card-primary card-outline">
                      <div className="card-header">
                        <h5 className="card-title m-0">{item.QuestionDescription}</h5>
                      </div>
                      <div className="card-body">
                        <div className="card-text">
                          <Answers />
                        </div>
                        <div>
                          <hr style={{ width: 50 + '%' }} />
                          <br />
                          <textarea rows={3} cols={125}
                            ref={elmAnswer}
                            onChange={e => setAnswer(e.target.value)}
                            placeholder="Give us your Shout..."></textarea>
                          <a onClick={e => { submitHandler(e) }} className="btn btn-primary">Give your Opinion!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
      {/* .content */}
    </div >
  );
};

export default Question;