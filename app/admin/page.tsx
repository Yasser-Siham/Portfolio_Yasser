'use client';

import React, { useState, useEffect } from 'react';
import { UploadCloud, Trash2, Plus, Globe, Video, LayoutDashboard, Loader2, Home } from 'lucide-react';
import Link from 'next/link';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    type: 'offline', // 'online' أو 'offline'
    liveUrl: '',
    githubUrl: '',
    videoUrl: ''
  });

  // جلب المشاريع من فايربيز ملي كتحل لوحة التحكم
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // رفع الفيديو لـ Cloudinary
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('Upload en cours... ⏳');

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'demo'); // السمية ديال preset اللي درتي فـ Cloudinary

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/vgc6j5lt/video/upload`, {
        method: 'POST',
        body: data,
      });
      const uploadedFile = await res.json();
      setFormData({ ...formData, videoUrl: uploadedFile.secure_url });
      setUploadStatus('Vidéo prête ✅');
    } catch (error) {
      console.error(error);
      setUploadStatus('Erreur upload ❌');
    } finally {
      setUploading(false);
    }
  };

  // تسجيل المشروع فـ Firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Le titre et la description sont obligatoires !");
      return;
    }

    try {
      const newProject = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies.split(',').map(t => t.trim()),
        type: formData.type,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        videoUrl: formData.videoUrl,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'projects'), newProject);
      
      // تحديث الواجهة مباشرة بلا ما نحتاجو نديرو Actualiser
      setProjects([{ id: docRef.id, ...newProject }, ...projects]);
      
      setShowModal(false);
      setFormData({ title: '', description: '', technologies: '', type: 'offline', liveUrl: '', githubUrl: '', videoUrl: '' });
      setUploadStatus('');
    } catch (error) {
      console.error("Erreur lors de l'ajout: ", error);
      alert("Erreur lors de l'enregistrement !");
    }
  };

  // مسح المشروع من Firebase
  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression: ", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 rounded-xl">
              <LayoutDashboard className="text-cyan-400" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Tableau de Bord</h1>
              <p className="text-slate-400 text-sm">Portfolio de Yasser Siham</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl text-sm font-bold text-slate-300 transition-all flex items-center gap-2">
              <Home size={18} /> Voir le site
            </Link>
            <button 
              onClick={() => { setShowModal(true); setFormData({ ...formData, type: 'offline' }); }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-bold text-white transition-all flex items-center gap-2"
            >
              <Video size={18} /> Ajouter Démo (Vidéo)
            </button>
            <button 
              onClick={() => { setShowModal(true); setFormData({ ...formData, type: 'online' }); }}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-sm font-bold text-white transition-all flex items-center gap-2"
            >
              <Globe size={18} /> Ajouter Projet En Ligne
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm mb-2">Total Projets</p>
            <p className="text-4xl font-black text-white">{projects.length}</p>
          </div>
        </div>

        {/* Projects List */}
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          Gérer les projets
        </h2>
        
        {loading ? (
          <div className="text-center py-10 text-cyan-400 animate-pulse">Chargement des données depuis Firebase...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between relative group">
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
                <div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block ${
                    p.type === 'online' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {p.type === 'online' ? 'EN LIGNE' : 'HORS LIGNE'}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 pr-10">{p.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-3 mb-4">{p.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.technologies && p.technologies.map((t: string, i: number) => (
                      <span key={i} className="text-xs bg-slate-950 text-cyan-300 px-2 py-1 rounded-md font-mono border border-slate-800">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal d'ajout */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl w-full max-w-xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              {formData.type === 'online' ? 'Nouveau Projet En Ligne' : 'Nouvelle Démo Vidéo'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Titre du projet" required
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
              
              <textarea 
                placeholder="Description" required rows={4}
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:border-cyan-500 focus:outline-none resize-none"
              ></textarea>
              
              <input 
                type="text" placeholder="Technologies (ex: React, Python, Tailwind)" required
                value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:border-cyan-500 focus:outline-none"
              />

              {formData.type === 'offline' && (
                <div className="border border-dashed border-slate-700 rounded-xl p-4 text-center hover:border-purple-500 transition-colors bg-slate-950 relative overflow-hidden">
                  <input 
                    type="file" accept="video/*" onChange={handleFileUpload} disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-2">
                    {uploading ? <Loader2 className="animate-spin text-purple-400" size={24} /> : <UploadCloud className="text-purple-400" size={24} />}
                    <span className="text-sm text-slate-400 font-bold">
                      {uploadStatus || 'Sélectionner la vidéo démo (Cloudinary)'}
                    </span>
                  </div>
                </div>
              )}

              {formData.type === 'online' && (
                <input 
                  type="url" placeholder="Lien du site en direct (URL)" required
                  value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:border-cyan-500 focus:outline-none"
                />
              )}

              <input 
                type="url" placeholder="Lien GitHub (Optionnel)"
                value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:border-cyan-500 focus:outline-none"
              />

              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-slate-400 hover:text-white font-bold">
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={uploading || (formData.type === 'offline' && !formData.videoUrl)}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl disabled:opacity-50 transition-all"
                >
                  Enregistrer le projet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}