import { X } from 'lucide-react';

function ResumePreview({ resume, onClose }) {
  if (!resume) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{resume.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6" id={`resume-${resume._id}`}>
          {/* Header */}
          <div className="mb-6 border-b-2 border-blue-600 pb-4">
            <h1 className="text-3xl font-bold text-blue-600">
              {resume.data.personalInfo.name}
            </h1>
            <h2 className="text-xl text-gray-600 mt-1">
              {resume.data.personalInfo.title}
            </h2>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
            {resume.data.personalInfo.email && (
              <div className="flex items-center">
                <span>{resume.data.personalInfo.email}</span>
              </div>
            )}
            {resume.data.personalInfo.phone && (
              <div className="flex items-center">
                <span>{resume.data.personalInfo.phone}</span>
              </div>
            )}
            {resume.data.personalInfo.location && (
              <div className="flex items-center">
                <span>{resume.data.personalInfo.location}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {resume.data.skills.length > 0 && resume.data.skills[0] && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.data.skills.map((skill, index) => (
                  skill && (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {skill}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {resume.data.experience.length > 0 && resume.data.experience[0].title && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Experience</h3>
              {resume.data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">{exp.title}</h4>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resume.data.education.length > 0 && resume.data.education[0].degree && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Education</h3>
              {resume.data.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {resume.data.certifications.length > 0 && resume.data.certifications[0].name && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Certifications</h3>
              {resume.data.certifications.map((cert, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;