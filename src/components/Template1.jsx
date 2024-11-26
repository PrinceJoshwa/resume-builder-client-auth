// ' use client'

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Phone, Mail, MapPin, Download, Save } from 'lucide-react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import SaveResumeModal from './SaveResumeModal';
// import { saveResume } from '../api';
// import { isAuthenticated, getToken } from '../utils/auth';

// const initialFormData = {
//   personalInfo: { name: '', title: '', email: '', phone: '', location: '' },
//   skills: [''],
//   experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
//   education: [{ degree: '', school: '', startDate: '', endDate: '' }],
//   certifications: [{ name: '', issuer: '', date: '' }]
// };

// export default function Template1() {
//   const navigate = useNavigate();
//   const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
//   const [formData, setFormData] = useState(initialFormData);

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleChange = (section, field, value, index = null) => {
//     setFormData(prev => {
//       const newData = { ...prev };
//       if (section === 'skills') {
//         newData.skills = [...prev.skills];
//         newData.skills[index] = value;
//       } else if (index !== null && Array.isArray(newData[section])) {
//         newData[section] = [...newData[section]];
//         newData[section][index] = { ...newData[section][index], [field]: value };
//       } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
//         newData[section] = { ...newData[section], [field]: value };
//       } else {
//         newData[section] = value;
//       }
//       return newData;
//     });
//   };

//   const addItem = (section) => {
//     setFormData(prev => {
//       const newData = { ...prev };
//       if (section === 'skills') {
//         newData.skills = [...prev.skills, ''];
//       } else {
//         const emptyItem = section === 'experience' 
//           ? { title: '', company: '', startDate: '', endDate: '', description: '' }
//           : section === 'education'
//           ? { degree: '', school: '', startDate: '', endDate: '' }
//           : { name: '', issuer: '', date: '' };
//         newData[section] = [...prev[section], emptyItem];
//       }
//       return newData;
//     });
//   };

//   const removeItem = (section, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: prev[section].filter((_, i) => i !== index)
//     }));
//   };

//   const clearForm = () => {
//     setFormData(initialFormData);
//   };

  // const handleSaveResume = async (resumeName) => {
  //   try {
  //     const token = getToken();
  //     if (!token) {
  //       throw new Error('Please login to save resume');
  //     }

  //     await saveResume({
  //       name: resumeName,
  //       data: formData
  //     }, token);

  //     setIsSaveModalOpen(false);
  //     clearForm();
  //   } catch (error) {
  //     console.error('Error saving resume:', error);
  //   }
  // };

//   const downloadPDF = async () => {
//     const element = document.getElementById('resume-preview');
//     if (!element) return;

//     try {
//       const scale = 2;
//       const canvas = await html2canvas(element, {
//         scale: scale,
//         useCORS: true,
//         logging: false,
//         windowWidth: element.scrollWidth * scale,
//         windowHeight: element.scrollHeight * scale
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4'
//       });

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width / scale;
//       const imgHeight = canvas.height / scale;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
//       const centerX = (pdfWidth - imgWidth * ratio) / 2;
//       const centerY = (pdfHeight - imgHeight * ratio) / 2;

//       pdf.addImage(imgData, 'PNG', centerX, centerY, imgWidth * ratio, imgHeight * ratio);
//       pdf.save('resume.pdf');
//       clearForm();
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto">
//       <div className="flex-1 space-y-6">
//         {/* Personal Information */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-bold mb-4">Personal Information</h2>
//           <div className="space-y-4">
//             {Object.entries(formData.personalInfo).map(([key, value]) => (
//               <div key={key}>
//                 <label htmlFor={`personal-${key}`} className="block text-sm font-medium text-gray-700 mb-1">
//                   {key.charAt(0).toUpperCase() + key.slice(1)}
//                 </label>
//                 <input
//                   id={`personal-${key}`}
//                   type={key === 'email' ? 'email' : 'text'}
//                   className="w-full p-2 border rounded-md"
//                   value={value}
//                   onChange={(e) => handleChange('personalInfo', key, e.target.value)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-bold mb-4">Skills</h2>
//           {formData.skills.map((skill, index) => (
//             <div key={index} className="flex items-center space-x-2 mb-2">
//               <input
//                 type="text"
//                 className="flex-grow p-2 border rounded-md"
//                 value={skill}
//                 onChange={(e) => handleChange('skills', null, e.target.value, index)}
//               />
//               <button
//                 onClick={() => removeItem('skills', index)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 -
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={() => addItem('skills')}
//             className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
//           >
//             + Add Skill
//           </button>
//         </div>

//         {/* Experience */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-bold mb-4">Experience</h2>
//           {formData.experience.map((exp, index) => (
//             <div key={index} className="space-y-4 mb-4 border-b pb-4 last:border-b-0">
//               <input
//                 type="text"
//                 placeholder="Job Title"
//                 className="w-full p-2 border rounded-md"
//                 value={exp.title}
//                 onChange={(e) => handleChange('experience', 'title', e.target.value, index)}
//               />
//               <input
//                 type="text"
//                 placeholder="Company"
//                 className="w-full p-2 border rounded-md"
//                 value={exp.company}
//                 onChange={(e) => handleChange('experience', 'company', e.target.value, index)}
//               />
//               <div className="flex gap-4">
//                 <input
//                   type="text"
//                   placeholder="Start Date"
//                   className="w-full p-2 border rounded-md"
//                   value={exp.startDate}
//                   onChange={(e) => handleChange('experience', 'startDate', e.target.value, index)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="End Date"
//                   className="w-full p-2 border rounded-md"
//                   value={exp.endDate}
//                   onChange={(e) => handleChange('experience', 'endDate', e.target.value, index)}
//                 />
//               </div>
//               <textarea
//                 placeholder="Description"
//                 className="w-full p-2 border rounded-md h-32"
//                 value={exp.description}
//                 onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
//               />
//               <button
//                 onClick={() => removeItem('experience', index)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={() => addItem('experience')}
//             className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
//           >
//             + Add Experience
//           </button>
//         </div>

//         {/* Education */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-bold mb-4">Education</h2>
//           {formData.education.map((edu, index) => (
//             <div key={index} className="space-y-4 mb-4 border-b pb-4 last:border-b-0">
//               <input
//                 type="text"
//                 placeholder="Degree"
//                 className="w-full p-2 border rounded-md"
//                 value={edu.degree}
//                 onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
//               />
//               <input
//                 type="text"
//                 placeholder="School"
//                 className="w-full p-2 border rounded-md"
//                 value={edu.school}
//                 onChange={(e) => handleChange('education', 'school', e.target.value, index)}
//               />
//               <div className="flex gap-4">
//                 <input
//                   type="text"
//                   placeholder="Start Date"
//                   className="w-full p-2 border rounded-md"
//                   value={edu.startDate}
//                   onChange={(e) => handleChange('education', 'startDate', e.target.value, index)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="End Date"
//                   className="w-full p-2 border rounded-md"
//                   value={edu.endDate}
//                   onChange={(e) => handleChange('education', 'endDate', e.target.value, index)}
//                 />
//               </div>
//               <button
//                 onClick={() => removeItem('education', index)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={() => addItem('education')}
//             className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
//           >
//             + Add Education
//           </button>
//         </div>

//         {/* Certifications */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-bold mb-4">Certifications</h2>
//           {formData.certifications.map((cert, index) => (
//             <div key={index} className="space-y-4 mb-4 border-b pb-4 last:border-b-0">
//               <input
//                 type="text"
//                 placeholder="Certification Name"
//                 className="w-full p-2 border rounded-md"
//                 value={cert.name}
//                 onChange={(e) => handleChange('certifications', 'name', e.target.value, index)}
//               />
//               <input
//                 type="text"
//                 placeholder="Issuer"
//                 className="w-full p-2 border rounded-md"
//                 value={cert.issuer}
//                 onChange={(e) => handleChange('certifications', 'issuer', e.target.value, index)}
//               />
//               <input
//                 type="text"
//                 placeholder="Date"
//                 className="w-full p-2 border rounded-md"
//                 value={cert.date}
//                 onChange={(e) => handleChange('certifications', 'date', e.target.value, index)}
//               />
//               <button
//                 onClick={() => removeItem('certifications', index)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={() => addItem('certifications')}
//             className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
//           >
//             + Add Certification
//           </button>
//         </div>
//       </div>

//       {/* Preview Section */}
//       <div className="flex-1">
//         <div className="sticky top-8">
//           <div 
//             id="resume-preview" 
//             className="bg-white shadow-lg rounded-lg p-8"
//             style={{
//               width: '210mm',
//               minHeight: '297mm',
//               margin: '0 auto',
//               padding: '20mm',
//               boxSizing: 'border-box'
//             }}
//           >
//             {/* Header */}
//             <div className="mb-6 border-b-2 border-blue-600 pb-4">
//               <h1 className="text-3xl font-bold text-blue-600">
//                 {formData.personalInfo.name || 'Your Name'}
//               </h1>
//               <h2 className="text-xl text-gray-600 mt-1">
//                 {formData.personalInfo.title || 'Professional Title'}
//               </h2>
//             </div>

//             {/* Contact Info */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
//               {formData.personalInfo.email && (
//                 <div className="flex items-center">
//                   <Mail className="mr-2 text-blue-600" size={16} />
//                   <span>{formData.personalInfo.email}</span>
//                 </div>
//               )}
//               {formData.personalInfo.phone && (
//                 <div className="flex items-center">
//                   <Phone className="mr-2 text-blue-600" size={16} />
//                   <span>{formData.personalInfo.phone}</span>
//                 </div>
//               )}
//               {formData.personalInfo.location && (
//                 <div className="flex items-center">
//                   <MapPin className="mr-2 text-blue-600" size={16} />
//                   <span>{formData.personalInfo.location}</span>
//                 </div>
//               )}
//             </div>

//             {/* Skills */}
//             {formData.skills.length > 0 && formData.skills[0] && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Skills</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.skills.map((skill, index) => (
//                     skill && (
//                       <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
//                         {skill}
//                       </span>
//                     )
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Experience */}
//             {formData.experience.length > 0 && formData.experience[0].title && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Experience</h3>
//                 {formData.experience.map((exp, index) => (
//                   <div key={index} className="mb-4">
//                     <h4 className="font-semibold">{exp.title}</h4>
//                     <p className="text-gray-600">{exp.company}</p>
//                     <p className="text-sm text-gray-500">
//                       {exp.startDate} - {exp.endDate}
//                     </p>
//                     <p className="text-sm mt-1">{exp.description}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Education */}
//             {formData.education.length > 0 && formData.education[0].degree && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Education</h3>
//                 {formData.education.map((edu, index) => (
//                   <div key={index} className="mb-2">
//                     <h4 className="font-semibold">{edu.degree}</h4>
//                     <p className="text-gray-600">{edu.school}</p>
//                     <p className="text-sm text-gray-500">
//                       {edu.startDate} - {edu.endDate}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Certifications */}
//             {formData.certifications.length > 0 && formData.certifications[0].name && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Certifications</h3>
//                 {formData.certifications.map((cert, index) => (
//                   <div key={index} className="mb-2">
//                     <h4 className="font-semibold">{cert.name}</h4>
//                     <p className="text-gray-600">{cert.issuer}</p>
//                     <p className="text-sm text-gray-500">{cert.date}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-8 flex justify-center space-x-4">
//             <button
//               onClick={() => setIsSaveModalOpen(true)}
//               className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 flex items-center gap-2"
//             >
//               <Save className="h-5 w-5" />
//               Save Resume
//             </button>
//             <button
//               onClick={downloadPDF}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2"
//             >
//               <Download className="h-5 w-5" />
//               Download PDF
//             </button>
//           </div>

          // <SaveResumeModal
          //   isOpen={isSaveModalOpen}
          //   onClose={() => setIsSaveModalOpen(false)}
          //   onSave={handleSaveResume}
          // />
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Phone, Mail, Linkedin, Github, MapPin, Briefcase, 
//   GraduationCap, Award, FolderOpen, Languages, 
//   Download, Save 
// } from 'lucide-react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { saveResume } from '../api';
// import { isAuthenticated, getToken } from '../utils/auth';
// import SaveResumeModal from './SaveResumeModal';

// function Template1() {
//   const navigate = useNavigate();
//   const resumeRef = useRef(null);
//   const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     personalInfo: {
//       name: '',
//       title: '',
//       email: '',
//       phone: '',
//       location: '',
//       linkedin: '',
//       github: ''
//     },
//     summary: '',
//     skills: [''],
//     experience: [{
//       title: '',
//       company: '',
//       startDate: '',
//       endDate: '',
//       description: '',
//       points: ['']
//     }],
//     education: [{
//       degree: '',
//       school: '',
//       startDate: '',
//       endDate: '',
//       score: ''
//     }],
//     projects: [{
//       name: '',
//       description: '',
//       points: ['']
//     }],
//     certifications: [{
//       name: '',
//       issuer: '',
//       date: ''
//     }],
//     languages: [{
//       name: '',
//       proficiency: ''
//     }]
//   });

//   useEffect(() => {
//     // Check authentication when component mounts
//     if (!isAuthenticated()) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleSaveResume = async (resumeName) => {
//     try {
//       const token = getToken();
//       if (!token) {
//         throw new Error('Please login to save resume');
//       }

//       await saveResume({
//         name: resumeName,
//         data: formData
//       }, token);

//       setIsSaveModalOpen(false);
//       clearForm();
//     } catch (error) {
//       console.error('Error saving resume:', error);
//     }
//   };


//   const handleInputChange = (section, index, field, value) => {
//     setFormData(prev => {
//       const newData = { ...prev };
//       if (section === 'personalInfo') {
//         newData.personalInfo[field] = value;
//       } else if (section === 'skills') {
//         const newSkills = [...prev.skills];
//         newSkills[index] = value;
//         newData.skills = newSkills;
//       } else if (Array.isArray(newData[section])) {
//         if (field.includes('.')) {
//           const [mainField, subField] = field.split('.');
//           newData[section][index][mainField][subField] = value;
//         } else {
//           newData[section][index][field] = value;
//         }
//       } else {
//         newData[section] = value;
//       }
//       return newData;
//     });
//   };

//   const addItem = (section, defaultItem = {}) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: [...prev[section], defaultItem]
//     }));
//   };

//   const removeItem = (section, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: prev[section].filter((_, i) => i !== index)
//     }));
//   };

//   const addListItem = (section, index, listField) => {
//     setFormData(prev => {
//       const newData = { ...prev };
//       newData[section][index][listField].push('');
//       return newData;
//     });
//   };

//   const removeListItem = (section, index, listField, listIndex) => {
//     setFormData(prev => {
//       const newData = { ...prev };
//       newData[section][index][listField].splice(listIndex, 1);
//       return newData;
//     });
//   };

//   const handleListItemChange = (section, index, listField, listIndex, value) => {
//     setFormData(prev => {
//       const newData = { ...prev };
//       newData[section][index][listField][listIndex] = value;
//       return newData;
//     });
//   };

//   const downloadPDF = async () => {
//     try {
//       const element = resumeRef.current;
//       if (!element) return;

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff'
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4'
//       });

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

//       const centerX = (pdfWidth - imgWidth * ratio) / 2;
//       const centerY = 0;

//       pdf.addImage(
//         imgData, 
//         'PNG', 
//         0, 
//         0, 
//         imgWidth * ratio, 
//         imgHeight * ratio, 
//         '', 
//         'FAST'
//       );
//       pdf.save('resume.pdf');
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Failed to download PDF. Please try again.');
//     }

//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-[21cm] mx-auto">
//         {/* Form Section */}
//         <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
//           <h2 className="text-2xl font-bold mb-6">Resume Information</h2>
          
//           {/* Personal Information */}
//           <section className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={formData.personalInfo.name}
//                 onChange={(e) => handleInputChange('personalInfo', null, 'name', e.target.value)}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Professional Title"
//                 value={formData.personalInfo.title}
//                 onChange={(e) => handleInputChange('personalInfo', null, 'title', e.target.value)}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={formData.personalInfo.email}
//                 onChange={(e) => handleInputChange('personalInfo', null, 'email', e.target.value)}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone"
//                 value={formData.personalInfo.phone}
//                 onChange={(e) => handleInputChange('personalInfo', null, 'phone', e.target.value)}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Location"
//                 value={formData.personalInfo.location}
//                 onChange={(e) => handleInputChange('personalInfo', null, 'location', e.target.value)}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="LinkedIn URL"
//                 value={formData.personalInfo.linkedin}
//                 onChange={(e) => handleInputChange('personalInfo', null, 'linkedin', e.target.value)}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="GitHub URL"
//                 value={formData.personalInfo.github}
//                 onChange={(e) => handleInputChange('personalInfo', null, 'github', e.target.value)}
//                 className="border p-2 rounded"
//               />
//             </div>
//           </section>

//           {/* Professional Summary */}
//           <section className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
//             <textarea
//               placeholder="Write your professional summary..."
//               value={formData.summary}
//               onChange={(e) => handleInputChange('summary', null, null, e.target.value)}
//               className="border p-2 rounded w-full h-32"
//             />
//           </section>

//           {/* Skills */}
//           <section className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">Skills</h3>
//             {formData.skills.map((skill, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Skill"
//                   value={skill}
//                   onChange={(e) => handleInputChange('skills', index, null, e.target.value)}
//                   className="border p-2 rounded flex-1"
//                 />
//                 <button
//                   onClick={() => removeItem('skills', index)}
//                   className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               onClick={() => addItem('skills', '')}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add Skill
//             </button>
//           </section>

//           {/* Experience */}
//           <section className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">Experience</h3>
//             {formData.experience.map((exp, index) => (
//               <div key={index} className="border p-4 rounded mb-4">
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="text"
//                     placeholder="Job Title"
//                     value={exp.title}
//                     onChange={(e) => handleInputChange('experience', index, 'title', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Company"
//                     value={exp.company}
//                     onChange={(e) => handleInputChange('experience', index, 'company', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Start Date"
//                     value={exp.startDate}
//                     onChange={(e) => handleInputChange('experience', index, 'startDate', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="End Date"
//                     value={exp.endDate}
//                     onChange={(e) => handleInputChange('experience', index, 'endDate', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <textarea
//                     placeholder="Job Description"
//                     value={exp.description}
//                     onChange={(e) => handleInputChange('experience', index, 'description', e.target.value)}
//                     className="border p-2 rounded w-full h-24"
//                   />
//                 </div>
//                 {exp.points.map((point, pointIndex) => (
//                   <div key={pointIndex} className="flex gap-2 mb-2">
//                     <input
//                       type="text"
//                       placeholder="Achievement/Responsibility"
//                       value={point}
//                       onChange={(e) => handleListItemChange('experience', index, 'points', pointIndex, e.target.value)}
//                       className="border p-2 rounded flex-1"
//                     />
//                     <button
//                       onClick={() => removeListItem('experience', index, 'points', pointIndex)}
//                       className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//                 <div className="flex justify-between mt-4">
//                   <button
//                     onClick={() => addListItem('experience', index, 'points')}
//                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                   >
//                     Add Point
//                   </button>
//                   <button
//                     onClick={() => removeItem('experience', index)}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Remove Experience
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <button
//               onClick={() => addItem('experience', {
//                 title: '',
//                 company: '',
//                 startDate: '',
//                 endDate: '',
//                 description: '',
//                 points: ['']
//               })}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add Experience
//             </button>
//           </section>

//           {/* Projects */}
//           <section className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">Projects</h3>
//             {formData.projects.map((project, index) => (
//               <div key={index} className="border p-4 rounded mb-4">
//                 <input
//                   type="text"
//                   placeholder="Project Name"
//                   value={project.name}
//                   onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
//                   className="border p-2 rounded w-full mb-4"
//                 />
//                 <textarea
//                   placeholder="Project Description"
//                   value={project.description}
//                   onChange={(e) => handleInputChange('projects', index, 'description', e.target.value)}
//                   className="border p-2 rounded w-full h-24 mb-4"
//                 />
//                 {project.points.map((point, pointIndex) => (
//                   <div key={pointIndex} className="flex gap-2 mb-2">
//                     <input
//                       type="text"
//                       placeholder="Project Detail"
//                       value={point}
//                       onChange={(e) => handleListItemChange('projects', index, 'points', pointIndex, e.target.value)}
//                       className="border p-2 rounded flex-1"
//                     />
//                     <button
//                       onClick={() => removeListItem('projects', index, 'points', pointIndex)}
//                       className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//                 <div className="flex justify-between mt-4">
//                   <button
//                     onClick={() => addListItem('projects', index, 'points')}
//                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                   >
//                     Add Point
//                   </button>
//                   <button
//                     onClick={() => removeItem('projects', index)}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Remove Project
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <button
//               onClick={() => addItem('projects', { name: '', description: '', points: [''] })}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add Project
//             </button>
//           </section>

//           {/* Education */}
//           <section className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">Education</h3>
//             {formData.education.map((edu, index) => (
//               <div key={index} className="border p-4 rounded mb-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Degree"
//                     value={edu.degree}
//                     onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="School/University"
//                     value={edu.school}
//                     onChange={(e) => handleInputChange('education', index, 'school', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Start Date"
//                     value={edu.startDate}
//                     onChange={(e) => handleInputChange('education', index, 'startDate', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="End Date"
//                     value={edu.endDate}
//                     onChange={(e) => handleInputChange('education', index, 'endDate', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Score/CGPA"
//                     value={edu.score}
//                     onChange={(e) => handleInputChange('education', index, 'score', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                 </div>
//                 <button
//                   onClick={() => removeItem('education', index)}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
//                 >
//                   Remove Education
//                 </button>
//               </div>
//             ))}
//             <button
//               onClick={() => addItem('education', {
//                 degree: '',
//                 school: '',
//                 startDate: '',
//                 endDate: '',
//                 score: ''
//               })}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add Education
//             </button>
//           </section>

//           {/* Certifications */}
//           <section className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">Certifications</h3>
//             {formData.certifications.map((cert, index) => (
//               <div key={index} className="border p-4 rounded mb-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Certification Name"
//                     value={cert.name}
//                     onChange={(e) => handleInputChange('certifications', index, 'name', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Issuing Organization"
//                     value={cert.issuer}
//                     onChange={(e) => handleInputChange('certifications', index, 'issuer', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Date"
//                     value={cert.date}
//                     onChange={(e) => handleInputChange('certifications', index, 'date', e.target.value)}
//                     className="border p-2 rounded"
//                   />
//                 </div>
//                 <button
//                   onClick={() => removeItem('certifications', index)}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
//                 >
//                   Remove Certification
//                 </button>
//               </div>
//             ))}
//             <button
//               onClick={() => addItem('certifications', { name: '', issuer: '', date: '' })}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add Certification
//             </button>
//           </section>

//           {/* Languages */}
//           <section className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">Languages</h3>
//             {formData.languages.map((lang, index) => (
//               <div key={index} className="flex gap-4 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Language"
//                   value={lang.name}
//                   onChange={(e) => handleInputChange('languages', index, 'name', e.target.value)}
//                   className="border p-2 rounded flex-1"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Proficiency"
//                   value={lang.proficiency}
//                   onChange={(e) => handleInputChange('languages', index, 'proficiency', e.target.value)}
//                   className="border p-2 rounded flex-1"
//                 />
//                 <button
//                   onClick={() => removeItem('languages', index)}
//                   className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               onClick={() => addItem('languages', { name: '', proficiency: '' })}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add Language
//             </button>
//           </section>
//         </div>

//         {/* Preview Section */}
//         <div className="bg-white p-8 rounded-lg shadow-lg mb-8" ref={resumeRef}>
//           <div className="max-w-[21cm] mx-auto font-sans text-[12px] leading-normal">
//             {/* Header */}
//             <header className="mb-4 pb-4 border-b-2 border-blue-600">
//               <h1 className="text-3xl font-bold text-gray-800">{formData.personalInfo.name}</h1>
//               <h2 className="text-lg text-blue-600">{formData.personalInfo.title}</h2>
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {formData.personalInfo.phone && (
//                   <a href={`tel:${formData.personalInfo.phone}`} className="flex items-center text-gray-600 hover:text-blue-600">
//                     <Phone size={14} className="mr-2" />
//                     <span>{formData.personalInfo.phone}</span>
//                   </a>
//                 )}
//                 {formData.personalInfo.email && (
//                   <a href={`mailto:${formData.personalInfo.email}`} className="flex items-center text-gray-600 hover:text-blue-600">
//                     <Mail size={14} className="mr-2" />
//                     <span>{formData.personalInfo.email}</span>
//                   </a>
//                 )}
//                 {formData.personalInfo.linkedin && (
//                   <a href={formData.personalInfo.linkedin} className="flex items-center text-gray-600 hover:text-blue-600">
//                     <Linkedin size={14} className="mr-2" />
//                     <span>{formData.personalInfo.linkedin.split('/').pop()}</span>
//                   </a>
//                 )}
//                 {formData.personalInfo.github && (
//                   <a href={formData.personalInfo.github} className="flex items-center text-gray-600 hover:text-blue-600">
//                     <Github size={14} className="mr-2" />
//                     <span>{formData.personalInfo.github.split('/').pop()}</span>
//                   </a>
//                 )}
//                 {formData.personalInfo.location && (
//                   <span className="flex items-center text-gray-600">
//                     <MapPin size={14} className="mr-2" />
//                     <span>{formData.personalInfo.location}</span>
//                   </span>
//                 )}
//               </div>
//             </header>

//             <div className="grid grid-cols-2 gap-8">
//               <div>
//                 {/* Professional Summary */}
//                 {formData.summary && (
//                   <section className="mb-4">
//                     <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
//                       <Briefcase className="mr-2 text-blue-600" size={16} />
//                       PROFESSIONAL SUMMARY
//                     </h3>
//                     <p className="text-gray-600">{formData.summary}</p>
//                   </section>
//                 )}

//                 {/* Experience */}
//                 {formData.experience.length > 0 && formData.experience[0].title && (
//                   <section className="mb-4">
//                     <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
//                       <Briefcase className="mr-2 text-blue-600" size={16} />
//                       EXPERIENCE
//                     </h3>
//                     {formData.experience.map((exp, index) => (
//                       <div key={index} className="mb-4">
//                         <h4 className="font-semibold">{exp.title} - {exp.company}</h4>
//                         <p className="text-blue-600">{exp.startDate} - {exp.endDate}</p>
//                         <p className="text-gray-600 mb-2">{exp.description}</p>
//                         <ul className="list-disc pl-5 text-gray-600 space-y-1">
//                           {exp.points.map((point, pointIndex) => (
//                             point && <li key={pointIndex}>{point}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     ))}
//                   </section>
//                 )}

//                 {/* Projects */}
//                 {formData.projects.length > 0 && formData.projects[0].name && (
//                   <section className="mb-4">
//                     <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
//                       <FolderOpen className="mr-2 text-blue-600" size={16} />
//                       PROJECTS
//                     </h3>
//                     {formData.projects.map((project, index) => (
//                       <div key={index} className="mb-4">
//                         <h4 className="font-semibold">{project.name}</h4>
//                         <p className="text-gray-600 mb-2">{project.description}</p>
//                         <ul className="list-disc pl-5 text-gray-600 space-y-1">
//                           {project.points.map((point, pointIndex) => (
//                             point && <li key={pointIndex}>{point}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     ))}
//                   </section>
//                 )}
//               </div>

//               <div>
//                 {/* Skills */}
//                 {formData.skills.length > 0 && formData.skills[0] && (
//                   <section className="mb-8">
//                     <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
//                       <Award className="mr-2 text-blue-600" size={16} />
//                       SKILLS
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       {formData.skills.map((skill, index) => (
//                         skill && (
//                           <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">
//                             {skill}
//                           </span>
//                         )
//                       ))}
//                     </div>
//                   </section>
//                 )}

//                 {/* Education */}
//                 {formData.education.length > 0 && formData.education[0].degree && (
//                   <section className="mb-8">
//                     <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
//                       <GraduationCap className="mr-2 text-blue-600" size={16} />
//                       EDUCATION
//                     </h3>
//                     {formData.education.map((edu, index) => (
//                       <div key={index} className="mb-4">
//                         <h4 className="font-semibold">{edu.degree}</h4>
//                         <p className="text-blue-600">{edu.school}</p>
//                         <div className="flex justify-between">
//                           {edu.score && <p className="text-gray-600">CGPA: {edu.score}</p>}
//                           <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </section>
//                 )}

//                 {/* Certifications */}
//                 {formData.certifications.length > 0 && formData.certifications[0].name && (
//                   <section className="mb-8">
//                     <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
//                       <Award className="mr-2 text-blue-600" size={16} />
//                       CERTIFICATIONS
//                     </h3>
//                     <ul className="list-disc pl-5 text-gray-600 space-y-1">
//                       {formData.certifications.map((cert, index) => (
//                         <li key={index}>
//                           {cert.name} - {cert.issuer}, {cert.date}
//                         </li>
//                       ))}
//                     </ul>
//                   </section>
//                 )}

//                 {/* Languages */}
//                 {formData.languages.length > 0 && formData.languages[0].name && (
//                   <section>
//                     <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2 flex items-center">
//                       <Languages className="mr-2 text-blue-600" size={16} />
//                       LANGUAGES
//                     </h3>
//                     <ul className="text-gray-600 flex gap-4">
//                       {formData.languages.map((lang, index) => (
//                         <li key={index}>
//                           <span className="font-semibold">{lang.name}:</span> {lang.proficiency}
//                         </li>
//                       ))}
//                     </ul>
//                   </section>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={() => setIsSaveModalOpen(true)}
//             className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             <Save size={20} />
//             Save Resume
//           </button>
//           <button
//             onClick={downloadPDF}
//             className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             <Download size={20} />
//             Download PDF
//           </button>
//         </div>

//         {/* Save Modal */}
//         {isSaveModalOpen && (
//           <SaveResumeModal
//             isOpen={isSaveModalOpen}
//             onClose={() => setIsSaveModalOpen(false)}
//             onSave={handleSaveResume}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Template1;


import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, Mail, Linkedin, Github, MapPin, Briefcase, 
  GraduationCap, Award, FolderOpen, Languages, 
  Download, Save 
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveResume } from '../api';
import { isAuthenticated, getToken } from '../utils/auth';
import SaveResumeModal from './SaveResumeModal';

function Template1() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    skills: [''],
    experience: [{
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      points: ['']
    }],
    education: [{
      degree: '',
      school: '',
      startDate: '',
      endDate: '',
      score: ''
    }],
    projects: [{
      name: '',
      description: '',
      points: ['']
    }],
    certifications: [{
      name: '',
      issuer: '',
      date: ''
    }],
    languages: [{
      name: '',
      proficiency: ''
    }]
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSaveResume = async (resumeName) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Please login to save resume');
      }

      await saveResume({
        name: resumeName,
        data: formData
      }, token);

      setIsSaveModalOpen(false);
      clearForm();
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  const handleInputChange = (section, index, field, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (section === 'personalInfo') {
        newData.personalInfo[field] = value;
      } else if (section === 'skills') {
        const newSkills = [...prev.skills];
        newSkills[index] = value;
        newData.skills = newSkills;
      } else if (Array.isArray(newData[section])) {
        if (field.includes('.')) {
          const [mainField, subField] = field.split('.');
          newData[section][index][mainField][subField] = value;
        } else {
          newData[section][index][field] = value;
        }
      } else {
        newData[section] = value;
      }
      return newData;
    });
  };


  const addItem = (section, defaultItem = {}) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], defaultItem]
    }));
  };

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const addListItem = (section, index, listField) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][index][listField].push('');
      return newData;
    });
  };

  const removeListItem = (section, index, listField, listIndex) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][index][listField].splice(listIndex, 1);
      return newData;
    });
  };

  const handleListItemChange = (section, index, listField, listIndex, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][index][listField][listIndex] = value;
      return newData;
    });
  };

  const downloadPDF = async () => {
    try {
      const element = resumeRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-[21cm] mx-auto">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Resume Information</h2>
          
          {/* Personal Information */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.personalInfo.name}
                onChange={(e) => handleInputChange('personalInfo', null, 'name', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Professional Title"
                value={formData.personalInfo.title}
                onChange={(e) => handleInputChange('personalInfo', null, 'title', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', null, 'email', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', null, 'phone', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.personalInfo.location}
                onChange={(e) => handleInputChange('personalInfo', null, 'location', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={formData.personalInfo.linkedin}
                onChange={(e) => handleInputChange('personalInfo', null, 'linkedin', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="GitHub URL"
                value={formData.personalInfo.github}
                onChange={(e) => handleInputChange('personalInfo', null, 'github', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </section>

          {/* Professional Summary */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
            <textarea
              placeholder="Write your professional summary..."
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', null, null, e.target.value)}
              className="border p-2 rounded w-full h-32"
            />
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Skill"
                  value={skill}
                  onChange={(e) => handleInputChange('skills', index, null, e.target.value)}
                  className="border p-2 rounded flex-1"
                />
                <button
                  onClick={() => removeItem('skills', index)}
                  className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addItem('skills', '')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Skill
            </button>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="border p-4 rounded mb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => handleInputChange('experience', index, 'title', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleInputChange('experience', index, 'company', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleInputChange('experience', index, 'startDate', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleInputChange('experience', index, 'endDate', e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Job Description"
                    value={exp.description}
                    onChange={(e) => handleInputChange('experience', index, 'description', e.target.value)}
                    className="border p-2 rounded w-full h-24"
                  />
                </div>
                {exp.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Achievement/Responsibility"
                      value={point}
                      onChange={(e) => handleListItemChange('experience', index, 'points', pointIndex, e.target.value)}
                      className="border p-2 rounded flex-1"
                    />
                    <button
                      onClick={() => removeListItem('experience', index, 'points', pointIndex)}
                      className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => addListItem('experience', index, 'points')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add Point
                  </button>
                  <button
                    onClick={() => removeItem('experience', index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove Experience
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem('experience', {
                title: '',
                company: '',
                startDate: '',
                endDate: '',
                description: '',
                points: ['']
              })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Experience
            </button>
          </section>

          {/* Projects */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            {formData.projects.map((project, index) => (
              <div key={index} className="border p-4 rounded mb-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
                  className="border p-2 rounded w-full mb-4"
                />
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleInputChange('projects', index, 'description', e.target.value)}
                  className="border p-2 rounded w-full h-24 mb-4"
                />
                {project.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Project Detail"
                      value={point}
                      onChange={(e) => handleListItemChange('projects', index, 'points', pointIndex, e.target.value)}
                      className="border p-2 rounded flex-1"
                    />
                    <button
                      onClick={() => removeListItem('projects', index, 'points', pointIndex)}
                      className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => addListItem('projects', index, 'points')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add Point
                  </button>
                  <button
                    onClick={() => removeItem('projects', index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove Project
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem('projects', { name: '', description: '', points: [''] })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Project
            </button>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="border p-4 rounded mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) => handleInputChange('education', index, 'school', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) => handleInputChange('education', index, 'startDate', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) => handleInputChange('education', index, 'endDate', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Score/CGPA"
                    value={edu.score}
                    onChange={(e) => handleInputChange('education', index, 'score', e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
                <button
                  onClick={() => removeItem('education', index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              onClick={() => addItem('education', {
                degree: '',
                school: '',
                startDate: '',
                endDate: '',
                score: ''
              })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Education
            </button>
          </section>

          {/* Certifications */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="border p-4 rounded mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleInputChange('certifications', index, 'name', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Organization"
                    value={cert.issuer}
                    onChange={(e) => handleInputChange('certifications', index, 'issuer', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={cert.date}
                    onChange={(e) => handleInputChange('certifications', index, 'date', e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
                <button
                  onClick={() => removeItem('certifications', index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
                >
                  Remove Certification
                </button>
              </div>
            ))}
            <button
              onClick={() => addItem('certifications', { name: '', issuer: '', date: '' })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Certification
            </button>
          </section>

          {/* Languages */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Languages</h3>
            {formData.languages.map((lang, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Language"
                  value={lang.name}
                  onChange={(e) => handleInputChange('languages', index, 'name', e.target.value)}
                  className="border p-2 rounded flex-1"
                />
                <input
                  type="text"
                  placeholder="Proficiency"
                  value={lang.proficiency}
                  onChange={(e) => handleInputChange('languages', index, 'proficiency', e.target.value)}
                  className="border p-2 rounded flex-1"
                />
                <button
                  onClick={() => removeItem('languages', index)}
                  className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addItem('languages', { name: '', proficiency: '' })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Language
            </button>
          </section>
        </div>

      {/* Preview Section */}
      <div id="resume-preview" className="bg-white p-8 rounded-lg shadow-lg mb-8" ref={resumeRef}>
          <div className="max-w-[21cm] mx-auto font-sans">
            {/* Header */}
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">{formData.personalInfo.name}</h1>
              <h2 className="text-lg text-blue-600 mb-3">{formData.personalInfo.title}</h2>
              <div className="flex flex-wrap gap-4 text-sm">
                {formData.personalInfo.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone size={14} className="mr-1" />
                    <span>{formData.personalInfo.phone}</span>
                  </div>
                )}
                {formData.personalInfo.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail size={14} className="mr-1" />
                    <span>{formData.personalInfo.email}</span>
                  </div>
                )}
                {formData.personalInfo.linkedin && (
                  <div className="flex items-center text-gray-600">
                    <Linkedin size={14} className="mr-1" />
                    <span>{formData.personalInfo.linkedin}</span>
                  </div>
                )}
                {formData.personalInfo.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin size={14} className="mr-1" />
                    <span>{formData.personalInfo.location}</span>
                  </div>
                )}
              </div>
            </header>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                {/* Professional Summary */}
                {formData.summary && (
              <section className="mb-6">
                <div className="flex items-center">
                  <Briefcase className="mr-2 " size={16} />
                  <h3 className="text-base font-semibold relative -top-2">
                    PROFESSIONAL SUMMARY
                  </h3>
                </div>
                <p className="text-sm text-gray-700">{formData.summary}</p>
              </section>              
                )}

                {/* Experience */}
                {formData.experience.length > 0 && formData.experience[0].title && (
                  <section className="mb-6">
                   <div className="flex items-center">
                   <Briefcase className="mr-2" size={16} />
                    <h3 className="text-base font-semibold relative -top-2">
                      EXPERIENCE
                    </h3>
                   </div>
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="mb-3 text-sm">
                        <div className="font-medium">{exp.title}</div>
                        <div className="text-gray-600">{exp.company}</div>
                        <div className="text-gray-500 text-xs">{exp.startDate} - {exp.endDate}</div>
                        <ul className="list-disc ml-4 mt-1 text-gray-700">
                          {exp.points.map((point, pointIndex) => point && (
                            <li key={pointIndex}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>
                )}

                {/* Projects */}
                {formData.projects.length > 0 && formData.projects[0].name && (
                  <section className="mb-6">
                   <div className="flex items-center">
                      <FolderOpen className="mr-2" size={16} />
                      <h3 className="text-base font-semibold relative -top-2">
                      PROJECTS
                    </h3>
                   </div>
                    {formData.projects.map((project, index) => (
                      <div key={index} className="mb-3 text-sm">
                        <div className="font-medium">{project.name}</div>
                        <ul className="list-disc ml-4 mt-1 text-gray-700">
                          {project.points.map((point, pointIndex) => point && (
                            <li key={pointIndex}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>
                )}
              </div>

              <div>
                {/* Skills */}
                {formData.skills.length > 0 && formData.skills[0] && (
                  <section className="mb-6">
                    <div className="flex items-center">
                    <Award className="mr-2" size={16} />
                     <h3 className="text-base font-semibold relative -top-2">
                      SKILLS
                     </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => skill && (
                        <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {formData.education.length > 0 && formData.education[0].degree && (
                  <section className="mb-6">
                   <div className="flex items-center">
                    <GraduationCap className="mr-2" size={16} />
                    <h3 className="text-base font-semibold relative -top-2">
                      EDUCATION
                    </h3>
                   </div>
                    {formData.education.map((edu, index) => (
                      <div key={index} className="mb-3 text-sm">
                        <div className="font-medium">{edu.degree}</div>
                        <div className="text-gray-600">{edu.school}</div>
                        <div className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</div>
                        {edu.score && <div className="text-gray-600">CGPA: {edu.score}</div>}
                      </div>
                    ))}
                  </section>
                )}

                {/* Certifications */}
                {formData.certifications.length > 0 && formData.certifications[0].name && (
                  <section className="mb-6">
                  <div className="flex items-center">
                    <Award className="mr-2" size={16} />
                    <h3 className="text-base font-semibold relative -top-2">
                      CERTIFICATIONS
                    </h3>
                  </div>  
                    {formData.certifications.map((cert, index) => (
                      <div key={index} className="mb-2 text-sm">
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-gray-600">{cert.issuer} - {cert.date}</div>
                      </div>

                    ))}
                  </section>
                )}

                {/* Languages */}
                {formData.languages.length > 0 && formData.languages[0].name && (
                  <section>
                    <div className="flex items-center">
                      <Languages className="mr-2 text-blue-600" size={16} />
                    <h3 className="text-base font-semibold relative -top-2">
                      LANGUAGES
                    </h3>
                    </div>
                    {formData.languages.map((lang, index) => (
                      <div key={index} className="mb-1 text-sm">
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-gray-600"> - {lang.proficiency}</span>
                      </div>
                    ))}
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>  

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <Save size={20} />
            Save Resume
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-blue-500 text- white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>

        {/* Save Modal */}
        {isSaveModalOpen && (
          <SaveResumeModal
            isOpen={isSaveModalOpen}
            onClose={() => setIsSaveModalOpen(false)}
            onSave={handleSaveResume}
          />
        )}
      </div>
    </div>
  );
}

export default Template1;




