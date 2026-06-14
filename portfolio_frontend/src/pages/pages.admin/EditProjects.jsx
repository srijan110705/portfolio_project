import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Plus, Trash2, FolderCode, Link as LinkIcon } from 'lucide-react';

const EditProjects = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', link: '' });

  useEffect(() => {
    fetchProjects();
  }, [API_URL]);

  const fetchProjects = () => {
    axios.get(`${API_URL}/api/edit/view_projects`, { withCredentials: true })
      .then((res) => {
        setProjects(Array.isArray(res.data) ? res.data : (res.data.projects || []));
        setIsLoading(false);
      })
      .catch(() => { showMessage('error', 'Failed to load projects.'); setIsLoading(false); });
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setIsAdding(true);
    axios.post(`${API_URL}/api/edit/add_project`, formData, { withCredentials: true })
      .then((res) => {
        showMessage('success', 'Project added!');
        setFormData({ title: '', description: '', link: '' });
        setProjects([res.data.project || res.data, ...projects]);
        setIsAdding(false);
      })
      .catch(() => { showMessage('error', 'Failed to add project.'); setIsAdding(false); });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this project?")) return;
    axios.delete(`${API_URL}/api/edit/delete_project/${id}`, { withCredentials: true })
      .then(() => {
        showMessage('success', 'Project deleted.');
        setProjects(projects.filter(p => p._id !== id));
      })
      .catch(() => showMessage('error', 'Failed to delete project.'));
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-500" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {message.text && <div className={`p-4 rounded-lg font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{message.text}</div>}
      
      <div className="bg-white p-6 border rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><FolderCode className="text-cyan-600" />Add Project</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" placeholder="Project Title" />
            <input type="text" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" placeholder="Link (GitHub/Live)" />
          </div>
          <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows="3" className="w-full px-4 py-2 border rounded-lg" placeholder="Description..." />
          <button type="submit" disabled={isAdding} className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />} Add Project
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">Manage Projects</h2>
        {projects.length === 0 ? <p className="text-center p-6 border rounded-xl">No projects found.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((item) => (
              <div key={item._id} className="bg-white border p-5 rounded-xl shadow-sm flex flex-col">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-1">{item.description}</p>
                {item.link && (
                  <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-sm text-cyan-600 bg-cyan-50 p-2 rounded-lg mb-4 truncate">
                    <LinkIcon size={14} className="inline mr-2" />{item.link}
                  </a>
                )}
                <button onClick={() => handleDelete(item._id)} className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"><Trash2 size={16} className="inline mr-2" />Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProjects;