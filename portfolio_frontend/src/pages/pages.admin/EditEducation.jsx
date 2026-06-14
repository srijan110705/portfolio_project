import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Plus, Trash2, FileText, GraduationCap } from 'lucide-react';

const EditEducation = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [educationList, setEducationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    institute: '', degree: '', duration: '', score: '', content: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    fetchEducation();
  }, [API_URL]);

  const fetchEducation = () => {
    axios.get(`${API_URL}/api/edit/get_educationDetails`, { withCredentials: true })
      .then((res) => {
        const dataArray = Array.isArray(res.data) ? res.data : (res.data.studies || []);
        setEducationList(dataArray);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching education:", err);
        showMessage('error', 'Failed to load education history.');
        setIsLoading(false);
      });
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setSelectedFiles(Array.from(e.target.files));

  const handleAdd = (e) => {
    e.preventDefault();
    setIsAdding(true);

    const submitData = new FormData();
    Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
    selectedFiles.forEach((file) => submitData.append('proofs', file));

    axios.post(`${API_URL}/api/edit/add_edu`, submitData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => {
      showMessage('success', 'Education added successfully!');
      setFormData({ institute: '', degree: '', duration: '', score: '', content: '' });
      setSelectedFiles([]);
      const newItem = res.data.education || res.data;
      setEducationList([newItem, ...educationList]);
      setIsAdding(false);
    })
    .catch((err) => {
      console.error("Error adding education:", err);
      showMessage('error', 'Failed to add education.');
      setIsAdding(false);
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    axios.delete(`${API_URL}/api/edit/delete_education/${id}`, { withCredentials: true })
    .then(() => {
      showMessage('success', 'Education deleted.');
      setEducationList(educationList.filter(item => item._id !== id));
    })
    .catch((err) => {
      console.error("Error deleting education:", err);
      showMessage('error', 'Failed to delete education.');
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

      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-6"><GraduationCap className="text-cyan-600" size={24} /><h2 className="text-xl font-bold text-slate-900">Add Education</h2></div>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="institute" value={formData.institute} onChange={handleChange} required placeholder="Institute" className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
            <input type="text" name="degree" value={formData.degree} onChange={handleChange} required placeholder="Degree" className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} required placeholder="Duration" className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
            <input type="number" step="0.01" name="score" value={formData.score} onChange={handleChange} required placeholder="CGPA" className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
          </div>
          <textarea name="content" value={formData.content} onChange={handleChange} required rows="2" placeholder="Description" className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
          <input type="file" multiple onChange={handleFileChange} required className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-50 file:text-cyan-700 cursor-pointer" />
          <button type="submit" disabled={isAdding} className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 disabled:opacity-70">
            {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />} Add files
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Manage Education</h2>
        {educationList.length === 0 ? <p className="text-slate-500 text-center">No records found.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationList.map((item) => (
              <div key={item._id} className="bg-white border p-5 rounded-xl shadow-sm flex flex-col">
                <div className="flex justify-between mb-2">
                  <div><h3 className="font-bold">{item.institute}</h3><p className="text-cyan-700 text-sm">{item.degree}</p></div>
                  <span className="bg-slate-100 text-xs px-2 py-1 rounded">{item.duration}</span>
                </div>
                <p className="text-sm mb-4">Score: <b>{item.score}</b><br/>{item.content}</p>
                <button onClick={() => handleDelete(item._id)} className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"><Trash2 size={16} className="inline mr-2" />Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditEducation;