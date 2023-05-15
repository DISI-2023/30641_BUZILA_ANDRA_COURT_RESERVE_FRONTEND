import React, { useState, useEffect } from "react";
import "./location.scss";
import { postRequest, getRequest } from "../api/httpUtils";

const AddCourtForm = ({ setIsOpen }) => {
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getAllLocations = async () => {
      try {
        const response = await getRequest("/location/getAllLocations");
        setLocations(response.data);
      } catch (error) {
        console.log("Error fetching locations", error);
      }
    };

    getAllLocations();
  }, []);

  const onNameChange = (value) => {
    setName(value.target.value);
  };

  const onTypeChange = (value) => {
    setType(value.target.value);
  };
  const onLocationChange = (value) => {
    setLocation(value.target.value);
  };

  const onClose = () => {
    setIsOpen(false);
    setAddSuccessfully(false);
  };
  const onFinish = async () => {
    const fieldsContent = {
      name: name,
      type: type,
      location_id: location,
    };

    try {
      await postRequest("/court/addCourt", fieldsContent);
      setAddSuccessfully(true);
    } catch (error) {
      setAddSuccessfully(false);
      console.log("Server error");
    }
  };

  return (
    <div className="locations-page">
      <div className="background-box">
        <h3>Add new court</h3>
        <div className="form ">
          <div className="form-line">
            <label>Name*</label>
            <input
              type={"text"}
              maxLength={100}
              placeholder="Name"
              onChange={(value) => onNameChange(value)}
              value={name}
            />
          </div>
          <div className="form-line">
            <label>Type*</label>
            <input
              type={"text"}
              placeholder="Type"
              onChange={(value) => onTypeChange(value)}
              value={type}
            />
          </div>
          <div className="form-line">
            <label>Location*</label>
            <select value={location} onChange={onLocationChange}>
              <option value="">Select a location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.address}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-submit">
          <p>You need to complete all the fields marked with *</p>
          {addSuccessfully && <p>Court added successfully</p>}
          <button
            className="btn"
            onClick={onFinish}
            disabled={!(name && location && type)}
          >
            Add
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourtForm;
