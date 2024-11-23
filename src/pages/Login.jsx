// import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const navigate = useNavigate();

//   const login = useGoogleLogin({
//     onSuccess: () => navigate('/dashboard'),
//     onError: () => console.log('Login Failed'),
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="m@example.com"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <div className="flex justify-between items-center">
//               <label className="block text-gray-700 text-sm font-medium">Password</label>
//               <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
//                 Forgot your password?
//               </a>
//             </div>
//             <input
//               type="password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>

//           <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
//             Login
//           </button>
          
//           <button
//             onClick={() => login()}
//             className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
//           >
//             <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
//             Login with Google
//           </button>

//           <p className="text-center text-sm">
//             Don't have an account?{' '}
//             <a href="#" className="text-blue-500 hover:text-blue-600">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

//23-11-24

//client/src/pages/Login.jsx
// import { useEffect } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import { googleAuth } from '../api';
// import { isAuthenticated } from '../utils/auth';


// function Login() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated()) {
//       navigate('/dashboard');
//     }
//   }, [navigate]);

//   const login = useGoogleLogin({
//     onSuccess: async (response) => {
//       try {
//         const userData = await googleAuth(response.access_token);
        
//         if (userData && userData.token) {
//           localStorage.setItem('userToken', userData.token);
//           localStorage.setItem('userData', JSON.stringify({
//             id: userData._id,
//             name: userData.name,
//             email: userData.email
//           }));
          
//           navigate('/dashboard');
//         } else {
//           console.error('Invalid response from server');
//         }
//       } catch (error) {
//         console.error('Login failed:', error);
//       }
//     },
//     onError: (error) => console.error('Login Failed:', error)
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="m@example.com"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <div className="flex justify-between items-center">
//               <label className="block text-gray-700 text-sm font-medium">Password</label>
//               <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
//                 Forgot your password?
//               </a>
//             </div>
//             <input
//               type="password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>

//           <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
//             Login
//           </button>
          
//           <button
//             onClick={() => login()}
//             className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
//           >
//             <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
//             Login with Google
//           </button>

//           <p className="text-center text-sm">
//             Don't have an account?{' '}
//             <a href="#" className="text-blue-500 hover:text-blue-600">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


// client/src/pages/Login.jsx
// import React, { useEffect, useState } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import { googleAuth } from '../api';
// import { isAuthenticated } from '../utils/auth';

// function Login() {
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (isAuthenticated()) {
//       navigate('/dashboard');
//     }
//   }, [navigate]);

//   const handleGoogleLogin = async (response) => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const userData = await googleAuth(response.access_token);
      
//       if (userData && userData.token) {
//         localStorage.setItem('userToken', userData.token);
//         localStorage.setItem('userData', JSON.stringify({
//           id: userData._id,
//           name: userData.name,
//           email: userData.email
//         }));
        
//         navigate('/dashboard');
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setError('Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = useGoogleLogin({
//     onSuccess: handleGoogleLogin,
//     onError: (error) => {
//       console.error('Google Login Failed:', error);
//       setError('Google login failed. Please try again.');
//     }
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="m@example.com"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>
          
//           <div>
//             <div className="flex justify-between items-center">
//               <label className="block text-gray-700 text-sm font-medium" htmlFor="password">Password</label>
//               <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
//                 Forgot your password?
//               </a>
//             </div>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>

//           <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
//             Login
//           </button>
          
//           <button
//             onClick={() => login()}
//             disabled={isLoading}
//             className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? (
//               <span>Loading...</span>
//             ) : (
//               <>
//                 <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
//                 Login with Google
//               </>
//             )}
//           </button>

//           <p className="text-center text-sm">
//             Don't have an account?{' '}
//             <a href="#" className="text-blue-500 hover:text-blue-600">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

//GPT
import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleAuth } from '../api';
import { isAuthenticated } from '../utils/auth';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleGoogleLogin = async (response) => {
    setIsLoading(true);
    setError('');
    try {
      // Pass id_token to backend
      const userData = await googleAuth(response.id_token); 
      
      if (userData && userData.token) {
        localStorage.setItem('userToken', userData.token);
        localStorage.setItem('userData', JSON.stringify({
          id: userData._id,
          name: userData.name,
          email: userData.email,
        }));
        
        navigate('/dashboard');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: (error) => {
      console.error('Google Login Failed:', error);
      setError('Google login failed. Please try again.');
    },
    scope: 'openid email profile', // Ensure correct scopes for id_token
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="space-y-4">
          <button
            onClick={() => login()}
            disabled={isLoading}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                Login with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
