
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Server, Smartphone, Zap, Clock, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// --- ADAPTIVE MONITORING RATE DIAGRAM ---
export const AdaptiveRateDiagram: React.FC = () => {
  const [severity, setSeverity] = useState<'moderate' | 'critical' | 'catastrophic'>('moderate');
  const [time, setTime] = useState(0);
  const [dataPoints, setDataPoints] = useState<{time: number, interval: number}[]>([]);
  const intervalRef = useRef<number>(1.5); // Start at 1.5s
  
  // Simulation constants
  const LAMBDA = -0.0953; // Decay for Catastrophic (Frequency up, Interval down)
  const GAMMA = 0.0953;   // Growth for Moderate (Frequency down, Interval up)
  const MIN_INTERVAL = 0.5;
  const MAX_INTERVAL = 2.5;

  useEffect(() => {
    const ticker = setInterval(() => {
        setTime(prev => prev + 1);
        
        // Calculate new interval based on current severity
        let newInterval = intervalRef.current;
        
        if (severity === 'catastrophic') {
            // Eq 1: I(t) = I0 * e^(lambda * t)
            // Here we simulate the step change
            newInterval = Math.max(MIN_INTERVAL, newInterval * Math.exp(LAMBDA));
        } else if (severity === 'critical') {
             // Similar logic, maybe slightly less aggressive or different bounds in paper, 
             // but for visual we treat it as high urgency too
             newInterval = Math.max(1.0, newInterval * Math.exp(LAMBDA));
        } else {
            // Eq 2: Moderate -> Increase interval to save cost
            newInterval = Math.min(MAX_INTERVAL, newInterval * Math.exp(GAMMA));
        }
        
        intervalRef.current = newInterval;

        setDataPoints(prev => {
            const next = [...prev, { time: time, interval: newInterval }];
            if (next.length > 30) next.shift(); // Keep window size
            return next;
        });

    }, 500); // Visual update tick (faster than real seconds for demo)

    return () => clearInterval(ticker);
  }, [severity, time]);

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-800">Live Simulator: AMR</h3>
            <p className="text-xs text-slate-500">Inject events to see monitoring rate adapt.</p>
          </div>
          <div className="flex gap-2">
              <button 
                onClick={() => setSeverity('moderate')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${severity === 'moderate' ? 'bg-safe-green text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600'}`}
              >
                  Moderate
              </button>
              <button 
                onClick={() => setSeverity('catastrophic')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${severity === 'catastrophic' ? 'bg-safe-red text-white shadow-md animate-pulse' : 'bg-white border border-slate-200 text-slate-600'}`}
              >
                  Catastrophic
              </button>
          </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 h-64">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataPoints}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={[0, 3]} label={{ value: 'Interval (s)', angle: -90, position: 'insideLeft', style: {fontSize: 12, fill: '#64748b'} }} tick={{fontSize: 10}} />
                    <Tooltip contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0'}} itemStyle={{fontSize: '12px'}} labelStyle={{display:'none'}} />
                    <Line 
                        type="monotone" 
                        dataKey="interval" 
                        stroke={severity === 'catastrophic' ? '#DC2626' : '#10B981'} 
                        strokeWidth={3} 
                        dot={false}
                        animationDuration={300}
                    />
                </LineChart>
             </ResponsiveContainer>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 bg-slate-50 rounded-lg p-4 border border-slate-100">
             <div className="text-center">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Current Status</div>
                 <div className={`text-xl font-bold ${severity === 'catastrophic' ? 'text-safe-red' : 'text-safe-green'}`}>
                     {severity.toUpperCase()}
                 </div>
             </div>
             
             <div className="w-full h-px bg-slate-200"></div>

             <div className="text-center w-full">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Sampling Rate</div>
                 <div className="relative h-2 bg-slate-200 rounded-full w-full overflow-hidden">
                     <motion.div 
                        className={`absolute top-0 bottom-0 left-0 ${severity === 'catastrophic' ? 'bg-safe-red' : 'bg-safe-green'}`}
                        animate={{ width: `${(1 / intervalRef.current) * 100}%` }} // Approximate visual for freq
                     />
                 </div>
                 <div className="mt-2 text-2xl font-mono font-bold text-slate-800">
                     {intervalRef.current.toFixed(2)}s
                 </div>
                 <div className="text-[10px] text-slate-400">Interval between frames</div>
             </div>
          </div>
      </div>
    </div>
  );
};

// --- STATELESS ARCHITECTURE DIAGRAM ---
export const StatelessArchitectureDiagram: React.FC = () => {
    return (
        <div className="w-full bg-slate-800 rounded-xl border border-slate-700 p-8 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                 
                 {/* Client Side */}
                 <div className="flex flex-col items-center gap-4 p-4 bg-slate-900/80 rounded-lg border border-slate-600 w-48">
                     <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                         <Smartphone size={24} />
                     </div>
                     <div className="text-center">
                         <div className="font-bold text-white">Client</div>
                         <div className="text-xs text-slate-400">Stores LSTM State</div>
                     </div>
                     <div className="w-full h-16 bg-slate-800 rounded border border-slate-600 flex flex-col items-center justify-center gap-1 p-2">
                         <div className="text-[10px] text-slate-500 uppercase">Memory</div>
                         <div className="flex gap-1">
                             <div className="w-8 h-6 bg-green-500/20 border border-green-500/50 rounded text-[8px] flex items-center justify-center text-green-400">h_t</div>
                             <div className="w-8 h-6 bg-yellow-500/20 border border-yellow-500/50 rounded text-[8px] flex items-center justify-center text-yellow-400">c_t</div>
                         </div>
                     </div>
                 </div>

                 {/* Arrows */}
                 <div className="flex-1 flex flex-col items-center gap-2 relative h-24 justify-center">
                     {/* Request Arrow */}
                     <motion.div 
                        className="absolute top-4 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                     >
                         <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-indigo-500 rotate-45"></div>
                     </motion.div>
                     <div className="text-[10px] text-slate-400 bg-slate-900 px-2 -mt-8 relative z-20">Frame + State (h_t, c_t)</div>

                     {/* Response Arrow */}
                     <motion.div 
                        className="absolute bottom-4 w-full h-0.5 bg-gradient-to-l from-green-500 to-emerald-500"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                     >
                         <div className="absolute left-0 -top-1 w-2 h-2 border-b-2 border-l-2 border-green-500 rotate-45"></div>
                     </motion.div>
                     <div className="text-[10px] text-slate-400 bg-slate-900 px-2 -mb-8 relative z-20">Prediction + New State (h_t+1, c_t+1)</div>
                 </div>

                 {/* Server Side */}
                 <div className="flex flex-col items-center gap-4 p-4 bg-slate-900/80 rounded-lg border border-slate-600 w-48">
                     <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                         <Server size={24} />
                     </div>
                     <div className="text-center">
                         <div className="font-bold text-white">Cloud Model</div>
                         <div className="text-xs text-slate-400">Stateless (Scalable)</div>
                     </div>
                     <div className="w-full flex justify-center gap-1">
                         {[1,2,3].map(i => (
                             <motion.div 
                                key={i}
                                className="w-2 h-8 bg-indigo-500 rounded-full"
                                animate={{ height: [10, 32, 10] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                             />
                         ))}
                     </div>
                 </div>

             </div>
        </div>
    )
}

// --- CLOUD ECONOMICS CHART ---
export const CloudEconomicsChart: React.FC = () => {
    // Data derived from Table 6 in PDF
    const data = [
        {
            name: 'Fixed-Rate',
            vCPU: 245998,
            frames: 3428,
            fill: '#94A3B8' // Slate-400
        },
        {
            name: 'SAFE (Adaptive)',
            vCPU: 58967,
            frames: 3540,
            fill: '#2563EB' // Blue-600
        }
    ];

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fontWeight: 600, fill: '#475569' }} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend iconType="circle" />
                    <Bar dataKey="vCPU" name="vCPU-Seconds Usage (Lower is Better)" radius={[0, 4, 4, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
