const FormEditor = ({ type, label, placeholder, updateField }) => {
  return (
    <form className="flex flex-col gap-5">
      <h1>{type}</h1>
      <input
        type="text"
        placeholder="Title"
        className="border-0 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
        value={label}
        onChange={(e) => updateField("label", e.target.value)}
      />
      <input
        type="text"
        placeholder="Placeholder"
        className="border-0 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
        value={placeholder}
        onChange={(e) => updateField("placeholder", e.target.value)}
      />
    </form>
  );
};

export default FormEditor;
