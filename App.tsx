
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { NetworkScene, SurveillanceScene } from './components/QuantumScene';
import { AdaptiveRateDiagram, StatelessArchitectureDiagram, CloudEconomicsChart } from './components/Diagrams';
import { ArrowDown, Menu, X, Shield, Activity, Cloud, Cpu, FileText } from 'lucide-react';

const AuthorCard = ({ name, role, org, delay }: { name: string, role: string, org: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-start p-6 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] hover:border-safe-blue/50" style={{ animationDelay: delay }}>
      <h3 className="font-display font-bold text-xl text-slate-900 mb-1">{name}</h3>
      <p className="text-sm text-safe-blue font-medium mb-3">{role}</p>
      <p className="text-xs text-slate-500 uppercase tracking-wide leading-relaxed">{org}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-safe-blue selection:text-white font-sans">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-safe-blue rounded-lg flex items-center justify-center text-white shadow-lg shadow-safe-blue/30">
                <Shield size={20} />
            </div>
            <div className="flex flex-col">
                <span className={`font-display font-bold text-xl tracking-tight leading-none transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                SAFE
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Framework</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#overview" onClick={scrollToSection('overview')} className="hover:text-safe-blue transition-colors cursor-pointer">OVERVIEW</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-safe-blue transition-colors cursor-pointer">METHODOLOGY</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-safe-blue transition-colors cursor-pointer">RESULTS</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-safe-blue transition-colors cursor-pointer">TEAM</a>
            <a 
              href="https://ieeexplore.ieee.org/document/11192291/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            >
              <FileText size={16} />
              <span>Read Paper</span>
            </a>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl font-display animate-fade-in">
            <a href="#overview" onClick={scrollToSection('overview')} className="hover:text-safe-blue transition-colors cursor-pointer">Overview</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-safe-blue transition-colors cursor-pointer">Methodology</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-safe-blue transition-colors cursor-pointer">Results</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-safe-blue transition-colors cursor-pointer">Research Team</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-50">
        <NetworkScene />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(248,250,252,0.1)_0%,rgba(248,250,252,0.8)_60%,rgba(248,250,252,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                <div className="w-2 h-2 rounded-full bg-safe-blue animate-pulse"></div>
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">IEEE Access 2025</span>
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-slate-900">
              Scalable & Agile <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-safe-blue to-indigo-600">Event Detection</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-10 border-l-4 border-safe-blue pl-6">
              A novel framework for processing real-time video streams that balances detection accuracy with cloud cost efficiency through adaptive monitoring and stateless architecture.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <a href="#methodology" onClick={scrollToSection('methodology')} className="px-8 py-3 bg-safe-blue text-white font-medium rounded-lg shadow-lg shadow-safe-blue/25 hover:bg-blue-600 transition-all hover:-translate-y-1">
                  Explore The Tech
               </a>
               <a href="#overview" onClick={scrollToSection('overview')} className="px-8 py-3 bg-white text-slate-700 border border-slate-200 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                  Learn More
               </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <ArrowDown className="text-slate-400" size={24} />
        </div>
      </header>

      <main>
        {/* Overview: The Problem */}
        <section id="overview" className="py-24 bg-white relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-block mb-4 text-xs font-bold tracking-widest text-safe-blue uppercase">The Challenge</div>
                    <h2 className="font-display font-bold text-4xl mb-6 text-slate-900">The Cost of Vigilance</h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        Real-time video analytics for critical events—like fires, accidents, or theft—is computationally expensive. Processing every single frame from thousands of cameras creates massive resource demands and high cloud costs.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        <strong>SAFE</strong> (Scalable and Agile Framework for Event detection) addresses this by asking: <span className="italic text-slate-800 font-medium">Do we really need to watch a quiet street with the same intensity as a burning building?</span>
                    </p>
                </div>
                <div className="relative h-80 rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
                    <SurveillanceScene />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex justify-between items-end">
                            <div className="text-white text-xs font-mono">
                                <div>CAM_FEED_01: ACTIVE</div>
                                <div>LATENCY: 12ms</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="px-2 py-1 bg-red-500/20 border border-red-500 text-red-400 text-[10px] font-bold rounded uppercase">Catastrophic</div>
                                <div className="px-2 py-1 bg-yellow-500/20 border border-yellow-500 text-yellow-400 text-[10px] font-bold rounded uppercase">Critical</div>
                                <div className="px-2 py-1 bg-green-500/20 border border-green-500 text-green-400 text-[10px] font-bold rounded uppercase">Moderate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Methodology: Adaptive Monitoring Rate */}
        <section id="methodology" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-4 shadow-sm">
                        <Activity size={14} className="text-safe-blue"/>
                        <span className="text-xs font-bold tracking-widest text-slate-600 uppercase">Core Innovation 1</span>
                     </div>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-slate-900">Adaptive Monitoring Rate (AMR)</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        SAFE dynamically adjusts the frame processing rate based on event criticality. It uses exponential growth to rapidly focus on catastrophes and exponential decay to save resources during calm periods.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-5 space-y-8">
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-safe-red"></span> Catastrophic Events
                            </h3>
                            <p className="text-slate-600 text-sm mb-4">
                                Fire, Explosion, Major Accidents.
                            </p>
                            <div className="bg-slate-100 p-4 rounded-lg font-mono text-xs text-slate-700 border-l-4 border-safe-red">
                                Interval(t) = I₀ * e^(λt) <br/>
                                <span className="text-slate-400 block mt-1">// Frequency increases rapidly (Interval decreases)</span>
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-safe-green"></span> Moderate Events
                            </h3>
                            <p className="text-slate-600 text-sm mb-4">
                                Normal Traffic, Small Flame.
                            </p>
                            <div className="bg-slate-100 p-4 rounded-lg font-mono text-xs text-slate-700 border-l-4 border-safe-green">
                                Interval(t) = I₀ * e^(γt) <br/>
                                <span className="text-slate-400 block mt-1">// Frequency decreases (Interval increases) to save cost</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-7">
                        <AdaptiveRateDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Methodology: Stateless Architecture */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
             <div className="absolute inset-0 z-0">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-safe-blue/20 rounded-full blur-[120px] mix-blend-screen"></div>
                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen"></div>
             </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <StatelessArchitectureDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full mb-6">
                            <Cloud size={14} className="text-safe-blue"/>
                            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">Core Innovation 2</span>
                        </div>
                        <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Stateless LSTM Architecture</h2>
                        <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                            Traditional stateful LSTMs bind a specific camera to a specific server process, making scaling difficult. 
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            SAFE employs a <strong>Stateless LSTM</strong> approach. The hidden states and cell states are not stored on the server. Instead, they are passed back to the client and re-sent with the next frame. This makes the inference service purely functional and infinitely scalable on Kubernetes.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-400">
                                <Cpu size={18} className="text-safe-blue" />
                                <span>Zero server-side memory overhead per client</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Activity size={18} className="text-safe-blue" />
                                <span>Supports thousands of concurrent streams</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Cloud size={18} className="text-safe-blue" />
                                <span>Seamless horizontal scaling with Kubernetes</span>
                            </li>
                        </ul>
                     </div>
                </div>
            </div>
        </section>

        {/* Results: Economics */}
        <section id="results" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-slate-900">Cloud Economics</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        By skipping redundant frames during low-risk periods, SAFE achieves massive reductions in cloud resource consumption without compromising the ability to detect sudden critical events.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-display font-bold text-2xl mb-6 text-slate-800">Resource Savings</h3>
                        <CloudEconomicsChart />
                        <p className="text-sm text-slate-500 mt-4 text-center">Comparison of vCPU-seconds usage for processing ~3,500 frames</p>
                     </div>

                     <div className="flex flex-col justify-center space-y-8">
                        <div className="p-6 bg-white border-l-4 border-safe-blue shadow-sm rounded-r-xl">
                            <div className="text-4xl font-bold text-slate-900 mb-1">76%</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">CPU Resources Saved</div>
                            <p className="text-slate-600 mt-2">Reduction in vCPU-seconds compared to fixed-rate processing for mixed event streams.</p>
                        </div>
                        <div className="p-6 bg-white border-l-4 border-indigo-500 shadow-sm rounded-r-xl">
                            <div className="text-4xl font-bold text-slate-900 mb-1">400+</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Concurrent Clients</div>
                            <p className="text-slate-600 mt-2">Successfully scaled on a single GPU instance before saturation.</p>
                        </div>
                        <div className="p-6 bg-white border-l-4 border-safe-green shadow-sm rounded-r-xl">
                            <div className="text-4xl font-bold text-slate-900 mb-1">&lt;1s</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">Detection Latency</div>
                            <p className="text-slate-600 mt-2">Maintained sub-second latency for critical events even under heavy load.</p>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Team */}
        <section id="team" className="py-24 bg-slate-50 border-t border-slate-200">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">THE AUTHORS</div>
                    <h2 className="font-display font-bold text-4xl mb-4 text-slate-900">Research Team</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Published in IEEE Access, Volume 13, 2025.</p>
                </div>
                
                <div className="flex flex-wrap gap-6 justify-center">
                    <AuthorCard 
                        name="Mukand Krishna" 
                        role="Research Assistant"
                        org="National University of Computer and Emerging Sciences, Pakistan"
                        delay="0s" 
                    />
                    <AuthorCard 
                        name="Jawwad Ahmed Shamsi" 
                        role="Professor & Dean"
                        org="National University of Computer and Emerging Sciences, Pakistan"
                        delay="0.1s" 
                    />
                    <AuthorCard 
                        name="Muhammad Burhan Khan" 
                        role="Senior Member, IEEE"
                        org="National University of Computer and Emerging Sciences, Pakistan"
                        delay="0.2s" 
                    />
                    <AuthorCard 
                        name="Narmeen Zakaria Bawany" 
                        role="Professor & Dean"
                        org="Jinnah University for Women, Pakistan"
                        delay="0.3s" 
                    />
                    <AuthorCard 
                        name="Hassan Jamil Syed" 
                        role="Senior Lecturer"
                        org="Asia Pacific University of Technology and Innovation, Malaysia"
                        delay="0.4s" 
                    />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <Shield size={24} className="text-white" />
                    <div className="text-white font-display font-bold text-2xl">SAFE Framework</div>
                </div>
                <p className="text-sm max-w-md">"SAFE—A Scalable and Agile Framework for Mixed Critical Event Detection"</p>
            </div>
            <div className="flex gap-6">
                <span className="text-xs uppercase tracking-widest hover:text-white cursor-pointer transition-colors">IEEE Access</span>
                <span className="text-xs uppercase tracking-widest hover:text-white cursor-pointer transition-colors">SysLab</span>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-slate-600 border-t border-slate-800 pt-8">
            © 2025 The Authors. Licensed under Creative Commons Attribution 4.0.
        </div>
      </footer>
    </div>
  );
};

export default App;
