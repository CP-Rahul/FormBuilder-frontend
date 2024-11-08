import axios from "axios";
import { backendUrl } from "../constants";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditButton from "./EditButton";
import FormEditor from "./FormEditor";
import DeleteButton from "./DeleteButton";

const FormBuilder = () => {
  const [isShown, setIsShown] = useState(false);
  const [isInputTypeShown, setInputTypeShown] = useState(false);
  const [isFormEditorShown, setShowEditorShown] = useState(false);
  const [title, setTitle] = useState("Untitled Form");
  const [fields, setFields] = useState([]);
  const [editingFieldIndex, setEditingFieldIndex] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    setShowEditorShown(false);
    setIsShown(true);
  };

  const handleFormEditor = (index) => {
    setIsShown(false);
    setShowEditorShown(true);
    setEditingFieldIndex(index);
  };

  const addField = (inputType) => {
    if (fields.length >= 20) {
      window.alert("You can only add up to 20 fields.");
      return;
    }
    setFields((prevFields) => [
      ...prevFields,
      { inputType, label: "", placeholder: "", readOnly: true },
    ]);
  };

  const updateField = (key, value) => {
    setFields((prevFields) =>
      prevFields.map((field, index) =>
        index === editingFieldIndex ? { ...field, [key]: value } : field
      )
    );
  };

  const handleDeleteField = (index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();
    if (fields.length === 0) {
      window.alert("Add at least one field to form");
      return;
    }
    const hasMissingLabels = fields.some((field) => !field.label.trim());
    if (hasMissingLabels) {
      window.alert("Please ensure all fields have a title.");
      return;
    }

    try {
      const response = id
        ? await axios.patch(`${backendUrl}/form/${id}`, {
            title: title,
            fields: fields,
          })
        : await axios.post(`${backendUrl}/form`, {
            title: title,
            fields: fields,
          });
      navigate("/");
    } catch (error) {
      window.alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`${backendUrl}/form/${id}`).then((res) => {
        setTitle(res.data.title);
        setFields(res.data.fields);
      });
    }
  }, [id]);

  return (
    <div className="w-full flex flex-col items-center mt-5 gap-5">
      <h1 className="text-2xl">{id ? "Edit" : "Create"} New Form</h1>
      <div className="grid grid-cols-2 gap-20">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <h1 className="text-2xl">{title}</h1>
            <EditButton handleClick={handleEdit} />
          </div>
          <div>
            {fields && fields.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className="flex gap-2 border border-black px-2 py-3 max-w-xs"
                  >
                    <div className="flex flex-col">
                      <label>{field.label || "Title"}</label>
                      <input
                        className="border-0 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
                        type={field.inputTypeype}
                        readOnly={field.readOnly}
                      />
                    </div>
                    <EditButton handleClick={() => handleFormEditor(index)} />
                    <DeleteButton
                      handleClick={() => handleDeleteField(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>Add a new field to start.</p>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <button
              className="border border-gray-200 text-blue-400 rounded py-2 max-w-xs"
              onClick={() => setInputTypeShown((prev) => !prev)}
              type="button"
            >
              {isInputTypeShown ? "Close Add Input" : "Add Input"}
            </button>
            {isInputTypeShown && (
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-3 rounded"
                  onClick={() => addField("text")}
                >
                  Text
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-3 rounded"
                  onClick={() => addField("email")}
                >
                  Email
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-3 rounded"
                  onClick={() => addField("password")}
                >
                  Password
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-3 rounded"
                  onClick={() => addField("number")}
                >
                  Number
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-3 rounded"
                  onClick={() => addField("date")}
                >
                  Date
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-2xl">Form Editor</h1>
          {isShown && (
            <input
              type="text"
              className="border-0 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          {isFormEditorShown &&
            editingFieldIndex !== null &&
            fields[editingFieldIndex] && (
              <FormEditor
                type={fields[editingFieldIndex].inputType}
                label={fields[editingFieldIndex].label}
                placeholder={fields[editingFieldIndex].placeholder}
                updateField={updateField}
              />
            )}
        </div>
      </div>
      <button
        className="bg-green-600 text-white mt-5 px-4 py-2 rounded text-lg"
        type="submit"
        onClick={handleCreateForm}
      >
        {id ? "Update" : "Create"} Form
      </button>
    </div>
  );
};

export default FormBuilder;
