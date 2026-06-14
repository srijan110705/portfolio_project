import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Save, Type, FileText, Upload, Image as ImageIcon } from 'lucide-react';

const EditAbout = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    email: '',
    github: '',
    mobile: '',
    linkedin: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    axios.get(`${API_URL}/api/edit/get_HomePage`, { withCredentials: true })
    .then((res) => {
      // Adjusted to handle if res.data is an array or object
      const data = Array.isArray(res.data) ? res.data[0] : res.data;
      if (data) {
        setFormData({
          title: data.title || '',
          content: data.content || '',
          email: data.email || '',
          github: data.github || '',
          mobile: data.mobile || '',
          linkedin: data.linkedin || ''
        });
        setPreviewUrl(data.image || '');
      }
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      setMessage({ type: 'error', text: 'Failed to load existing data.' });
      setIsLoading(false);
    });
  }, [API_URL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    const submitData = new FormData();
    // Appending all fields
    Object.keys(formData).forEach((key) => submitData.append(key, formData[key]));
    
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    axios.post(`${API_URL}/api/edit/edit_homepage`, submitData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(() => {
      setMessage({ type: 'success', text: 'Home page updated successfully!' });
      setIsSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      setMessage({ type: 'error', text: 'Failed to save changes.' });
      setIsSaving(false);
    });
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-500" size={40} /></div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8"><h2 className="text-2xl font-bold text-slate-900">Edit Home Page</h2></div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Title" className="w-full px-4 py-2.5 bg-slate-50 border rounded-lg" />
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile No" className="w-full px-4 py-2.5 bg-slate-50 border rounded-lg" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2.5 bg-slate-50 border rounded-lg" />
          <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub URL" className="w-full px-4 py-2.5 bg-slate-50 border rounded-lg" />
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="md:col-span-2 w-full px-4 py-2.5 bg-slate-50 border rounded-lg" />
        </div>

        <div>
          <textarea name="content" value={formData.content} onChange={handleChange} required rows="4" placeholder="Content" className="w-full px-4 py-2.5 bg-slate-50 border rounded-lg" />
        </div>

        {/* ... Image Upload Section remains unchanged ... */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2"><Upload size={16} /> Upload Image</label>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-lg border-2 border-dashed bg-slate-50 flex items-center justify-center overflow-hidden">
              {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-400" size={32} />}
            </div>
            <div className="flex-1">
              <input 
                type="file" 
                id="imageUpload"
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
              <label 
                htmlFor="imageUpload" 
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
              >
                Choose File
              </label>
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700">
          {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Save Page
        </button>
      </form>
    </div>
  );
};

export default EditAbout;