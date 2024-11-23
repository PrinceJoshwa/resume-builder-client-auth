//23-11-24
const API_URL = import.meta.env.VITE_API_URL || 'https://resume-builder-server-auth.vercel.app/api';

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
    
    if (!response.ok) {
      throw new Error('Failed to save resume');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to save resume');
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
    
    if (!response.ok) {
      throw new Error('Failed to fetch resumes');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch resumes');
  }
};

export const googleAuth = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Google authentication failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Google authentication failed');
  }
};