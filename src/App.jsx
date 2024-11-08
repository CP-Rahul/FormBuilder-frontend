import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormCard from "./components/FormCard";
import { backendUrl } from "./constants";

const App = () => {
  const [forms, setForms] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const changeRefresh = () => {
    setRefresh((prev) => !prev);
  };
  const fetchForms = async () => {
    try {
      const response = await axios.get(`${backendUrl}/form`);
      setForms(response.data);
    } catch (error) {
      window.alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchForms();
  }, [refresh]);
  return (
    <>
      <div className="w-full flex flex-col items-center mt-5 gap-2 bg-red-200">
        <h1 className="text-4xl">Welcome to Form.com</h1>
        <p>This is a simple form builder</p>
        <button className="bg-green-800 text-white p-2 max-w-sm rounded">
          <Link to={"/form/create"}>Create New Form</Link>
        </button>
        <hr className="border-t border-gray-400 w-3/4 mx-auto mt-2" />
      </div>
      <div className="w-3/4 mx-auto">
        <h1 className="text-4xl mt-10">Forms</h1>
        {forms.length > 0 ? (
          <div className="flex flex-col gap-2">
            {forms?.map((form) => (
              <FormCard
                key={form._id}
                title={form.title}
                id={form._id}
                refresh={changeRefresh}
              />
            ))}
          </div>
        ) : (
          <p>You have no forms created yet.</p>
        )}
      </div>
    </>
  );
};

export default App;
