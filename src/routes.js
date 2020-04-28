import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Main from './components/Main';

const Routes = (props) => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} onAuthenticate={props.onAuthenticate}  />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/main' component={Main} />
        </Switch>
    </Router>
);


export default Routes;