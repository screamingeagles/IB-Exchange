import './App.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
