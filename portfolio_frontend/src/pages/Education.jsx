import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, GraduationCap, Calendar, Award, FileText } from 'lucide-react';

const Education = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/edit/get_educationDetails`)
      .then((res) => {
        setEducationList(res.data.studies || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching education:", err);
        setError('Failed to load education history.');
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500">
      <Loader2 className="animate-spin mb-4" size={40} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-red-500">{error}</div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <GraduationCap className="text-cyan-600" size={36} /> Education
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{item.institute}</h3>
              <p className="text-lg text-cyan-700 font-medium mb-4">{item.degree}</p>
              
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full"><Calendar size={16} />{item.duration}</span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full"><Award size={16} />Score: <b>{item.score}</b></span>
              </div>

              <p className="text-slate-600 mb-6 flex-1">{item.content}</p>

              {item.proofs?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3">Certificates</h4>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {item.proofs.map((proof, idx) => (
                      <a key={idx} href={proof} target="_blank" rel="noreferrer" className="flex flex-col items-center min-w-20 p-2 bg-slate-50 border rounded-lg hover:border-cyan-500 transition-all">
                        <FileText size={24} className="text-cyan-600 mb-1" />
                        <span className="text-[10px]">Doc {idx + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;