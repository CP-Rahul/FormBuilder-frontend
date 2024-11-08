import axios from "axios";
import { backendUrl } from "../constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Form = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

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

  const validateForm = (e) => {
    e.preventDefault();
    let formErrors = {};

    formData?.fields.forEach((field, index) => {
      const inputValue = e.target.elements[`input-${index}`].value;

      if (field.inputType === "email" && !validateEmail(inputValue)) {
        formErrors[`field-${index}`] = "Please enter a valid email address.";
      } else if (
        (field.inputType === "number" && isNaN(inputValue)) ||
        !inputValue
      ) {
        formErrors[`field-${index}`] = "Please enter a valid number.";
      } else if (field.inputType === "text" && inputValue.trim() === "") {
        formErrors[`field-${index}`] = "This field is required.";
      } else if (field.inputType === "password" && inputValue.length < 6) {
        formErrors[`field-${index}`] =
          "Password must be at least 6 characters long.";
      } else if (field.inputType === "date" && !inputValue) {
        formErrors[`field-${index}`] = "Please select a date.";
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      window.alert("Form Successfully validated");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col items-center mt-20 border border-black p-10 max-w-3xl"
        onSubmit={validateForm}
      >
        <h1 className="text-2xl my-5">{formData?.title}</h1>
        <div className="grid grid-cols-2 gap-4">
          {formData?.fields?.map((field, index) => (
            <div key={field._id} className="flex flex-col">
              <label>{field.label}</label>
              <input
                id={`input-${index}`}
                type={field.inputType}
                placeholder={field.placeholder}
                className="border-0 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
              />
              {errors[`field-${index}`] && (
                <p className="text-red-500 text-sm">
                  {errors[`field-${index}`]}
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white mt-5 px-4 py-2 rounded text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
