import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import MyApplications from "./pages/MyApplications";
import Applicants from "./pages/Applicants";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar/Navbar";
import AdminUsers from "./pages/AdminUsers";
import AdminJobs from "./pages/AdminJobs";
import AdminApplications from "./pages/AdminApplications";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <RoleBasedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <RoleBasedRoute allowedRoles={["student"]}>
              <MyApplications />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/recruiter-dashboard"
          element={
            <RoleBasedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/applicants"
          element={
            <RoleBasedRoute allowedRoles={["recruiter"]}>
              <Applicants />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <RoleBasedRoute allowedRoles={["recruiter"]}>
              <PostJob />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <RoleBasedRoute allowedRoles={["recruiter"]}>
              <EditJob />
            </RoleBasedRoute>
          }
        />
       
        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        <Route
         path="*"
         element={<NotFound />}
        />

        <Route
          path="/admin-dashboard"
          element={ <RoleBasedRoute allowedRoles={["admin"]}> <AdminDashboard /> </RoleBasedRoute> }
        />
        <Route
          path="/admin/users"
          element={ <RoleBasedRoute allowedRoles={["admin"]}> <AdminUsers /> </RoleBasedRoute> }
        />

        <Route
         path="/admin/jobs"
         element={ <RoleBasedRoute allowedRoles={["admin"]}> <AdminJobs /> </RoleBasedRoute> }
         />

         <Route
         path="/admin/applications"
         element={ <RoleBasedRoute allowedRoles={["admin"]}> <AdminJobs /> </RoleBasedRoute> }
         />
      </Routes>
    </>
  );
}

export default App;