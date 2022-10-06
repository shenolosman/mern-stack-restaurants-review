import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";

const Restaurants = (props) => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then((res) => {
        setRestaurant(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId,props.user.id)
      .then((res) => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1);
          return { ...prevState };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine : </strong>
            {restaurant.cuisine} <br />
            <strong>Address : </strong>
            {restaurant.address.building} {restaurant.address.street} {restaurant.address.zipcode}
          </p>
          <Link to={`/restaurants/` + props.match.params.id + "/review"} className="card-link">
            Add Reviews
          </Link>
          <hr />
          <h4>Reviews</h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-md-4 pb-1" key={index}>
                    <div className="card" style={{ marginBottom: "10px" }}>
                      <div className="card-header">
                        <h5 className="card-title">{review.text}</h5>
                      </div>

                      <div className="card-body">
                        <p className="card-text">
                          <strong>User :</strong> {review.name} <br />
                          <strong>Date :</strong> {review.date}
                        </p>
                        {props.user && props.user.id === review.user_id && (
                          <div className="row">
                            <button onClick={() => deleteReview(review._id, index)} className="btn btn-outline-success">
                              Delete
                            </button>
                            <Link
                              to={{
                                pathname: "/restaurants/" + props.match.params.id + "/review",
                                state: { currentReview: review },
                              }}
                              className="btn btn-outline-warning col-md-5 mx-1 mb-1"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <br />
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
