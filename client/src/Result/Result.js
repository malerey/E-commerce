import React, { Component } from "react";
import imgship from "../Images/ic_shipping.png";
import "../scss/Result.css";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    let freeship = this.props.result.free_shipping;

    let ifdecimal = "";

    if (this.props.result.price.decimals !== "00") {
      ifdecimal = this.props.result.price.decimals;
    }

    return (
      <a href={"http://localhost:3000/items/" + this.props.result.id}>
        <div className="result-container">
          <div className="img-query">
            <img alt={this.props.result.title} src={this.props.result.picture} />
          </div>

          <div className="price-result">
            <p>
              $ {this.props.result.price.amount.toLocaleString("es")}
              <sup>{ifdecimal}</sup>
              <img alt="Envio gratis" src={freeship ? imgship : undefined} />
            </p>
          </div>

          <div className="title-result">
            <p>{this.props.result.title}</p>
          </div>
        </div>
      </a>
    );
  }
}

export default Result;
