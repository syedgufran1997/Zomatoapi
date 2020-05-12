import React, { Component } from "react";
import zomatosearch from "./zomatosearch.module.css";

class Zomatosearch extends Component {
  state = {
    loading: true,
  };
  async componentDidMount() {
    const url =
      "https://developers.zomato.com/api/v2.1/cities?q=Bangalore&city_ids=50&count=50";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }
  render() {
    return (
      <div className={zomatosearch.input}>
        <h1>Zomato</h1>
        <h3>Discover food and drinks in your place.</h3>
        <label className={zomatosearch.searchlabel} htmlFor="search-input">
          <input
            type="text"
            name="Search"
            placeholder="Search for Restaurent or dish."
          />
          <i className={`fa fa-search ${zomatosearch.searchicon}`}></i>
        </label>
        {this.state.loading ? <div>loading...</div> : <div>person..</div>}
      </div>
    );
  }
}
export default Zomatosearch;
