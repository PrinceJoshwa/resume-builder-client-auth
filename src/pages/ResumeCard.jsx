// import { Eye, Download, Trash2, Loader2 } from 'lucide-react';

// function ResumeCard({ resume, onView, onDownload, onDelete, isDownloading }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//       <div className="p-6 border-b">
//         <h2 className="text-xl font-semibold mb-4">{resume.name}</h2>
//         <div className="space-y-4">
//           <div>
//             <h3 className="font-medium text-gray-700">Personal Info</h3>
//             <p>{resume.data.personalInfo.name}</p>
//             <p className="text-gray-600">{resume.data.personalInfo.title}</p>
//           </div>
//           <div>
//             <h3 className="font-medium text-gray-700">Skills</h3>
//             <div className="flex flex-wrap gap-2">
//               {resume.data.skills.map((skill, index) => (
//                 skill && (
//                   <span
//                     key={index}
//                     className="bg-gray-100 px-2 py-1 rounded text-sm"
//                   >
//                     {skill}
//                   </span>
//                 )
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="p-4 bg-gray-50 rounded-b-lg flex justify-end gap-2">
//         <button
//           onClick={onView}
//           className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
//           title="View"
//         >
//           <Eye size={20} />
//         </button>
//         <button
//           onClick={onDownload}
//           disabled={isDownloading}
//           className="p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
//           title="Download PDF"
//         >
//           {isDownloading ? (
//             <Loader2 size={20} className="animate-spin" />
//           ) : (
//             <Download size={20} />
//           )}
//         </button>
//         <button
//           onClick={onDelete}
//           className="p-2 text-red-600 hover:text-red-700 transition-colors"
//           title="Delete"
//         >
//           <Trash2 size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ResumeCard;

import { Eye, Download, Trash2, Loader2 } from 'lucide-react';

function ResumeCard({ resume, onView, onDownload, onDelete, isDownloading }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div id={`resume-preview-${resume._id}`} className="p-6 border-b">
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
                skill && (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-b-lg flex justify-end gap-2">
        <button
          onClick={onView}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          title="View"
        >
          <Eye size={20} />
        </button>
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
          title="Download PDF"
        >
          {isDownloading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Download size={20} />
          )}
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:text-red-700 transition-colors"
          title="Delete"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default ResumeCard;