'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Video, ExternalLink, Code2, ShieldAlert } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase'; // كنجيبو قاعدة البيانات

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // هاد الدالة كتجبد المشاريع من Firebase ملي كتحل الصفحة
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-wider text-white">YASSER SIHAM</h1>
            <p className="text-xs text-cyan-400 font-mono">AI & Data Engineering Student</p>
          </div>
          <Link 
            href="/admin" 
            className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2"
          >
            <ShieldAlert size={16} className="text-cyan-400" />
            Admin Dashboard
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          Portfolio & Projets
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Building Intelligent & Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Web Solutions</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
          Bienvenue sur mon portfolio officiel. Découvrez mes réalisations en ingénierie des données, intelligence artificielle, et développement web full-stack.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center gap-3 mb-10 border-b border-slate-800 pb-4">
          <Code2 className="text-cyan-400" size={24} />
          <h3 className="text-2xl font-bold text-white">Galerie des Projets</h3>
        </div>

        {loading ? (
          <div className="text-center py-20 text-cyan-400 animate-pulse font-mono">Chargement des projets...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
            Aucun projet disponible pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <div key={p.id} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col shadow-xl hover:border-slate-700 transition-all">
                
                {p.videoUrl ? (
                  <div className="w-full bg-black aspect-video relative">
                    <video 
                      src={p.videoUrl} 
                      controls 
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                  </div>
                ) : (
                  <div className="w-full bg-slate-950 aspect-video flex flex-col items-center justify-center border-b border-slate-800 text-slate-600">
                    <Video size={40} className="mb-2 opacity-40" />
                    <span className="text-xs font-mono">Vidéo démo non disponible</span>
                  </div>
                )}

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        p.type === 'online' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {p.type === 'online' ? 'En Ligne' : 'Démo / Hors Ligne'}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2">{p.title}</h4>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">{p.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.technologies && p.technologies.map((t: string, i: number) => (
                        <span key={i} className="text-xs bg-slate-950 text-cyan-300 px-3 py-1 rounded-md font-mono border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                    {p.liveUrl && (
                      <a 
                        href={p.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <Globe size={16} /> Visiter le site <ExternalLink size={12} />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a 
                        href={p.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                      >
                        <Code2 size={16} /> Code Source <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 Yasser Siham. All rights reserved. Powered by Next.js, Firebase & Cloudinary.</p>
      </footer>
    </div>
  );
}