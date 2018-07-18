import React, { Component } from "react";
import "../scss/Breadcrumb.css";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const received = this.props.breadcrumb.received;

    let categories = [];

    if (received === true) {
      categories = this.props.breadcrumb.data.categories.map((item, index) => (
        <li key={index}>{item}</li>
      ));
    } else categories = "";

    return (
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <ul>{received ? categories : ""}</ul>
        </div>
      </div>
    );
  }
}

export default Breadcrumb;
