import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import SolarGraphPage from './components/solarGraphPage/solarGraphPage';
import HomePage from './components/homePage/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './components/App';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App activeIndex={0}/>),
  },
  {
    path: "*",
    element: (<div>40404040404040404040404</div>),
  },
  {
    path: "/live",
    element: (<App activeIndex={0}/>),
  },  {
    path: "/history",
    element: (<App activeIndex={1}/>),
  },  {
    path: "/table",
    element: (<App activeIndex={2}/>),
  },
]);
createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);