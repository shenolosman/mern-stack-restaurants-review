import React, { useEffect, useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisine();
  }, []);

  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };
  const onChangeSearchZip = (e) => {
    setSearchZip(e.target.value);
  };
  const onChangeSearchCuisine = (e) => {
    setSearchCuisine(e.target.value);
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((res) => {
        // console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisine = () => {
    RestaurantDataService.getCuisines()
      .then((res) => {
        // console.log(res.data);
        setCuisines(["All Cuisines"].concat(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((res) => {
        // console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByName = () => {
    find(searchName, "name");
  };
  const findByZip = () => {
    find(searchZip, "zipcode");
  };
  const findByCuisine = () => {
    if (searchCuisine === "All Cuisine") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            aria-label="Search by name"
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByName}>
              Search
            </button>
          </div>
        </div>
        <div className="input-group col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zipcode"
            aria-label="Search by zipcode"
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByZip}>
              Search
            </button>
          </div>
        </div>
        <div className="input-group col">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((x) => {
              return (
                <option value={x} key={x}>
                  {x.substring(0, 20)}
                </option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByCuisine}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}`;
          return (
            <div className="col-sm-4" key={restaurant._id}>
              <div className="card" style={{ marginBottom: "10px" }}>
                <div className="card-header">
                  <h5 className="card-title">{restaurant.name}</h5>
                </div>

                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">{restaurant.borough}</h6>
                  <p className="card-text">
                    <strong>Cuisine :</strong> {restaurant.cuisine} <br />
                    <strong>Address :</strong> {address}
                  </p>
                  <Link to={`/restaurants/` + restaurant._id} className="card-link">
                    {/* {console.log(`/restaurants/` + restaurant._id)} */}
                    View Reviews
                  </Link>
                  <a href={`https://www.google.com/maps/place/` + address} className="card-link" target="_blank" rel="noreferrer">
                    Google Map
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
