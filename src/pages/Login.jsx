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
// import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import { googleAuth } from '../api';
// import { isAuthenticated } from '../utils/auth';
// import { useEffect, useState } from 'react';

// function Login() {
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (isAuthenticated()) {
//       navigate('/dashboard');
//     }
//   }, [navigate]);

//   const login = useGoogleLogin({
//     onSuccess: async (response) => {
//       try {
//         setError('');
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
//           setError('Invalid response from server');
//         }
//       } catch (error) {
//         console.error('Login failed:', error);
//         setError(error.message || 'Login failed. Please try again.');
//       }
//     },
//     onError: (error) => {
//       console.error('Login Failed:', error);
//       setError('Google login failed. Please try again.');
//     }
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
//             {error}
//           </div>
//         )}
        
//         <div className="space-y-4">
//           <button
//             onClick={() => login()}
//             className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
//           >
//             <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
//             Login with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleAuth } from '../api';
import { isAuthenticated } from '../utils/auth';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    // Add your email/password login logic here
  };

  const handleGoogleLogin = async (response) => {
    setIsLoading(true);
    setError('');
    try {
      const userData = await googleAuth(response.access_token);
      
      if (userData && userData.token) {
        localStorage.setItem('userToken', userData.token);
        localStorage.setItem('userData', JSON.stringify({
          id: userData._id,
          name: userData.name,
          email: userData.email
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
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-[400px] rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-100 border border-red-400 p-3 text-sm text-red-700" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a 
                href="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Forgot your password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 px-4 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        <button
          onClick={() => login()}
          disabled={isLoading}
          className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/signup" className="text-blue-500 hover:text-blue-600">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;

