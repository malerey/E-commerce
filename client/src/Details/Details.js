import React, { Component } from 'react';
import '../scss/Details.css';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const received = this.props.details.received;
    return (
      <div className='product-container'>
        <div className='img-container'>
          <img alt={received ? this.props.details.data.item.title : ''} src={received ? this.props.details.data.item.picture : ''} />
        </div>

        <div className='title-container'>
          <span>
            {received && (
              <React.Fragment>
                {this.props.details.data.item.condition === 'new' && 'Nuevo '}
                {this.props.details.data.item.condition === 'used' && 'Usado'}
                {this.props.details.data.item.condition === 'not_specified' &&
                  ''}
              </React.Fragment>
            )}
          </span>
          <span>
            - {received ? this.props.details.data.item.sold_quantity : ''}{' '}
            vendidos
          </span>
          <h1>{received ? this.props.details.data.item.title : ''}</h1>

          <div className='price-container'>
            <p>
              ${' '}
              {received
                ? this.props.details.data.item.price.amount.toLocaleString('es')
                : ''}
            </p>
            <p className='decimals'>
              {' '}
              {received ? this.props.details.data.item.price.decimals : ''}
            </p>
          </div>

          <button className='buybtn'>Comprar</button>
        </div>

        <div className='description-container'>
          <p className='description-title'>Descripción del producto</p>
          <p className='description'>
            {received ? this.props.details.data.item.description : ''}
          </p>
        </div>
      </div>
    );
  }
}

export default Product;

