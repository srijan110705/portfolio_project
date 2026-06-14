import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Trophy } from 'lucide-react';

const Achievements = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/edit/view_achievement`)
      .then((res) => {
        setAchievements(res.data.achievements || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching achievements:", err);
        setError('Failed to load achievements from the server.');
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p>Loading achievements...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-red-500 p-4 text-center">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Trophy className="text-cyan-600" size={36} /> My Achievements
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">A showcase of my milestones, certifications, and awards.</p>
        </div>

        {achievements.length === 0 ? (
          <div className="text-center text-slate-500 bg-white p-10 rounded-2xl border border-slate-100">
            No achievements found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item, index) => (
              <div key={item._id || index} className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-slate-100 transition-all duration-300 overflow-hidden flex flex-col group">
                <div className="h-48 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img src={item.image} alt={item.heading} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{item.heading}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;