import { Route } from 'react-router-dom';
import './App.css';
import './home.css';
import './about.css';
import './projects.css';
import './resume.css';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Resume from './Pages/Resume';

function App() {
  document.title = "Anointed's Portfolio"
  return (
    <div className="App">
      <Navbar />
      <Route path='/' exact component={Home} />
      <Route path='/about' component={About} />
      <Route path='/projects' component={Projects} />
      <Route path='/resume' component={Resume} />
    </div>
  );
}

export default App;
