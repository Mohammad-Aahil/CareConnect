import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <div className="text-gray-600">Welcome to CareConnect</div>,
      },
    ],
  },
]);

export default router;
