import './Question.css';
import Answers from '../Answers/Answers';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Question = () => {

  const { QID } = useParams();

  let [question, setQuestion] = React.useState([]) // state hook

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
      }).catch(err => { console.log(err); });

  }, [QID]);



  const submitHandler = (e) => {
    e.preventDefault();

    // let formData = new FormData()
    // formData.append('QID', this.state.newStaff.QID);
    // formData.append('UIQ', this.state.newStaff.UID);
    // formData.append('LastName', this.state.newStaff.LName);

    // const response = await fetch('http://localhost:5050/api/Answer/Add', {
    //   method: 'POST',
    //   body: formData,
    // });
    alert("Save Your Answer");
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
                          <textarea rows={3} cols={125} placeholder="Give us your Shout..."></textarea>
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