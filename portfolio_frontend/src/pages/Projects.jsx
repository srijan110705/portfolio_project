import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, FolderCode, ExternalLink, Code2 } from 'lucide-react';

const Projects = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch from dynamic API_URL
    axios.get(`${API_URL}/api/edit/view_projects`)
      .then((res) => {
        setProjects(res.data.projects || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError('Failed to load projects.');
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500">
      <Loader2 className="animate-spin mb-4" size={40} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-red-500 p-4 text-center">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <FolderCode className="text-cyan-600" size={36} /> My Projects
          </h2>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-slate-500 bg-white p-10 rounded-2xl border border-slate-100">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-slate-50 text-slate-600 rounded-xl group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors">
                    <Code2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{project.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed flex-1 mb-6">{project.description}</p>
                {project.link && (
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-800">
                      View Source / Demo <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;