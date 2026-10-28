'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Video, ExternalLink, Code2, ShieldAlert, Cpu, Sparkles, Database, Layers } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase'; 

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // تأثير حركة الإضاءة مع لاصوري
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // جلب المشاريع من قاعدة البيانات
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
    <div className="relative min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-hidden">
      
      {/* شبكة الخيال العلمي (Sci-Fi Grid Background) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      
      {/* ضوء كيتبع لاصوري */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-20 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.15), transparent 80%)`
        }}
      />

      {/* Navbar - Glassmorphism */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-500">
              <Cpu className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase">Yasser Siham</h1>
              <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">AI & Data Engineering</p>
            </div>
          </div>
          <Link 
            href="/admin" 
            className="group relative px-5 py-2.5 bg-white/5 border border-white/10 hover:border-cyan-500/50 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300 overflow-hidden flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
            <ShieldAlert size={16} className="text-cyan-400 group-hover:animate-pulse relative z-10" />
            <span className="relative z-10">System Admin</span>
          </Link>
        </div>
      </header>

      {/* Hero Section - 3D Elements */}
      <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 text-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -z-10 animate-pulse duration-1000"></div>

        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-md">
          <Sparkles size={14} className="text-cyan-400" /> V 2.0 - Futuristic Portfolio
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
          Engineering the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
            Future of Web & AI
          </span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg mb-12 leading-relaxed font-light">
          Plongez dans un univers où les données rencontrent l'intelligence artificielle. Découvrez mes projets en ingénierie des données et développement full-stack.
        </p>

        <div className="flex justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md hover:-translate-y-2 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer shadow-lg shadow-black/50">
              <Database size={24} className="text-cyan-400" />
            </div>
            <span className="text-xs font-mono text-slate-500 uppercase">Data</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md hover:-translate-y-2 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-lg shadow-black/50">
              <Cpu size={24} className="text-purple-400" />
            </div>
            <span className="text-xs font-mono text-slate-500 uppercase">AI Models</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-300 cursor-pointer shadow-lg shadow-black/50">
              <Layers size={24} className="text-blue-400" />
            </div>
            <span className="text-xs font-mono text-slate-500 uppercase">Full-Stack</span>
          </div>
        </div>
      </section>

      {/* Projects Gallery Section - 3D Cards */}
      <section className="relative max-w-7xl mx-auto px-6 pb-32 z-10">
        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-white/10">
            <Code2 className="text-cyan-400" size={24} />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-wider">Laboratoire des Projets</h3>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-t-2 border-cyan-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin direction-reverse"></div>
              <div className="absolute inset-4 rounded-full border-b-2 border-blue-500 animate-spin"></div>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-mono border border-dashed border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
            Système en attente de données...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((p) => (
              <div key={p.id} className="group relative rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl overflow-hidden hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.3)] transition-all duration-500">
                
                {/* تأثير الضوء الداخلي للبطاقة */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Video Player */}
                {p.videoUrl ? (
                  <div className="w-full bg-black/80 aspect-video relative border-b border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                    <video 
                      src={p.videoUrl} 
                      controls 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      preload="metadata"
                    />
                  </div>
                ) : (
                  <div className="w-full bg-slate-950/80 aspect-video flex flex-col items-center justify-center border-b border-white/10 text-slate-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,60,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-bg-pan"></div>
                    <Video size={48} className="mb-3 opacity-20" />
                    <span className="text-xs font-mono uppercase tracking-widest">Vidéo non disponible</span>
                  </div>
                )}

                <div className="p-8 relative z-20">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest backdrop-blur-md ${
                      p.type === 'online' 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                    }`}>
                      {p.type === 'online' ? 'System: Online' : 'System: Offline Demo'}
                    </span>
                  </div>

                  <h4 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors duration-300">{p.title}</h4>
                  <p className="text-sm text-slate-400 mb-8 leading-relaxed font-light">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.technologies && p.technologies.map((t: string, i: number) => (
                      <span key={i} className="text-[11px] bg-black/50 text-slate-300 px-3 py-1.5 rounded-lg font-mono border border-white/10 group-hover:border-cyan-500/30 transition-colors duration-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    {p.liveUrl && (
                      <a 
                        href={p.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex flex-1 justify-center items-center gap-2 py-3 bg-cyan-500/10 hover:bg-cyan-500 hover:text-black border border-cyan-500/30 rounded-xl text-xs font-bold text-cyan-400 transition-all duration-300"
                      >
                        <Globe size={16} /> Lancer <ExternalLink size={14} />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a 
                        href={p.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex flex-1 justify-center items-center gap-2 py-3 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-xl text-xs font-bold text-slate-300 transition-all duration-300"
                      >
                        <Code2 size={16} /> Source <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-xl py-10 text-center text-xs text-slate-500 font-mono z-10">
        <p className="mb-2">© 2026 Yasser Siham. All rights reserved.</p>
        <p className="text-[10px] text-slate-600">Engineered with Next.js, Firebase & Advanced UI/UX Mechanics</p>
      </footer>
    </div>
  );
}