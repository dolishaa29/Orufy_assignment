import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UpdateProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = Cookies.get("token");

      const res = await axios.get("http://localhost:7000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const res = await axios.post(
        "http://localhost:7000/updateprofile",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>

      <form onSubmit={updateProfile}>
        <input name="name" value={user.name} onChange={handleChange} />
        <br /><br />

        <input name="email" value={user.email} onChange={handleChange} />
        <br /><br />

        <input name="contact" value={user.contact} onChange={handleChange} />
        <br /><br />

        <input name="address" value={user.address} onChange={handleChange} />
        <br /><br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;