import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import BaseLayout from './layouts/BaseLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ImportExportPage from './pages/admin/ImportExportPage';
import CreateEntityPage from './pages/admin/CreateEntityPage';
import ProgressOverviewPage from './pages/admin/ProgressOverviewPage';
import FormsManagementPage from './pages/admin/FormsManagementPage';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import CourseViewPage from './pages/staff/CourseViewPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import CoursePage from './pages/student/CoursePage';
import FormQuizPage from './pages/student/FormQuizPage';
import ProfilePage from './pages/ProfilePage';

function RequireAuth({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<DashboardLayout />}>
        {/* Admin routes */}
        <Route path="/admin/*">
          <Route 
            path="dashboard" 
            element={
              <RequireAuth allowedRoles={['admin']}>
                <AdminDashboard />
              </RequireAuth>
            } 
          />
          <Route 
            path="import-export" 
            element={
              <RequireAuth allowedRoles={['admin']}>
                <ImportExportPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="create" 
            element={
              <RequireAuth allowedRoles={['admin']}>
                <CreateEntityPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="progress" 
            element={
              <RequireAuth allowedRoles={['admin']}>
                <ProgressOverviewPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="forms" 
            element={
              <RequireAuth allowedRoles={['admin']}>
                <FormsManagementPage />
              </RequireAuth>
            } 
          />
        </Route>

        {/* Staff routes */}
        <Route path="/staff/*">
          <Route 
            path="dashboard" 
            element={
              <RequireAuth allowedRoles={['admin', 'staff']}>
                <StaffDashboard />
              </RequireAuth>
            } 
          />
          <Route 
            path="courses/:id" 
            element={
              <RequireAuth allowedRoles={['admin', 'staff']}>
                <CourseViewPage />
              </RequireAuth>
            } 
          />
        </Route>

        {/* Student routes */}
        <Route path="/student/*">
          <Route 
            path="dashboard" 
            element={
              <RequireAuth allowedRoles={['admin', 'staff', 'student']}>
                <StudentDashboard />
              </RequireAuth>
            } 
          />
          <Route 
            path="courses/:id" 
            element={
              <RequireAuth allowedRoles={['admin', 'staff', 'student']}>
                <CoursePage />
              </RequireAuth>
            } 
          />
          <Route 
            path="courses/:courseId/forms/:formId" 
            element={
              <RequireAuth allowedRoles={['admin', 'staff', 'student']}>
                <FormQuizPage />
              </RequireAuth>
            } 
          />
        </Route>

        {/* Common protected routes */}
        <Route 
          path="/profile" 
          element={
            <RequireAuth allowedRoles={['admin', 'staff', 'student']}>
              <ProfilePage />
            </RequireAuth>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;