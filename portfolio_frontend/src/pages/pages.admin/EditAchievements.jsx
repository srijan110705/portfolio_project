import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

const EditAchievements = () => {
  // Use the environment variable for production
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ heading: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchAchievements();
  }, [API_URL]);

  const fetchAchievements = () => {
    // Dynamic URL
    axios.get(`${API_URL}/api/edit/view_achievement`, { withCredentials: true })
      .then((res) => {
        setAchievements(res.data.achievements);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching achievements:", err);
        showMessage('error', 'Failed to load achievements.');
        setIsLoading(false);
      });
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!imageFile) return showMessage('error', 'Please upload an image.');

    setIsAdding(true);
    const submitData = new FormData();
    submitData.append('heading', formData.heading);
    submitData.append('description', formData.description);
    submitData.append('image', imageFile);

    // Dynamic URL
    axios.post(`${API_URL}/api/edit/upload_achievement`, submitData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => {
      showMessage('success', 'Achievement added successfully!');
      setFormData({ heading: '', description: '' });
      setImageFile(null);
      setPreviewUrl('');
      setAchievements([res.data.achievement, ...achievements]);
      setIsAdding(false);
    })
    .catch((err) => {
      console.error("Error adding achievement:", err);
      showMessage('error', 'Failed to add achievement.');
      setIsAdding(false);
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;

    // Dynamic URL
    axios.delete(`${API_URL}/api/edit/delete_achievement/${id}`, {
      withCredentials: true
    })
    .then(() => {
      showMessage('success', 'Achievement deleted.');
      setAchievements(achievements.filter(ach => ach._id !== id && ach.id !== id));
    })
    .catch((err) => {
      console.error("Error deleting achievement:", err);
      showMessage('error', 'Failed to delete achievement.');
    });
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-500" size={40} /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {message.text && (
        <div className={`p-4 rounded-lg font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* FORM AND LIST UI REMAINS THE SAME as your original code */}
      {/* (I have left the rest of your JSX below as it was, unchanged) */}
      
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Add New Achievement</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Heading</label>
              <input type="text" value={formData.heading} onChange={(e) => setFormData({...formData, heading: e.target.value})} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Upload Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 cursor-pointer" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows="3" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500" />
          </div>
          <button type="submit" disabled={isAdding} className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 disabled:opacity-70">
            {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />} Add Achievement
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Manage Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div key={item._id || item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
              <img src={item.image} alt={item.heading} className="w-full h-40 object-contain bg-slate-100 p-2" />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 mb-1">{item.heading}</h3>
                <p className="text-sm text-slate-600 mb-4 flex-1 line-clamp-3">{item.description}</p>
                <button onClick={() => handleDelete(item._id || item.id)} className="flex items-center justify-center gap-2 w-full py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium text-sm">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditAchievements;