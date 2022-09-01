import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import AddVacation from './components/AddVacation';
import EditVacation from './components/EditVacation';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Vacations from './components/Vacations';


function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/add" component={AddVacation} />
        <Route path="/edit/:id" component={EditVacation} />
        <Route path="/" exact component={Vacations} />
      </div>
    </Router>
  );
}

export default App;
