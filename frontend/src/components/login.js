import React, { useState } from "react";

const Login = (props) => {
  const initialUserState = {
    name: "",
    id: "",
  };
  const [user, setUser] = useState(initialUserState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const login = () => {
    props.login(user);
    props.history.push("/");
  };
  return (
    <div className="submit-form">
      <div className="form-group">
        <label htmlFor="user">Username</label>
        <input type="text" className="form-control" id="name" value={user.name} name="name" onChange={handleInputChange} required/>
      </div>
      <div className="form-group">
        <label htmlFor="id">ID</label>
        <input type="text" className="form-control" id="id" value={user.id} name="id" onChange={handleInputChange} required />
        <button onClick={login} className="btn btn-success mt-4 ">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
