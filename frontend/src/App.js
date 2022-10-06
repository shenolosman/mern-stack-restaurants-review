import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { AddReview, Login, Restaurants, RestaurantsList } from "./components";
function App() {
  const [user, setUser] = useState(null);

  const login = async (user = null) => {
    setUser(user);
  };
  const logout = async (user = null) => {
    setUser(null);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        <a className="navbar-brand" href="/restaurants">
          Restaurant Reviews
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to={"/restaurants"} className="nav-link">
                Restaurants
              </Link>
            </li>
            {user ? (
              <li className="nav-item active">
                <Link to={"logout"} className="nav-link">
                  Logout {user.name}
                </Link>
              </li>
            ) : (
              <li className="nav-item active">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
            <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
            <Route path="/restaurants/:id/review" render={(props) => <AddReview {...props} user={user} />} />
            <Route path="/restaurants/:id" render={(props) => <Restaurants {...props} user={user} />} />
            <Route path="/login" render={(props) => <Login {...props} login={login} />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
