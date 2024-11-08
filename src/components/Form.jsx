import axios from "axios";
import { backendUrl } from "../constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { validateField } from "../utils/validate";

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

      const error = validateField(inputValue, field); 
      if (error) {
        formErrors[`field-${index}`] = error;
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      window.alert("Form Successfully validated");
    }
  };

  const handleInputChange = (e, index) => {
    const inputValue = e.target.value;
    let formErrors = { ...errors };

    const field = formData?.fields[index];
    const error = validateField(inputValue, field); 

    if (error) {
      formErrors[`field-${index}`] = error;
    } else {
      delete formErrors[`field-${index}`]; 
    }

    setErrors(formErrors);
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
                onChange={(e) => handleInputChange(e, index)}
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
