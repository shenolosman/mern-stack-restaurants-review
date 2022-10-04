import express from "express";
import RestaurantsController from "./restaurants.controller.js";
import ReviewController from "./reviews.controller.js";
const router = express.Router();

router.route("/").get(RestaurantsController.apiGetRestaurants);

router
  .route("/review")
  .post(ReviewController.apiPostReview)
  .put(ReviewController.apiUpdateReview)
  .delete(ReviewController.apiDeleteReview);

export default router;
