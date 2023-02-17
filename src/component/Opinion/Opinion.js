import './Opinion.css';
import React from 'react';

class OpinionComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questionHeading: '',
      questionText: '',
      topics: [],
      value: 0,
      UID: 1
    };
  }

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

    fetch('http://localhost:5050/api/Topics', params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        this.setState({ topics: obj });
      })
      .catch(err => { console.log(err); });
  }

  componentDidMount() {
    this.fetchData();
  }

  setTopicValue(event) {
    this.setState({ value: event.target.value });
  }

  setQuestionText = (event) => {
    this.setState({ questionText: event.target.value });
    this.setState(prevState => ({
      ...prevState.topics,
      ...prevState.value
    }));
  }

  setQuestionTitle = (event) => {
    this.setState({ questionHeading: event.target.value });
    this.setState(prevState => ({
      ...prevState.questionText,
      ...prevState.topics,
      ...prevState.value
    }));
  }


  saveQuestion() {

    if (this.state.value == 0) {
      alert('please Select Topic');
      return
    }
    if (this.state.questionText == '') {
      alert('please Provide Question Details');
      return
    }

    if (this.state.questionHeading == '') {
      alert('please Provide Question Title');
      return
    }

    let formData = new FormData()
    formData.append('UIQ', this.state.UID);
    formData.append('TID', this.state.value);
    formData.append('UserQuestion', this.state.questionText);
    formData.append('questionTitle', this.state.questionHeading);

    const response = fetch('http://localhost:5050/api/Question/Add', {
      method: 'POST',
      body: formData,
    }).then((obj) => {
      if (obj.statusText === "OK") {
        if (typeof window !== 'undefined') {
          window.location.href = `http://localhost:3000/Topics/${this.state.value}`;
        }
      }
    }).catch(err => { console.log(err); });



  }

  render() {

    const topicRows = this.state.topics && this.state.topics.map((item) =>
      <option key={item.TID} value={item.TID}>{item.TopicName}</option>
    );

    return (<div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Ask Your Question Here....</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#/">Home</a></li>
                <li className="breadcrumb-item active">Your Opinion</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">

            {/*  all of the elements will come here in card */}
            <div className='col-sm-12'>
              <div className='row'>
                <div className="col-sm-3" style={{ textAlign: 'right' }}>
                  Select Topic:
                </div>
                <div className="col-sm-9">
                  <select className="custom-select rounded-0"
                    onChange={(e) => this.setTopicValue(e)}
                    value={this.state.value}
                    id="SelectTopic">
                    <option key='0' value='0' defaultValue>Select Your Topic</option>
                    {topicRows}
                  </select>
                </div>
              </div>
              <br />
              <div className='row'>
                <div className="col-sm-3" style={{ textAlign: 'right' }}>
                  Type Your Question Title:
                </div>
                <div className="col-sm-9">
                  <input type='text' id='txtTitle' rows={5} cols={95}
                    style={{ width: 100 + '%' }}
                    onChange={(e) => this.setQuestionTitle(e)}
                    placeholder='your title....' />
                </div>
              </div>
              <br />

              <div className='row'>
                <div className="col-sm-3" style={{ textAlign: 'right' }}>
                  Type Your Question Text:
                </div>
                <div className="col-sm-9">
                  <textarea id='txtQuestion' rows={5} cols={95}
                    style={{ width: 100 + '%' }}
                    onChange={(e) => this.setQuestionText(e)}
                    placeholder='your question....'></textarea>
                </div>
              </div>
              <br />
              <div className='row'>
                <div className="col-sm-12" style={{ textAlign: 'center' }}>
                  <button type={'button'} className='btn btn-success'
                    onClick={() => this.saveQuestion()}
                    name='submit' >Save changes</button>
                </div>
              </div>
            </div>
            {/*  all of the elements will come here in card */}

          </div>
        </div>
      </section >
    </div >);
  }
};

export default OpinionComponent;