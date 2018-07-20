import React, { Component } from "react";
import free_shipping_img from "../Images/ic_shipping.png";
import { Link } from "react-router-dom";
import "../scss/Result.css";

class Result extends Component {
  render() {
    const props = this.props.result
    const free_shipping = props.free_shipping;
    const url = "items/" + props.id;
    let display_decimals = "";
    if (props.price.decimals !== "00") {
      display_decimals = props.price.decimals;
    }

    return (
      <Link to={url}>
        <div className="result-container">
          <div className="img-query">
            <img
              alt={props.title}
              src={props.picture}
            />
          </div>

          <div className="price-result">
            <span>
              {props.price.currency}{" "}
              {props.price.amount.toLocaleString("es")}
              <sup>{display_decimals}</sup>
              <img alt="" src={free_shipping ? free_shipping_img : ""} />
            </span>
          </div>

          <div className="title-result">
            <span>{props.title}</span>
          </div>

          <div className="location-result">
            <span>{props.location}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default Result;
