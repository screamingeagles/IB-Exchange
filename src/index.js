import '../src/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import Topics from './component/Topics/Topics';
import Sidebar from './component/Sidebar/Sidebar';
import Content from './component/Content/Content';
import Question from './component/Question/Question';

ReactDOM.render(
  <React.StrictMode>
    <div className="wrapper">
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="Topics/:TID" element={<Topics />} />
          <Route path="Question/:QID" element={<Question />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
