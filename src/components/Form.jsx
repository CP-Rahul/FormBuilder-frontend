import axios from "axios";
import { backendUrl } from "../constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Form = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  const fetchForm = async () => {
    try {
      const response = await axios.get(`${backendUrl}/form/${id}`);
      setFormData(response.data);
    } catch (error) {
      window.alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchForm();
  }, []);
 
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mt-20 border border-black p-10 max-w-3xl">
        <h1 className="text-2xl my-5">{formData?.title}</h1>
        <div className="grid grid-cols-2 gap-4">
          {formData?.fields?.map((field) => (
            <div key={field._id} className="flex flex-col">
              <label>{field.label}</label>
              <input
                type={field.inputType}
                placeholder={field.placeholder}
                readOnly={field.readOnly}
                className="border-0 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="bg-green-600 text-white mt-5 px-4 py-2 rounded text-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
