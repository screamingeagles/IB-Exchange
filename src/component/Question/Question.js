import './Question.css';
import React, { useState, useEffect } from 'react';
import {Editor, EditorState} from 'draft-js';

const Question = ({ QID }) => {

  let [question, setQuestion] = React.useState([]) // state hook

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

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

    fetch(`http://localhost:5050/api/Questions/${QID}`, params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        setQuestion(obj);
      }).catch(err => { console.log(err); });

  }, [QID])

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

  
  //https://codepen.io/AvanthikaMeenakshi/pen/MWWpOJz
  //https://blog.logrocket.com/build-rich-text-editors-react-draft-js-react-draft-wysiwyg/
  return (
    <div className="callout callout-info" key={QID}>
      {question && question.map(item =>
        <React.Fragment key={item.QID}>          
	          <h5> {item.Question} </h5>
            <p> {item.QuestionDescription} </p>
            <Editor editorState={editorState}
               placeholder="Tell a story..."
               blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
             onChange={setEditorState} />
        </React.Fragment>
      )}
    </div>
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