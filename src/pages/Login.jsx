import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: () => navigate('/dashboard'),
    onError: () => console.log('Login Failed'),
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 text-sm font-medium">Password</label>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                Forgot your password?
              </a>
            </div>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
            Login
          </button>
          
          <button
            onClick={() => login()}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            Login with Google
          </button>

          <p className="text-center text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;