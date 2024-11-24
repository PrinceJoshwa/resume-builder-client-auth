// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getResumes } from '../api';
// import { isAuthenticated, getToken } from '../utils/auth';
// import { Eye, Download, Trash2 } from 'lucide-react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// function MyResumes() {
//   const navigate = useNavigate();
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate('/login');
//       return;
//     }

//     fetchResumes();
//   }, [navigate]);

//   const fetchResumes = async () => {
//     try {
//       const token = getToken();
//       const data = await getResumes(token);
//       setResumes(data);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch resumes');
//       setLoading(false);
//     }
//   };

//   const handleDownloadPDF = async (resume) => {
//     try {
//       const element = document.getElementById(`resume-${resume._id}`);
//       const canvas = await html2canvas(element);
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF();
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${resume.name}.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-8">My Resumes</h1>
        
//         {resumes.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-8 text-center">
//             <p className="text-gray-600">No resumes found. Create your first resume!</p>
//             <button
//               onClick={() => navigate('/template1')}
//               className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
//             >
//               Create Resume
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {resumes.map((resume) => (
//               <div
//                 key={resume._id}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
//               >
//                 <div
//                   id={`resume-${resume._id}`}
//                   className="p-6 border-b"
//                 >
//                   <h2 className="text-xl font-semibold mb-4">{resume.name}</h2>
//                   <div className="space-y-4">
//                     <div>
//                       <h3 className="font-medium text-gray-700">Personal Info</h3>
//                       <p>{resume.data.personalInfo.name}</p>
//                       <p className="text-gray-600">{resume.data.personalInfo.title}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-700">Skills</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {resume.data.skills.map((skill, index) => (
//                           <span
//                             key={index}
//                             className="bg-gray-100 px-2 py-1 rounded text-sm"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="p-4 bg-gray-50 rounded-b-lg flex justify-end gap-2">
//                   <button
//                     onClick={() => navigate(`/resume/${resume._id}`)}
//                     className="p-2 text-gray-600 hover:text-gray-900"
//                     title="View"
//                   >
//                     <Eye size={20} />
//                   </button>
//                   <button
//                     onClick={() => handleDownloadPDF(resume)}
//                     className="p-2 text-gray-600 hover:text-gray-900"
//                     title="Download PDF"
//                   >
//                     <Download size={20} />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteResume(resume._id)}
//                     className="p-2 text-red-600 hover:text-red-700"
//                     title="Delete"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyResumes;



//client/src/pages/MyResume.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResumes } from '../api';
import { isAuthenticated, getToken } from '../utils/auth';
import { Eye, Download, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function MyResumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    fetchResumes();
  }, [navigate]);

  const fetchResumes = async () => {
    try {
      const token = getToken();
      const data = await getResumes(token);
      setResumes(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch resumes');
      setLoading(false);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    try {
        const token = getToken(); 
      await deleteResume(resumeId, token);
      setResumes(resumes.filter(resume => resume._id !== resumeId));
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  const handleDownloadPDF = async (resume) => {
    try {
      const element = document.getElementById(`resume-${resume._id}`);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      
      const imgX = (pageWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${resume.name}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-8">My Resumes</h1>
        <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
        {resumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No resumes found. Create your first resume!</p>
            <button
              onClick={() => navigate('/template1')}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Create Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  id={`resume-${resume._id}`}
                  className="p-6 border-b"
                >
                  <h2 className="text-xl font-semibold mb-4">{resume.name}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Personal Info</h3>
                      <p>{resume.data.personalInfo.name}</p>
                      <p className="text-gray-600">{resume.data.personalInfo.title}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {resume.data.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 px-2 py-1 rounded text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-b-lg flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/resume/${resume._id}`)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                    title="View"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(resume)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                    title="Download PDF"
                  >
                    <Download size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteResume(resume._id)}
                    className="p-2 text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyResumes;