// 'use client'

// import React, { useState } from 'react'
// import { Phone, Mail, MapPin, Download, Save } from 'lucide-react'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
// import SaveResumeModal from './SaveResumeModal'

// export default function Template1() {
//   const [formData, setFormData] = useState({
//     personalInfo: { name: '', title: '', email: '', phone: '', location: '' },
//     skills: [''],
//     experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
//     education: [{ degree: '', school: '', startDate: '', endDate: '' }],
//     certifications: [{ name: '', issuer: '', date: '' }]
//   })

//   const handleChange = (section, field, value, index = null) => {
//     setFormData(prev => {
//       const newData = { ...prev }
//       if (section === 'skills') {
//         newData.skills = [...prev.skills]
//         newData.skills[index] = value
//       } else if (index !== null && Array.isArray(newData[section])) {
//         newData[section] = [...newData[section]]
//         newData[section][index] = { ...newData[section][index], [field]: value }
//       } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
//         newData[section] = { ...newData[section], [field]: value }
//       } else {
//         newData[section] = value
//       }
//       return newData
//     })
//   }

//   const addItem = (section) => {
//     setFormData(prev => {
//       const newData = { ...prev }
//       if (section === 'skills') {
//         newData.skills = [...prev.skills, '']
//       } else {
//         const emptyItem = section === 'experience' 
//           ? { title: '', company: '', startDate: '', endDate: '', description: '' }
//           : section === 'education'
//           ? { degree: '', school: '', startDate: '', endDate: '' }
//           : { name: '', issuer: '', date: '' }
//         newData[section] = [...prev[section], emptyItem]
//       }
//       return newData
//     })
//   }

//   const removeItem = (section, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: prev[section].filter((_, i) => i !== index)
//     }))
//   }

//   const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
//   const saveResume = async (resumeName) => {
//     try {
//       const response = await fetch('/api/resumes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: resumeName, data: formData }),
//       });

//       if (response.ok) {
//         console.log('Resume saved successfully');
//         // You can add a success notification here
//       } else {
//         console.error('Failed to save resume');
//         // You can add an error notification here
//       }
//     } catch (error) {
//       console.error('Error saving resume:', error);
//       // You can add an error notification here
//     }
//   };

//   const downloadPDF = async () => {
//     const element = document.getElementById('resume-preview')
//     if (!element) return

//     try {
//       const canvas = await html2canvas(element, { scale: 2 })
//       const imgData = canvas.toDataURL('image/png')
//       const pdf = new jsPDF('p', 'mm', 'a4')
//       const pdfWidth = pdf.internal.pageSize.getWidth()
//       const pdfHeight = pdf.internal.pageSize.getHeight()
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//       pdf.save('resume.pdf')
//     } catch (error) {
//       console.error('Error generating PDF:', error)
//     }
//   }

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto">
//       <div className="flex-1 space-y-6">
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

//       <div className="flex-1">
//         <div className="sticky top-8">
//           <div className="bg-white shadow-lg rounded-lg p-8" id="resume-preview">
//             <div className="mb-6 border-b-2 border-blue-600 pb-4">
//               <h1 className="text-3xl font-bold text-blue-600">
//                 {formData.personalInfo.name || 'Your Name'}
//               </h1>
//               <h2 className="text-xl text-gray-600 mt-1">
//                 {formData.personalInfo.title || 'Professional Title'}
//               </h2>
//             </div>

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

//             {formData.skills.length > 0 && formData.skills[0] && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Skills</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.skills.map((skill, index) => (
//                     <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {formData.experience.length > 0 && formData.experience[0].title && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Experience</h3>
//                 {formData.experience.map((exp, index) => (
//                   <div key={index} className="mb-4">
//                     <h4 className="font-semibold">{exp.title}</h4>
//                     <p className="text-gray-600">{exp.company}</p>
//                     <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
//                     <p className="text-sm mt-1">{exp.description}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {formData.education.length > 0 && formData.education[0].degree && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Education</h3>
//                 {formData.education.map((edu, index) => (
//                   <div key={index} className="mb-2">
//                     <h4 className="font-semibold">{edu.degree}</h4>
//                     <p className="text-gray-600">{edu.school}</p>
//                     <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

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

//           <div className="mt-8 flex justify-center space-x-4">

//           <button
//             onClick={() => setIsSaveModalOpen(true)}
//             className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 flex items-center gap-2">
//             <Save className="h-5 w-5" />
//              Save Resume
//           </button>

//             <button
//               onClick={downloadPDF}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2"
//             >
//               <Download className="h-5 w-5" />
//               Download PDF
//             </button>
//           </div>
//         <SaveResumeModal
//         isOpen={isSaveModalOpen}
//         onClose={() => setIsSaveModalOpen(false)}
//         onSave={saveResume}/>
//         </div>
//       </div>
//     </div>
//   )
// }

//23-11-2024
// 'use client'

// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { Phone, Mail, MapPin, Download, Save } from 'lucide-react'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
// import SaveResumeModal from './SaveResumeModal'
// import { saveResume } from '../api'
// import { isAuthenticated, getToken } from '../utils/auth'

// export default function Template1() {
//   const navigate = useNavigate();
//   const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     personalInfo: { name: '', title: '', email: '', phone: '', location: '' },
//     skills: [''],
//     experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
//     education: [{ degree: '', school: '', startDate: '', endDate: '' }],
//     certifications: [{ name: '', issuer: '', date: '' }]
//   })

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleChange = (section, field, value, index = null) => {
//     setFormData(prev => {
//       const newData = { ...prev }
//       if (section === 'skills') {
//         newData.skills = [...prev.skills]
//         newData.skills[index] = value
//       } else if (index !== null && Array.isArray(newData[section])) {
//         newData[section] = [...newData[section]]
//         newData[section][index] = { ...newData[section][index], [field]: value }
//       } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
//         newData[section] = { ...newData[section], [field]: value }
//       } else {
//         newData[section] = value
//       }
//       return newData
//     })
//   }

//   const addItem = (section) => {
//     setFormData(prev => {
//       const newData = { ...prev }
//       if (section === 'skills') {
//         newData.skills = [...prev.skills, '']
//       } else {
//         const emptyItem = section === 'experience' 
//           ? { title: '', company: '', startDate: '', endDate: '', description: '' }
//           : section === 'education'
//           ? { degree: '', school: '', startDate: '', endDate: '' }
//           : { name: '', issuer: '', date: '' }
//         newData[section] = [...prev[section], emptyItem]
//       }
//       return newData
//     })
//   }

//   const removeItem = (section, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: prev[section].filter((_, i) => i !== index)
//     }))
//   }

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
//     } catch (error) {
//       console.error('Error saving resume:', error);
//     }
//   };

//   const downloadPDF = async () => {
//     const element = document.getElementById('resume-preview')
//     if (!element) return

//     try {
//       const canvas = await html2canvas(element, { scale: 2 })
//       const imgData = canvas.toDataURL('image/png')
//       const pdf = new jsPDF('p', 'mm', 'a4')
//       const pdfWidth = pdf.internal.pageSize.getWidth()
//       const pdfHeight = pdf.internal.pageSize.getHeight()
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//       pdf.save('resume.pdf')
//     } catch (error) {
//       console.error('Error generating PDF:', error)
//     }
//   }

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto">
//       <div className="flex-1 space-y-6">
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

//       <div className="flex-1">
//         <div className="sticky top-8">
//           <div className="bg-white shadow-lg rounded-lg p-8" id="resume-preview">
//             <div className="mb-6 border-b-2 border-blue-600 pb-4">
//               <h1 className="text-3xl font-bold text-blue-600">
//                 {formData.personalInfo.name || 'Your Name'}
//               </h1>
//               <h2 className="text-xl text-gray-600 mt-1">
//                 {formData.personalInfo.title || 'Professional Title'}
//               </h2>
//             </div>

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

//             {formData.skills.length > 0 && formData.skills[0] && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Skills</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.skills.map((skill, index) => (
//                     <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {formData.experience.length > 0 && formData.experience[0].title && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Experience</h3>
//                 {formData.experience.map((exp, index) => (
//                   <div key={index} className="mb-4">
//                     <h4 className="font-semibold">{exp.title}</h4>
//                     <p className="text-gray-600">{exp.company}</p>
//                     <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
//                     <p className="text-sm mt-1">{exp.description}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {formData.education.length > 0 && formData.education[0].degree && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-blue-600">Education</h3>
//                 {formData.education.map((edu, index) => (
//                   <div key={index} className="mb-2">
//                     <h4 className="font-semibold">{edu.degree}</h4>
//                     <p className="text-gray-600">{edu.school}</p>
//                     <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

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

//           <div className="mt-8 flex justify-center space-x-4">

//           <button
//             onClick={() => setIsSaveModalOpen(true)}
//             className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 flex items-center gap-2">
//             <Save className="h-5 w-5" />
//              Save Resume
//           </button>

//             <button
//               onClick={downloadPDF}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2"
//             >
//               <Download className="h-5 w-5" />
//               Download PDF
//             </button>
//           </div>
//         <SaveResumeModal
//         isOpen={isSaveModalOpen}
//         onClose={() => setIsSaveModalOpen(false)}
//         onSave={handleSaveResume}/>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Download, Save } from 'lucide-react';
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
    personalInfo: { name: '', title: '', email: '', phone: '', location: '' },
    skills: [''],
    experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', school: '', startDate: '', endDate: '' }],
    certifications: [{ name: '', issuer: '', date: '' }]
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

      navigate('/myresume');
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  const handleInputChange = (section, index, field, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (section === 'personalInfo') {
        newData.personalInfo[field] = value;
      } else {
        newData[section][index][field] = value;
      }
      return newData;
    });
  };

  const handleSkillChange = (index, value) => {
    setFormData(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = value;
      return { ...prev, skills: newSkills };
    });
  };

  const addItem = (section) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (section === 'skills') {
        newData.skills.push('');
      } else {
        const emptyItem = {
          experience: { title: '', company: '', startDate: '', endDate: '', description: '' },
          education: { degree: '', school: '', startDate: '', endDate: '' },
          certifications: { name: '', issuer: '', date: '' }
        }[section];
        newData[section].push(emptyItem);
      }
      return newData;
    });
  };

  const removeItem = (section, index) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section].splice(index, 1);
      return newData;
    });
  };

  const downloadPDF = async () => {
    try {
      const element = resumeRef.current;
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
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg" ref={resumeRef}>
        <div className="p-8" id="resume-content">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
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
                className="border p-2 rounded col-span-2"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Skill"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="border p-2 rounded flex-1"
                />
                {formData.skills.length > 1 && (
                  <button
                    onClick={() => removeItem('skills', index)}
                    className="bg-red-500 text-white px-4 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addItem('skills')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Skill
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <Save size={20} />
            Save Resume
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </div>

      <SaveResumeModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveResume}
      />
    </div>
  );
}

export default Template1;