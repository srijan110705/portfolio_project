import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Plus, Trash2, Shield, Calendar } from 'lucide-react';

const EditPosition = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', duration: '' });

  useEffect(() => {
    fetchPositions();
  }, [API_URL]);

  const fetchPositions = () => {
    axios.get(`${API_URL}/api/edit/get_positions`, { withCredentials: true })
      .then((res) => {
        setPositions(Array.isArray(res.data) ? res.data : (res.data.positions || []));
        setIsLoading(false);
      })
      .catch(() => { showMessage('error', 'Failed to load positions.'); setIsLoading(false); });
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setIsAdding(true);
    axios.post(`${API_URL}/api/edit/add_position`, formData, { withCredentials: true })
      .then((res) => {
        showMessage('success', 'Position added!');
        setFormData({ title: '', description: '', duration: '' });
        setPositions([res.data.position || res.data, ...positions]);
        setIsAdding(false);
      })
      .catch(() => { showMessage('error', 'Failed to add.'); setIsAdding(false); });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this position?")) return;
    axios.delete(`${API_URL}/api/edit/delete_position/${id}`, { withCredentials: true })
      .then(() => {
        showMessage('success', 'Deleted.');
        setPositions(positions.filter(p => p._id !== id));
      })
      .catch(() => showMessage('error', 'Delete failed.'));
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-slate-500" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {message.text && <div className={`p-4 rounded-lg font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{message.text}</div>}
      
      <div className="bg-white p-6 border rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Shield className="text-cyan-600" />Add Position</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" placeholder="Role" />
            <input type="text" name="duration" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" placeholder="Duration" />
          </div>
          <textarea name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows="2" className="w-full px-4 py-2 border rounded-lg" placeholder="Organization/Description" />
          <button type="submit" disabled={isAdding} className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />} Add Position
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">Manage Positions</h2>
        {positions.length === 0 ? <p className="text-center p-6 border rounded-xl">No positions found.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {positions.map((item) => (
              <div key={item._id} className="bg-white border p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-1 rounded inline-block my-2"><Calendar size={12} className="inline mr-1" />{item.duration}</span>
                <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                <button onClick={() => handleDelete(item._id)} className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"><Trash2 size={16} className="inline mr-2" />Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPosition;