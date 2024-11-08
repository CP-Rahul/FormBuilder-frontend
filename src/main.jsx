import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import FormBuilder from "./components/FormBuilder.jsx";
import Form from "./components/Form.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    children: [
      {
        path: "form/create",
        element: <FormBuilder />,
      },
      {
        path: "form/:id",
        element: <Form />,
      },
      {
        path: "form/:id/edit",
        element: <FormBuilder />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
