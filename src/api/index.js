//client/src/api/index.js
// const API_URL = import.meta.env.VITE_API_URL || 'https://resume-builder-server-auth.vercel.app/api';

// export const saveResume = async (resumeData, token) => {
//   try {
//     const response = await fetch(`${API_URL}/resumes`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(resumeData),
//       credentials: 'include'
//     });
    
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Failed to save resume');
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const getResumes = async (token) => {
//   try {
//     const response = await fetch(`${API_URL}/resumes`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       credentials: 'include'
//     });
    
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Failed to fetch resumes');
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const googleAuth = async (token) => {
//   try {
//     const response = await fetch(`${API_URL}/users/google`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ token }),
//       credentials: 'include'
//     });
    
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Google authentication failed');
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// client/src/api/index.js
// const API_URL = import.meta.env.VITE_API_URL || 'https://resume-builder-server-auth.vercel.app/api';

// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// };

// export const saveResume = async (resumeData, token) => {
//   try {
//     const response = await fetch(`${API_URL}/resumes`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(resumeData),
//       credentials: 'include'
//     });
    
//     return handleResponse(response);
//   } catch (error) {
//     console.error('Error saving resume:', error);
//     throw error;
//   }
// };

// export const getResumes = async (token) => {
//   try {
//     const response = await fetch(`${API_URL}/resumes`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       credentials: 'include'
//     });
    
//     return handleResponse(response);
//   } catch (error) {
//     console.error('Error fetching resumes:', error);
//     throw error;
//   }
// };

// export const googleAuth = async (token) => {
//   try {
//     const response = await fetch(`${API_URL}/users/google`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ token }),
//       credentials: 'include'
//     });
    
//     return handleResponse(response);
//   } catch (error) {
//     console.error('Google authentication error:', error);
//     throw error;
//   }
// };

//GPT
const API_URL = import.meta.env.VITE_API_URL || 'https://resume-builder-server-auth.vercel.app/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const saveResume = async (resumeData, token) => {
  try {
    const response = await fetch(`${API_URL}/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(resumeData),
      credentials: 'include'
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error saving resume:', error);
    throw error;
  }
};

export const getResumes = async (token) => {
  try {
    const response = await fetch(`${API_URL}/resumes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    throw error;
  }
};

// Updated googleAuth to send id_token
export const googleAuth = async (accessToken) => {
    try {
      console.log('Sending accessToken to server:', accessToken); // Add this log
      const response = await fetch(`${API_URL}/users/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
        credentials: 'include',
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Google authentication error:', error);
      throw error;
    }
  };

