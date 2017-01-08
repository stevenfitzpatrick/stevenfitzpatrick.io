import { h, Component } from 'preact';
import { Link } from 'preact-router';

export default class Header extends Component {
    render() {
        return (
            <header>
                <h1>Checking Header</h1>
                <nav>
                    <Link href='/'>Home</Link>
                    <Link href='/about'>About</Link>
                </nav>
            </header>
        )
    }
}