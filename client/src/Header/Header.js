import React, { Component } from 'react';
import search from '../Images/search_button.png';
import logo from '../Images/adalogo.png';
import '../scss/Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }

  handleChange(e) {
    const value = e.target.value;

    this.setState({
      url: value
    });
  }

  render() {
    const url = '/items?search=' + this.state.url;
    return (
      <header>
        <div className='main-header-container'>
          <div className='logo-container'>
            <a href='/'>
              <img alt='Logo' src={logo} />
            </a>
          </div>
          <div className='search-container'>
            <form>
              <input
                type='text'
                placeholder='Nunca dejes de buscar'
                value={this.state.url}
                onChange={this.handleChange.bind(this)}
              />
              <Link to={url}>
                <button className='search-button'>
                  <img alt='Search' src={search} />
                </button>
              </Link>
            </form>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;


