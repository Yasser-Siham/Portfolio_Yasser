'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Globe, Video, FolderOpen, X, Trash2, Code2, Loader2, UploadCloud } from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = 'vgc6j5lt'; 
const CLOUDINARY_UPLOAD_PRESET = 'portfolio_preset'; 

export default function TableauDeBord() {
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'SHEMA AI (3D Web Visualization)',
      description: 'Plateforme 3D interactive convertissant des entrées 2D en modèles volumétriques.',
      technologies: ['Three.js', 'Python', 'WebGL'],
      type: 'offline',
      githubUrl: '',
      videoUrl: 'https://res.cloudinary.com/vgc6j5lt/video/upload/v1/demo/shema-ai-demo.mp4'
    }
  ]);

  const [formMode, setFormMode] = useState('none');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', technologies: '', liveUrl: '', videoUrl: '', githubUrl: ''
  });

  const handleOpenForm = (mode: string) => {
    setFormMode(mode);
    setFormData({ title: '', description: '', technologies: '', liveUrl: '', videoUrl: '', githubUrl: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`, {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, videoUrl: data.secure_url }));
      }
    } catch (error) {
      alert("Erreur lors de l'upload de la vidéo.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formMode === 'offline' && !formData.videoUrl) {
      alert("Veuillez attendre la fin de l'upload de la vidéo.");
      return;
    }
    const newProj = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      type: formMode,
      liveUrl: formData.liveUrl,
      videoUrl: formData.videoUrl,
      githubUrl: formData.githubUrl
    };
    setProjects([newProj, ...projects]);
    setFormMode('none');
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-10 flex items-center justify-between border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
            <LayoutDashboard size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Tableau de Bord</h1>
            <p className="text-xs text-cyan-400">Portfolio de Yasser Siham</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-sm text-slate-400 mb-1">Total Projets</p>
            <h2 className="text-4xl font-extrabold text-white">{projects.length}</h2>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={() => handleOpenForm('online')} className="p-6 bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-2xl flex flex-col items-center justify-center transition-all">
              <Globe className="text-cyan-400 mb-2" size={24} />
              <span className="font-bold text-white text-sm">Ajouter Projet En Ligne</span>
            </button>
            <button onClick={() => handleOpenForm('offline')} className="p-6 bg-slate-900 border border-slate-800 hover:border-purple-500 rounded-2xl flex flex-col items-center justify-center transition-all">
              <Video className="text-purple-400 mb-2" size={24} />
              <span className="font-bold text-white text-sm">Ajouter Démo (Hors Ligne)</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FolderOpen size={20} className="text-slate-400" /> Galerie
        </h2>

        {projects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
            <Code2 className="mx-auto text-slate-600 mb-3" size={48} />
            <p className="text-slate-400">Aucun projet pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-800 flex justify-between items-start">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase ${p.type === 'online' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
                    {p.type === 'online' ? 'En ligne' : 'Hors ligne'}
                  </span>
                  <button onClick={() => handleDelete(p.id)} className="text-slate-500 hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 flex-grow">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.technologies.map((t, i) => (
                      <span key={i} className="text-[11px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {formMode !== 'none' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white">Nouveau Projet</h3>
              <button onClick={() => setFormMode('none')} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" required placeholder="Titre" value={formData.title} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm" />
              <textarea name="description" required rows={3} placeholder="Description" value={formData.description} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm" />
              <input type="text" name="technologies" required placeholder="Techs (ex: React, Python)" value={formData.technologies} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm" />
              
              {formMode === 'online' && (
                <input type="url" name="liveUrl" required placeholder="Lien du site" value={formData.liveUrl} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm" />
              )}
              
              {formMode === 'offline' && (
                <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                    <UploadCloud size={18} className={formData.videoUrl ? "text-emerald-400" : "text-cyan-400"} />
                    <span className="font-medium">
                      {isUploading ? "Upload en cours... (patientez)" : formData.videoUrl ? "Vidéo prête ✅" : "Sélectionner la vidéo démo"}
                    </span>
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleFileUpload} 
                      disabled={isUploading}
                      className="hidden" 
                    />
                  </label>
                </div>
              )}

              <input type="url" name="githubUrl" placeholder="Lien GitHub (Optionnel)" value={formData.githubUrl} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-sm" />
              
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setFormMode('none')} className="px-4 py-2 text-sm text-slate-400">Annuler</button>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className={`px-5 py-2 font-bold text-sm rounded-xl ${isUploading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-cyan-500 text-slate-950'}`}
                >
                  {isUploading ? <Loader2 size={18} className="animate-spin inline mr-2" /> : ''}
                  {isUploading ? 'Upload...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}