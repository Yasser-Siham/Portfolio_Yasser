'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Video, ExternalLink, Code2, ShieldAlert, Cpu, Sparkles, Database, Layers, Filter } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase'; 

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState('all'); // State ديال الفلتر

  // تأثير حركة الإضاءة 3D مع السوري
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // جلب المشاريع من فايربيز
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // ترتيب المشاريع (الجديد هو الأول)
        projectsData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setProjects(projectsData);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // دالة الفلترة
  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  return (
    // ردينا الخلفية مايلة للݣري الغامق (slate-900)
    <div className="relative min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-hidden">
      
      {/* شبكة الخيال العلمي (Sci-Fi Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
      
      {/* ضوء السوري 3D */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-xl opacity-30 transition duration-300 z-0"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.15), transparent 80%)`
        }}
      />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-900/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-500 group-hover:rotate-12">
              <Cpu className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest text-white uppercase group-hover:text-cyan-400 transition-colors">Yasser Siham</h1>
              <p className="text-[10px] text-purple-400 font-mono tracking-widest uppercase">AI & Data Engineering</p>
            </div>
          </div>
          <Link 
            href="/admin" 
            className="group relative px-5 py-2.5 bg-white/5 border border-white/10 hover:border-cyan-400 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300 overflow-hidden flex items-center gap-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            <ShieldAlert size={16} className="text-cyan-400 group-hover:animate-bounce relative z-10" />
            <span className="relative z-10">System Admin</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 text-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-slate-800/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md hover:scale-105 transition-transform cursor-default">
          <Sparkles size={16} className="text-cyan-400" /> Interactive 3D Portfolio
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          Engineering the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Future of Web & AI
          </span>
        </h2>
      </section>

      {/* Projects Section */}
      <section className="relative max-w-7xl mx-auto px-6 pb-32 z-10">
        
        {/* نظام الفلترة (Séparation des projets) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Code2 className="text-cyan-400" size={28} />
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider drop-shadow-lg">Laboratoire des Projets</h3>
          </div>

          {/* بوطونات الفلتر */}
          <div className="flex bg-slate-800/50 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${filter === 'all' ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Filter size={16} /> Tous
            </button>
            <button 
              onClick={() => setFilter('online')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${filter === 'online' ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Globe size={16} /> Online
            </button>
            <button 
              onClick={() => setFilter('offline')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${filter === 'offline' ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Video size={16} /> Démos
            </button>
          </div>
        </div>

        {/* عرض المشاريع */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-t-4 border-cyan-400 animate-spin shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
              <div className="absolute inset-3 rounded-full border-r-4 border-purple-500 animate-spin direction-reverse"></div>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-mono border border-dashed border-white/10 rounded-3xl bg-slate-800/30 backdrop-blur-sm">
            Aucun projet trouvé pour cette catégorie.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredProjects.map((p) => (
              // تصميم البطاقة 3D
              <div key={p.id} className="group relative rounded-[2rem] bg-slate-800/40 border border-white/10 backdrop-blur-xl overflow-hidden hover:-translate-y-4 hover:scale-[1.02] hover:border-cyan-500/50 hover:shadow-[0_30px_60px_-15px_rgba(34,211,238,0.3)] transition-all duration-500 will-change-transform">
                
                {/* إضاءة داخلية 3D */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Video / Image Player */}
                {p.videoUrl ? (
                  <div className="w-full bg-black aspect-video relative border-b border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 pointer-events-none opacity-80"></div>
                    <video 
                      src={p.videoUrl} 
                      controls 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      preload="metadata"
                    />
                  </div>
                ) : (
                  // الصورة البديلة (Dashboard Placeholder) فاش كيكون الفراغ
                  <div className="w-full bg-slate-950 aspect-video relative border-b border-white/10 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                      alt="Dashboard Preview" 
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-90 transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 blur-[2px] group-hover:blur-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 pointer-events-none"></div>
                    
                    {/* Badge 3D في الوسط */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="px-6 py-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-500">
                        <span className="text-white font-mono text-sm font-bold flex items-center gap-2">
                          <Layers size={16} className="text-cyan-400" /> Aperçu du Dashboard
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* معلومات المشروع */}
                <div className="p-8 relative z-20">
                  <div className="flex justify-between items-center mb-5">
                    <span className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg ${
                      p.type === 'online' 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    }`}>
                      {p.type === 'online' ? '● System: Online' : '▶ System: Offline Demo'}
                    </span>
                  </div>

                  <h4 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors duration-300 drop-shadow-md">{p.title}</h4>
                  <p className="text-sm text-slate-400 mb-8 leading-relaxed font-light group-hover:text-slate-300 transition-colors">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.technologies && p.technologies.map((t: string, i: number) => (
                      <span key={i} className="text-[11px] bg-slate-950/50 text-cyan-100 px-4 py-2 rounded-xl font-mono border border-white/10 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all duration-300 shadow-inner">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* الروابط */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    {p.liveUrl && (
                      <a 
                        href={p.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex flex-1 justify-center items-center gap-2 py-3.5 bg-cyan-500 text-slate-950 hover:bg-cyan-400 rounded-xl text-sm font-black transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-1"
                      >
                        <Globe size={18} /> Lancer le Projet
                      </a>
                    )}
                    {p.githubUrl && (
                      <a 
                        href={p.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex flex-1 justify-center items-center gap-2 py-3.5 bg-slate-800 hover:bg-white hover:text-black border border-white/10 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <Code2 size={18} /> Code Source
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
      <footer className="relative border-t border-white/5 bg-slate-950 py-10 text-center text-xs text-slate-500 font-mono z-10">
        <p className="mb-2 font-bold text-slate-400">© 2026 Yasser Siham. All rights reserved.</p>
        <p className="text-[10px] text-slate-600 flex justify-center items-center gap-2">
          Engineered with Next.js <Sparkles size={10} className="text-cyan-500"/> Firebase <Sparkles size={10} className="text-purple-500"/> Advanced UI
        </p>
      </footer>
    </div>
  );
}