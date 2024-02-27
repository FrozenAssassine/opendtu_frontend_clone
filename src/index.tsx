import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import SolarGraphPage from './components/solarGraphPage/SolarGraphPage';
import HomePage from './components/homePage/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<HomePage/>),
  },
  {
    path: "*",
    element: (<div>40404040404040404040404</div>),
  },
  {
    path: "/stats",
    element: (<SolarGraphPage/>)
  },
]);
createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);