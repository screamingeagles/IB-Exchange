import './Topics.css';
import React from 'react';
import QuestionList from '../QuestionList/QuestionList';
import { useParams } from 'react-router-dom';


const Topics = () => {

  const { TID } = useParams();

  let [topic, setTopic] = React.useState([]); // state hook

  React.useEffect(() => {
    //console.log("ID changed: " + TID);

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'false');
    headers.append('GET', 'POST', 'OPTIONS');

    let params = {
      headers: headers,
      method: "GET"
    }

    fetch(`http://localhost:5050/api/Topics/${TID}`, params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        setTopic(obj);
      }).catch(err => { console.log(err); });

  }, [TID]);



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
              {topic && topic.map(item =>
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
              )}
            </div>
          </div>
        </div>
      </section>
      {/* .content */}
    </div >
  );
}
export default Topics;