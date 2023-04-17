import Layout from "./layout/Layout"
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, useRouteError } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import CreateInvoice from "./pages/CreateInvoice";


function App() {

  // Todo: Update the below code as Layout is re-rendering
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
    },
    {
      path: "/templates",
      element: (
        <Layout>
          <Templates />
        </Layout>
      )
    },
    {
      path: "/template/:tId",
      element: (
        <Layout>
          <CreateInvoice />
        </Layout>
      )
    },
    {
      path: "/profile",
      element: (
        <Layout>
          <Profile />
        </Layout>
      )
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
