import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import Singlefriend from './Components/Frienddetails/Singlefriend';
import Friends from './Components/Friends/Friends';
import Home from './Components/Home/Home';
import Notfound from './Components/Notfound/Notfound';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/home">Home</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/about">About</Link>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/home">
            <Home></Home>
          </Route>
          <Route path="/friends">
            <Friends></Friends>
          </Route>
          <Route path="/friend/:slug" Singlefriend={<Singlefriend />}>
            <Singlefriend></Singlefriend>
          </Route>
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
