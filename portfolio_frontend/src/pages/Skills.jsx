import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Cpu, Layers } from 'lucide-react';

const Skills = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch from dynamic API_URL
    axios.get(`${API_URL}/api/edit/get_skills`)
      .then((res) => {
        setSkills(Array.isArray(res.data) ? res.data : (res.data.skills || []));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setError('Failed to load skills.');
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
            <Cpu className="text-cyan-600" size={36} /> Technical Skills
          </h2>
          <p className="mt-4 text-slate-600">Tools, languages, and technologies I work with.</p>
        </div>

        {skills.length === 0 ? (
          <div className="text-center text-slate-500 bg-white p-10 rounded-2xl border border-slate-100">No skills found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-slate-50 text-cyan-600 rounded-lg"><Layers size={20} /></div>
                  <h3 className="text-xl font-bold text-slate-900">{skillGroup.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {Array.isArray(skillGroup.description) ? (
                    skillGroup.description.map((item, index) => (
                      <span key={index} className="px-3 py-1.5 bg-slate-50 border text-slate-700 text-sm font-medium rounded-lg">{item}</span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No skills listed.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;