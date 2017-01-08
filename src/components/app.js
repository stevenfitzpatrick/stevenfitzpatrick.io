import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from './home';
import About from './about';
import Error from './error';


export default class App extends Component {
    handleRoute = e => {
        this.currentUrl = e.url;
    }
    
    render() {
        return (
            <div class="container">
                <Router onChange={this.handleRoute}>
                    <Home path='/' />
                    <About path='/about/' />
                    <Error type='404' default/>
                </Router>
            </div>
        )
    }
}
