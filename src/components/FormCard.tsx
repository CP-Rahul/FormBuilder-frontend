import axios from "axios";
import { backendUrl } from "../constants";
import React from "react";
import { Link } from "react-router-dom";

const FormCard = ({ title, id, refresh }) => {
  const deleteForm = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/form/${id}`);
      refresh();
    } catch (error) {
      window.alert("Something went wrong");
    }
  };
  return (
    <div className="p-4 border border-black max-w-sm">
      <p className="text-xl">{title}</p>
      <div className="flex gap-2 mt-2">
        <button className="text-green-400">
          <Link to={`/form/${id}`}>View</Link>
        </button>
        <button className="text-blue-400">
          <Link to={`/form/${id}/edit`}>Edit</Link>
        </button>
        <button className="text-red-400" type="submit" onClick={deleteForm}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FormCard;
