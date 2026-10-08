import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import LoginPage from '../../features/auth/LoginPage';
import RegisterPage from '../../features/auth/RegisterPage';
import DashboardPage from '../../features/auth/DashboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome to CareConnect</h2>
            <p className="text-gray-600">Healthcare Appointment Management Platform</p>
            <div className="flex gap-4">
              <a
                href="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Register
              </a>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);

export default router;
