import React, { Component } from "react";
import Header from "../Header/Header";
import queryString from "query-string";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Result from "../Result/Result";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      received: false
    };
  }

  componentDidMount() {
    let parsed = queryString.parse(this.props.location.search);
    let query = parsed.search;
    fetch("http://localhost:3001/api/items?q=" + query)
      .then(data => {
        return data.json();
      })
      .then(result => {
        this.setState({
          data: result,
          received: true,
          query: query,
        });
      });
  }

  componentDidUpdate() {
    let parsed = queryString.parse(this.props.location.search);
    let newquery = parsed.search;
    if(newquery !== this.state.query) {
    fetch("http://localhost:3001/api/items?q=" + newquery)
      .then(data => {
        return data.json();
      })
      .then(result => {
        this.setState({
          data: result,
          received: true,
          query: newquery,
        });
      });
   }
}

  render() {
    let { received, data } = this.state;

    return (
      <div className="Main">

        <Header />

        <Breadcrumb breadcrumb={this.state} />

        <div>
          {received ? (
            <div>
              {data.items.map((url, index) => {
                return <Result key={index} result={url} />;
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Results;