import React, { Component } from "react";
import zomatosearch from "./zomatosearch.module.css";

class Zomatosearch extends Component {
  state = {
    categories: [],
    latitude: "",
    longitude: "",
    searchResult: [],
    reviews: [],
  };

  componentDidMount() {
    this.getCurrectLocation();
  }

  getCurrectLocation = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      this.setState(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        () => console.log(this.state.latitude, this.state.longitude)
      );
    });
  };

  searchRestaurants = (searchText) => {
    fetch(
      `https://developers.zomato.com/api/v2.1/search?q=${searchText}&count=5&lat=${this.state.latitude}&lon=${this.state.longitude}&sort=real_distance&order=asc
    `,
      {
        headers: {
          "user-key": "c8f7112c308ba9ff0ce93b0dc1ae127e",
        },
      }  
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({ searchResult: data.restaurants, reviews: [] }, () =>
          console.log(this.state.searchResult)
        )
      )
      .catch((err) => console.log(err));
  };

  getReview = (id) => {
    fetch(`https://developers.zomato.com/api/v2.1/reviews?res_id=${id}`, {
      headers: {
        "user-key": "c8f7112c308ba9ff0ce93b0dc1ae127e",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({ searchResult: [], reviews: data.user_reviews }, () =>
          console.log(this.state.reviews)
        )
      )
      .catch((err) => console.log(err));   
  };

  render() {
    return (
      <div className={zomatosearch.input}>
        <h1>zomato</h1>
        <h3>Discover food and drinks in your place.</h3>
        <label className={zomatosearch.searchlabel} htmlFor="search-input">
          <input
            type="text"
            onChange={(e) => this.searchRestaurants(e.target.value)}
            placeholder="enter restaurant name..."
          />
          <i className={`fa fa-search ${zomatosearch.searchicon}`}></i>
        </label>
        {this.state.searchResult.length &&
          this.state.searchResult.map(({ restaurant }) => (
            <div
              className={zomatosearch.restaurants}
              onClick={() => this.getReview(restaurant.id)}
              key={restaurant.id}
            >
              {restaurant.name} - {restaurant.location.address}
            </div>
          ))}
        {this.state.reviews.length > 0 &&
          this.state.reviews.map(({ review }) => {
            return (
              <div className={zomatosearch.reviews}>
                <div className={zomatosearch.rating}>
                  <h3>User - {review.user.name}</h3>
                  <h3>Rating -{review.rating}</h3>
                </div>
                <p>Review - {review.review_text + review.rating_text}</p>
              </div>
            );
          })}
        }
      </div>
    );
  }
}
export default Zomatosearch;
