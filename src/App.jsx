// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Template1 from './components/Template1';
// import SaveResume from './components/SaveResumeModal';

// const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '352112236-q2che8r2qdoscgovbi09vkc7oglgkj8a.apps.googleusercontent.com';

// function App() {
//   return (
//     <GoogleOAuthProvider clientId={googleClientId}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/template1" element={<Template1 />} />
//           <Route path="/myresume" element={<SaveResume />} />
//         </Routes>
//       </BrowserRouter>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Template1 from './components/Template1';
import SaveResume from './components/SaveResumeModal';
import Template1Page from './pages/Template1';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '352112236-q2che8r2qdoscgovbi09vkc7oglgkj8a.apps.googleusercontent.com';

function App() {
  return (
   <GoogleOAuthProvider clientId={googleClientId}>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/template1" element={<Template1Page />} />
      </Routes>
    </Router>
   </GoogleOAuthProvider>
  );
}

export default App;