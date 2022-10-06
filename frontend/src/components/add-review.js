import React, { useState } from "react";
import { Link } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";

const AddReview = (props) => {
  let initialReviewState = "";

  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setReview(e.target.value);
  };
  const saveReview = () => {
    var data = { text: review, name: props.user.name, user_id: props.user.id, restaurant_id: props.match.params.id };
    console.log("data: ",data );
    if (editing) {
      data.review_id = props.location.state.currentReview._id;
      RestaurantDataService.updateReview(data)
        .then((res) => {
          setSubmitted(true);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then((res) => {
          setSubmitted(true);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {props.user ? (
        <div>
          <div className="submit-form">
            {submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <Link to={"/restaurants/" + props.match.params.id} className="btn btn-outline-primary">
                  Back to Restaurant
                </Link>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="description">{editing ? "Edit" : "Create"}</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
                <button onClick={saveReview} className="btn btn-outline-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p> Please Log in</p>
        </div>
      )}
    </div>
  );
};

export default AddReview;
