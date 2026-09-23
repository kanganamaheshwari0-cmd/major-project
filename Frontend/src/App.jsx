import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import MyApplications from "./pages/MyApplications";
import Applicants from "./pages/Applicants";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/home" element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
         }
     />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
           <ProtectedRoute>
              <Profile />
           </ProtectedRoute>
         }
    />
    <Route path="/student-dashboard" element={
    <ProtectedRoute>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

      <Route path="/jobs" element={
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
  path="/recruiter-dashboard"
  element={
    <ProtectedRoute>
      <RecruiterDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-applications"
  element={
    <ProtectedRoute>
      <MyApplications />
    </ProtectedRoute>
  }
/>

<Route
  path="/applicants"
  element={
    <ProtectedRoute>
      <Applicants />
    </ProtectedRoute>
  }
/>

<Route
  path="/post-job"
  element={<PostJob />}
/>

<Route
  path="/edit-job/:id"
  element={<EditJob />}
/>
      </Routes>
    </>
  );
}

export default App;