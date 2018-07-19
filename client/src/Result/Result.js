import React, { Component } from 'react';
import imgship from '../Images/ic_shipping.png';
import '../scss/Result.css';

class Result extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const freeship = this.props.result.free_shipping;
    let ifdecimal = '';
    if (this.props.result.price.decimals !== '00') {
      ifdecimal = this.props.result.price.decimals;
    }

    return (
      <a href={'http://localhost:3000/items/' + this.props.result.id}>
        <div className='result-container'>
          <div className='img-query'>
            <img alt={this.props.result.title} src={this.props.result.picture} />
          </div>

          <div className='price-result'>
            <span>
              $ {this.props.result.price.amount.toLocaleString('es')}
              <sup>{ifdecimal}</sup>
              <img alt='' src={freeship ? imgship : ''} />
            </span>
          </div>

          <div className='title-result'>
            <span>{this.props.result.title}</span>
          </div>

          <div className='location-result'>
            <span>{this.props.result.location}</span>
          </div>
        </div>
      </a>
    );
  }
}

export default Result;
