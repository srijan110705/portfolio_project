import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Plus, Trash2, Cpu, Layers } from 'lucide-react';

const EditSkills = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [skillsList, setSkillsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchSkills();
  }, [API_URL]);

  const fetchSkills = () => {
    axios.get(`${API_URL}/api/edit/get_skills`, { withCredentials: true })
      .then((res) => {
        setSkillsList(Array.isArray(res.data) ? res.data : (res.data.skills || []));
        setIsLoading(false);
      })
      .catch(() => { showMessage('error', 'Failed to load skills.'); setIsLoading(false); });
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setIsAdding(true);
    const skillsArray = formData.description.split(',').map(s => s.trim()).filter(s => s !== "");

    if (skillsArray.length === 0) {
      showMessage('error', 'Please enter at least one skill.');
      setIsAdding(false);
      return;
    }

    axios.post(`${API_URL}/api/edit/add_skill`, { title: formData.title, description: skillsArray }, { withCredentials: true })
      .then((res) => {
        showMessage('success', 'Skill added!');
        setFormData({ title: '', description: '' });
        setSkillsList([res.data.skill || res.data, ...skillsList]);
        setIsAdding(false);
      })
      .catch(() => { showMessage('error', 'Failed to add skill.'); setIsAdding(false); });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this skill category?")) return;
    axios.delete(`${API_URL}/api/edit/delete_skill/${id}`, { withCredentials: true })
      .then(() => {
        showMessage('success', 'Deleted.');
        setSkillsList(skillsList.filter(s => s._id !== id));
      })
      .catch(() => showMessage('error', 'Delete failed.'));
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-500" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {message.text && <div className={`p-4 rounded-lg font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{message.text}</div>}
      
      <div className="bg-white p-6 border rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Cpu className="text-cyan-600" />Add Skill Category</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input type="text" name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" placeholder="Category (e.g., Languages)" />
          <textarea name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows="3" className="w-full px-4 py-2 border rounded-lg" placeholder="Skills (comma separated)" />
          <button type="submit" disabled={isAdding} className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />} Add Category
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">Manage Skills</h2>
        {skillsList.length === 0 ? <p className="text-center p-6 border rounded-xl">No skills found.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsList.map((item) => (
              <div key={item._id} className="bg-white border p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Layers size={18} className="text-cyan-600" />{item.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(Array.isArray(item.description) ? item.description : []).map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-sm rounded-lg border">{s}</span>
                  ))}
                </div>
                <button onClick={() => handleDelete(item._id)} className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"><Trash2 size={16} className="inline mr-2" />Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditSkills;