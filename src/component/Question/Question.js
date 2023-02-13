import './Question.css';
import React, { useState, useEffect } from 'react';
import { Editor, EditorState } from 'draft-js';
import { useParams } from 'react-router-dom';

const Question = () => {

  const { QID } = useParams();

  let [question, setQuestion] = React.useState([]) // state hook

  React.useEffect(() => {
    console.log("QID changed: " + QID);

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


  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

  // Custom overrides for "code" style.
  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };


  return (

    <div className="content-wrapper">
      {/* Content Header (Page header)  for topics Bread crum */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Discussion Board</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#/">Home</a></li>
                <li className="breadcrumb-item active">Topics</li>
              </ol>
            </div>
          </div>
        </div>{/* /.container-fluid */}
      </section >

      {/* Main content */}
      < section className="content" >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {question && question.map(item =>
                <div className="col-md-12" key={item.TID}>
                  <div className="card card-default">
                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="fas fa-bullhorn"></i>
                        &nbsp; {item.TopicName}
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="callout callout-info" >
                        <h5> {item.Question} </h5>
                        <p> {item.QuestionDescription} </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
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