// //25-11-2024
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Eye, Download, Trash2 } from 'lucide-react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { getResumes, deleteResume } from '../api';
// import { isAuthenticated, getToken } from '../utils/auth';
// import ResumeCard from './ResumeCard';
// import ResumePreview from './ResumePreview';

// function MyResumes() {
//   const navigate = useNavigate();
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedResume, setSelectedResume] = useState(null);
//   const [downloadingId, setDownloadingId] = useState(null);

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
//     } catch (err) {
//       setError('Failed to fetch resumes');
//       setLoading(false);
//     }
//   };

//   const handleViewResume = (resume) => {
//     setSelectedResume(resume);
//   };

//   const handleDeleteResume = async (resumeId) => {
//     try {
//       const token = getToken();
//       await deleteResume(resumeId, token);
//       setResumes(resumes.filter(resume => resume._id !== resumeId));
//       if (selectedResume?._id === resumeId) {
//         setSelectedResume(null);
//       }
//     } catch (err) {
//       console.error('Error deleting resume:', err);
//       alert('Failed to delete resume. Please try again.');
//     }
//   };

//   const handleDownloadPDF = async (resume) => {
//     try {
//       setDownloadingId(resume._id);
//       const element = document.getElementById(`resume-${resume._id}`);
//       if (!element) {
//         throw new Error('Resume element not found');
//       }

//       // Set specific styles for PDF generation
//       const originalStyle = element.style.cssText;
//       element.style.width = '210mm';
//       element.style.minHeight = '297mm';
//       element.style.margin = '0';
//       element.style.padding = '20mm';
//       element.style.backgroundColor = 'white';
//       element.style.boxSizing = 'border-box';

//       const scale = 2;
//       const canvas = await html2canvas(element, {
//         scale: scale,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff',
//         windowWidth: 794, // A4 width in pixels at 96 DPI
//         windowHeight: 1123, // A4 height in pixels at 96 DPI
//       });

//       // Restore original styles
//       element.style.cssText = originalStyle;

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4',
//       });

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width / scale;
//       const imgHeight = canvas.height / scale;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

//       const centerX = (pdfWidth - imgWidth * ratio) / 2;
//       const centerY = 0; // Align to top

//       pdf.addImage(imgData, 'PNG', centerX, centerY, imgWidth * ratio, imgHeight * ratio);
//       pdf.save(`${resume.name || 'resume'}.pdf`);
//     } catch (err) {
//       console.error('Error generating PDF:', err);
//       alert('Failed to download PDF. Please try again.');
//     } finally {
//       setDownloadingId(null);
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
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">My Resumes</h1>
//           <div className="flex gap-4">
//             <button
//               onClick={() => navigate('/template1')}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Create New Resume
//             </button>
//             <button
//               onClick={() => navigate('/')}
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </div>

//         {resumes.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-8 text-center">
//             <p className="text-gray-600 mb-4">No resumes found. Create your first resume!</p>
//             <button
//               onClick={() => navigate('/template1')}
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
//             >
//               Create Resume
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {resumes.map((resume) => (
//               <ResumeCard
//                 key={resume._id}
//                 resume={resume}
//                 onView={() => handleViewResume(resume)}
//                 onDownload={() => handleDownloadPDF(resume)}
//                 onDelete={() => handleDeleteResume(resume._id)}
//                 isDownloading={downloadingId === resume._id}
//               />
//             ))}
//           </div>
//         )}

//         {selectedResume && (
//           <ResumePreview
//             resume={selectedResume}
//             onClose={() => setSelectedResume(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyResumes;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getResumes, deleteResume } from '../api';
import { isAuthenticated, getToken } from '../utils/auth';
import ResumeCard from '../pages/ResumeCard';
import ResumePreview from '../pages/ResumePreview';

function MyResumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

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
    } catch (err) {
      setError('Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleViewResume = (resume) => {
    setSelectedResume(resume);
  };

  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      const token = getToken();
      await deleteResume(resumeId, token);
      setResumes(resumes.filter(resume => resume._id !== resumeId));
      if (selectedResume?._id === resumeId) {
        setSelectedResume(null);
      }
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('Failed to delete resume. Please try again.');
    }
  };

  const handleDownloadPDF = async (resume) => {
    if (downloadingId) return;

    try {
      setDownloadingId(resume._id);
      
      // Wait for preview modal to open and render content
      if (!selectedResume || selectedResume._id !== resume._id) {
        setSelectedResume(resume);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const element = document.getElementById(`resume-content-${resume._id}`);
      if (!element) {
        throw new Error('Resume content not found');
      }

      // Clone the element to avoid modifying the visible content
      const clonedElement = element.cloneNode(true);
      clonedElement.style.width = '210mm';
      clonedElement.style.padding = '20mm';
      clonedElement.style.backgroundColor = 'white';
      document.body.appendChild(clonedElement);

      try {
        const canvas = await html2canvas(clonedElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 794, // A4 width in pixels at 96 DPI
          windowHeight: 1123 // A4 height in pixels at 96 DPI
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width / 2; // Divide by scale factor
        const imgHeight = canvas.height / 2;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        const centerX = (pdfWidth - imgWidth * ratio) / 2;
        const centerY = 0;

        pdf.addImage(imgData, 'PNG', centerX, centerY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`${resume.name || 'resume'}.pdf`);
      } finally {
        document.body.removeChild(clonedElement);
      }
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloadingId(null);
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
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/template1')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create New Resume
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">No resumes found. Create your first resume!</p>
            <button
              onClick={() => navigate('/template1')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Create Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onView={() => handleViewResume(resume)}
                onDownload={() => handleDownloadPDF(resume)}
                onDelete={() => handleDeleteResume(resume._id)}
                isDownloading={downloadingId === resume._id}
              />
            ))}
          </div>
        )}

        {selectedResume && (
          <ResumePreview
            resume={selectedResume}
            onClose={() => setSelectedResume(null)}
          />
        )}
      </div>
    </div>
  );
}

export default MyResumes;