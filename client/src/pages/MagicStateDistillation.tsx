import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { PlayCircle, PauseCircle, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Design Philosophy: Holographic Quantum Aesthetic
 * - Purple gradients with glassmorphism
 * - Complete 15-to-1 circuit based on Reed-Muller code
 * - Smooth animations reflecting quantum evolution
 */

export default function MagicStateDistillation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [noise, setNoise] = useState([0.01]);
  const [activeTab, setActiveTab] = useState("full");

  // Animation control
  useEffect(() => {
    if (!isPlaying) return;
    
    const maxSteps = activeTab === "full" ? 5 : 4;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= maxSteps) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [isPlaying, currentStep, activeTab]);

  const handlePlayPause = () => {
    if (currentStep >= (activeTab === "full" ? 5 : 4)) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Calculate theoretical performance
  const inputError = noise[0];
  const outputError = 35 * Math.pow(inputError, 3);
  const inputFidelity = 1 - inputError;
  const outputFidelity = 1 - outputError;
  const improvement = ((outputFidelity - inputFidelity) / inputFidelity * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0B2E] via-[#2D1B4E] to-[#1A0B2E] text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Magic State Distillation
              </h1>
              <p className="text-purple-300/70 mt-1">15-to-1 Protocol with Cubic Error Suppression</p>
            </div>
            <a
              href="/"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Circuit Visualization */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); handleReset(); }}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="full">Full 15-to-1</TabsTrigger>
                  <TabsTrigger value="simplified">Simplified 3-to-1</TabsTrigger>
                </TabsList>

                <TabsContent value="full" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">15-to-1 Reed-Muller Circuit</h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={handlePlayPause}
                        variant="outline"
                        size="sm"
                        className="bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30"
                      >
                        {isPlaying ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        size="sm"
                        className="bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Full 15-to-1 Circuit based on Reed-Muller code */}
                  <div className="bg-black/30 rounded-lg p-6 overflow-x-auto">
                    <svg viewBox="0 0 1000 800" className="w-full h-auto">
                      {/* Define styles */}
                      <defs>
                        <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="#EC4899" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Qubit labels and wires - 16 qubits total (15 input + 1 output) */}
                      {Array.from({ length: 16 }, (_, i) => {
                        const y = 50 + i * 45;
                        // Define qubit labels based on the circuit diagram
                        const qubitLabels = [
                          "|+_L⟩", "|+_L⟩", "|g_L⟩", "|+_L⟩", "|g_L⟩", 
                          "|g_L⟩", "|g_L⟩", "|+_L⟩", "|g_L⟩", "|g_L⟩", 
                          "|g_L⟩", "|g_L⟩", "|g_L⟩", "|g_L⟩", "|g_L⟩", "|+_L⟩"
                        ];
                        const label = qubitLabels[i];
                        const isActive = currentStep > 0;
                        
                        return (
                          <g key={i}>
                            {/* Qubit label */}
                            <text x="30" y={y + 5} fill="#A78BFA" fontSize="13" fontFamily="JetBrains Mono">
                              {label}
                            </text>
                            {/* Wire */}
                            <line
                              x1="100"
                              y1={y}
                              x2="920"
                              y2={y}
                              stroke={isActive ? "url(#wireGradient)" : "#4C1D95"}
                              strokeWidth="2"
                              opacity={isActive ? 1 : 0.3}
                            />
                            {/* Qubit number on right */}
                            <text x="930" y={y + 5} fill="#A78BFA" fontSize="12" fontFamily="JetBrains Mono">
                              {i + 1}
                            </text>
                          </g>
                        );
                      })}

                      {/* Step 1: Column 1 of CNOT gates */}
                      {currentStep >= 1 && (
                        <g opacity={currentStep >= 2 ? 1 : 0.5}>
                          {/* CNOT patterns for column 1 based on the circuit diagram */}
                          {/* Qubit 1 (index 0) controls qubit 16 (index 15) */}
                          <g>
                            <circle cx="180" cy="50" r="4" fill="#EC4899" filter="url(#glow)"/>
                            <line x1="180" y1="50" x2="180" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <circle cx="180" cy="725" r="10" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                            <line x1="170" y1="725" x2="190" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <line x1="180" y1="715" x2="180" y2="735" stroke="#EC4899" strokeWidth="2"/>
                          </g>
                          {/* Qubit 2 (index 1) controls qubit 16 (index 15) */}
                          <g>
                            <circle cx="200" cy="95" r="4" fill="#EC4899" filter="url(#glow)"/>
                            <line x1="200" y1="95" x2="200" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <circle cx="200" cy="725" r="10" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                            <line x1="190" y1="725" x2="210" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <line x1="200" y1="715" x2="200" y2="735" stroke="#EC4899" strokeWidth="2"/>
                          </g>
                          {/* Qubit 3 (index 2) controls qubit 16 (index 15) */}
                          <g>
                            <circle cx="220" cy="140" r="4" fill="#EC4899" filter="url(#glow)"/>
                            <line x1="220" y1="140" x2="220" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <circle cx="220" cy="725" r="10" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                            <line x1="210" y1="725" x2="230" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <line x1="220" y1="715" x2="220" y2="735" stroke="#EC4899" strokeWidth="2"/>
                          </g>
                          {/* Qubit 4 (index 3) controls qubit 16 (index 15) */}
                          <g>
                            <circle cx="240" cy="185" r="4" fill="#EC4899" filter="url(#glow)"/>
                            <line x1="240" y1="185" x2="240" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <circle cx="240" cy="725" r="10" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                            <line x1="230" y1="725" x2="250" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <line x1="240" y1="715" x2="240" y2="735" stroke="#EC4899" strokeWidth="2"/>
                          </g>
                          {/* Qubit 8 (index 7) controls qubit 16 (index 15) */}
                          <g>
                            <circle cx="260" cy="365" r="4" fill="#EC4899" filter="url(#glow)"/>
                            <line x1="260" y1="365" x2="260" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <circle cx="260" cy="725" r="10" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                            <line x1="250" y1="725" x2="270" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <line x1="260" y1="715" x2="260" y2="735" stroke="#EC4899" strokeWidth="2"/>
                          </g>
                          {/* Qubit 15 (index 14) controls qubit 16 (index 15) */}
                          <g>
                            <circle cx="280" cy="680" r="4" fill="#EC4899" filter="url(#glow)"/>
                            <line x1="280" y1="680" x2="280" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <circle cx="280" cy="725" r="10" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                            <line x1="270" y1="725" x2="290" y2="725" stroke="#EC4899" strokeWidth="2"/>
                            <line x1="280" y1="715" x2="280" y2="735" stroke="#EC4899" strokeWidth="2"/>
                          </g>
                          <text x="220" y="25" fill="#F9A8D4" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            Column 1 CNOTs
                          </text>
                        </g>
                      )}

                      {/* Step 2: Column 2 of CNOT gates */}
                      {currentStep >= 2 && (
                        <g opacity={currentStep >= 3 ? 1 : 0.5}>
                          {/* Column 2 CNOT patterns */}
                          {/* Qubit 3 (index 2) controls multiple qubits */}
                          {[4, 5, 6, 8, 11, 12, 13, 14].map((targetIdx, idx) => {
                            const xPos = 350;
                            const y0 = 140;
                            const yTarget = 50 + targetIdx * 45;
                            
                            return (
                              <g key={`cnot-col2-3-${idx}`}>
                                {idx === 0 && <circle cx={xPos} cy={y0} r="4" fill="#10B981" filter="url(#glow)"/>}
                                <line x1={xPos} y1={y0} x2={xPos} y2={yTarget} stroke="#10B981" strokeWidth="2"/>
                                <circle cx={xPos} cy={yTarget} r="10" fill="none" stroke="#10B981" strokeWidth="2" filter="url(#glow)"/>
                                <line x1={xPos - 10} y1={yTarget} x2={xPos + 10} y2={yTarget} stroke="#10B981" strokeWidth="2"/>
                                <line x1={xPos} y1={yTarget - 10} x2={xPos} y2={yTarget + 10} stroke="#10B981" strokeWidth="2"/>
                              </g>
                            );
                          })}
                          {/* Qubit 5 (index 4) controls multiple qubits */}
                          {[8, 11, 12].map((targetIdx, idx) => {
                            const xPos = 380;
                            const y0 = 230;
                            const yTarget = 50 + targetIdx * 45;
                            
                            return (
                              <g key={`cnot-col2-5-${idx}`}>
                                {idx === 0 && <circle cx={xPos} cy={y0} r="4" fill="#10B981" filter="url(#glow)"/>}
                                <line x1={xPos} y1={y0} x2={xPos} y2={yTarget} stroke="#10B981" strokeWidth="2"/>
                                <circle cx={xPos} cy={yTarget} r="10" fill="none" stroke="#10B981" strokeWidth="2" filter="url(#glow)"/>
                                <line x1={xPos - 10} y1={yTarget} x2={xPos + 10} y2={yTarget} stroke="#10B981" strokeWidth="2"/>
                                <line x1={xPos} y1={yTarget - 10} x2={xPos} y2={yTarget + 10} stroke="#10B981" strokeWidth="2"/>
                              </g>
                            );
                          })}
                          {/* Qubit 6 (index 5) controls multiple qubits */}
                          {[8, 11, 13].map((targetIdx, idx) => {
                            const xPos = 410;
                            const y0 = 275;
                            const yTarget = 50 + targetIdx * 45;
                            
                            return (
                              <g key={`cnot-col2-6-${idx}`}>
                                {idx === 0 && <circle cx={xPos} cy={y0} r="4" fill="#10B981" filter="url(#glow)"/>}
                                <line x1={xPos} y1={y0} x2={xPos} y2={yTarget} stroke="#10B981" strokeWidth="2"/>
                                <circle cx={xPos} cy={yTarget} r="10" fill="none" stroke="#10B981" strokeWidth="2" filter="url(#glow)"/>
                                <line x1={xPos - 10} y1={yTarget} x2={xPos + 10} y2={yTarget} stroke="#10B981" strokeWidth="2"/>
                                <line x1={xPos} y1={yTarget - 10} x2={xPos} y2={yTarget + 10} stroke="#10B981" strokeWidth="2"/>
                              </g>
                            );
                          })}
                          {/* Qubit 7 (index 6) controls multiple qubits */}
                          {[8, 12, 13].map((targetIdx, idx) => {
                            const xPos = 440;
                            const y0 = 320;
                            const yTarget = 50 + targetIdx * 45;
                            
                            return (
                              <g key={`cnot-col2-7-${idx}`}>
                                {idx === 0 && <circle cx={xPos} cy={y0} r="4" fill="#10B981" filter="url(#glow)"/>}
                                <line x1={xPos} y1={y0} x2={xPos} y2={yTarget} stroke="#10B981" strokeWidth="2"/>
                                <circle cx={xPos} cy={yTarget} r="10" fill="none" stroke="#10B981" strokeWidth="2" filter="url(#glow)"/>
                                <line x1={xPos - 10} y1={yTarget} x2={xPos + 10} y2={yTarget} stroke="#10B981" strokeWidth="2"/>
                                <line x1={xPos} y1={yTarget - 10} x2={xPos} y2={yTarget + 10} stroke="#10B981" strokeWidth="2"/>
                              </g>
                            );
                          })}
                          <text x="395" y="25" fill="#6EE7B7" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            Column 2 CNOTs
                          </text>
                        </g>
                      )}

                      {/* Step 3: Column 3 of CNOT gates */}
                      {currentStep >= 3 && (
                        <g opacity={currentStep >= 4 ? 1 : 0.5}>
                          {/* Column 3 CNOT patterns */}
                          {/* Qubit 9 (index 8) controls multiple qubits */}
                          {[11, 13, 14].map((targetIdx, idx) => {
                            const xPos = 520;
                            const y0 = 410;
                            const yTarget = 50 + targetIdx * 45;
                            
                            return (
                              <g key={`cnot-col3-9-${idx}`}>
                                {idx === 0 && <circle cx={xPos} cy={y0} r="4" fill="#F59E0B" filter="url(#glow)"/>}
                                <line x1={xPos} y1={y0} x2={xPos} y2={yTarget} stroke="#F59E0B" strokeWidth="2"/>
                                <circle cx={xPos} cy={yTarget} r="10" fill="none" stroke="#F59E0B" strokeWidth="2" filter="url(#glow)"/>
                                <line x1={xPos - 10} y1={yTarget} x2={xPos + 10} y2={yTarget} stroke="#F59E0B" strokeWidth="2"/>
                                <line x1={xPos} y1={yTarget - 10} x2={xPos} y2={yTarget + 10} stroke="#F59E0B" strokeWidth="2"/>
                              </g>
                            );
                          })}
                          {/* Qubit 10 (index 9) controls multiple qubits */}
                          {[11, 12, 14].map((targetIdx, idx) => {
                            const xPos = 550;
                            const y0 = 455;
                            const yTarget = 50 + targetIdx * 45;
                            
                            return (
                              <g key={`cnot-col3-10-${idx}`}>
                                {idx === 0 && <circle cx={xPos} cy={y0} r="4" fill="#F59E0B" filter="url(#glow)"/>}
                                <line x1={xPos} y1={y0} x2={xPos} y2={yTarget} stroke="#F59E0B" strokeWidth="2"/>
                                <circle cx={xPos} cy={yTarget} r="10" fill="none" stroke="#F59E0B" strokeWidth="2" filter="url(#glow)"/>
                                <line x1={xPos - 10} y1={yTarget} x2={xPos + 10} y2={yTarget} stroke="#F59E0B" strokeWidth="2"/>
                                <line x1={xPos} y1={yTarget - 10} x2={xPos} y2={yTarget + 10} stroke="#F59E0B" strokeWidth="2"/>
                              </g>
                            );
                          })}
                          {/* Qubit 11 (index 10) controls multiple qubits */}
                          {[12, 13, 14].map((targetIdx, idx) => {
                            const xPos = 580;
                            const y0 = 500;
                            const yTarget = 50 + targetIdx * 45;
                            
                            return (
                              <g key={`cnot-col3-11-${idx}`}>
                                {idx === 0 && <circle cx={xPos} cy={y0} r="4" fill="#F59E0B" filter="url(#glow)"/>}
                                <line x1={xPos} y1={y0} x2={xPos} y2={yTarget} stroke="#F59E0B" strokeWidth="2"/>
                                <circle cx={xPos} cy={yTarget} r="10" fill="none" stroke="#F59E0B" strokeWidth="2" filter="url(#glow)"/>
                                <line x1={xPos - 10} y1={yTarget} x2={xPos + 10} y2={yTarget} stroke="#F59E0B" strokeWidth="2"/>
                                <line x1={xPos} y1={yTarget - 10} x2={xPos} y2={yTarget + 10} stroke="#F59E0B" strokeWidth="2"/>
                              </g>
                            );
                          })}
                          <text x="550" y="25" fill="#FCD34D" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            Column 3 CNOTs
                          </text>
                        </g>
                      )}

                      {/* Step 4: Column 4 of CNOT gates */}
                      {currentStep >= 4 && (
                        <g opacity={currentStep >= 5 ? 1 : 0.5}>
                          {/* Column 4 CNOT patterns */}
                          {/* Qubit 12 (index 11) controls qubit 14 (index 13) */}
                          <g>
                            <circle cx="650" cy="545" r="4" fill="#A78BFA" filter="url(#glow)"/>
                            <line x1="650" y1="545" x2="650" y2="635" stroke="#A78BFA" strokeWidth="2"/>
                            <circle cx="650" cy="635" r="10" fill="none" stroke="#A78BFA" strokeWidth="2" filter="url(#glow)"/>
                            <line x1="640" y1="635" x2="660" y2="635" stroke="#A78BFA" strokeWidth="2"/>
                            <line x1="650" y1="625" x2="650" y2="645" stroke="#A78BFA" strokeWidth="2"/>
                          </g>
                          {/* Qubit 13 (index 12) controls qubit 14 (index 13) */}
                          <g>
                            <circle cx="670" cy="590" r="4" fill="#A78BFA" filter="url(#glow)"/>
                            <line x1="670" y1="590" x2="670" y2="635" stroke="#A78BFA" strokeWidth="2"/>
                            <circle cx="670" cy="635" r="10" fill="none" stroke="#A78BFA" strokeWidth="2" filter="url(#glow)"/>
                            <line x1="660" y1="635" x2="680" y2="635" stroke="#A78BFA" strokeWidth="2"/>
                            <line x1="670" y1="625" x2="670" y2="645" stroke="#A78BFA" strokeWidth="2"/>
                          </g>
                          <text x="660" y="25" fill="#DDD6FE" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            Column 4 CNOTs
                          </text>
                        </g>
                      )}

                      {/* Step 5: T†_L gates on all 15 qubits */}
                      {currentStep >= 5 && (
                        <g>
                          {Array.from({ length: 15 }, (_, i) => {
                            const y = 50 + i * 45;
                            return (
                              <g key={`tl-${i}`}>
                                <rect
                                  x="740"
                                  y={y - 14}
                                  width="45"
                                  height="28"
                                  fill="#8B5CF6"
                                  fillOpacity="0.3"
                                  stroke="#8B5CF6"
                                  strokeWidth="2"
                                  rx="3"
                                  filter="url(#glow)"
                                />
                                <text x="762" y={y + 5} fill="#DDD6FE" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">
                                  T†_L
                                </text>
                              </g>
                            );
                          })}
                          <text x="762" y="25" fill="#C4B5FD" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            Transversal T†_L
                          </text>
                        </g>
                      )}

                      {/* Step 6: M_X Measurements on all 15 qubits */}
                      {currentStep >= 5 && (
                        <g>
                          {Array.from({ length: 15 }, (_, i) => {
                            const y = 50 + i * 45;
                            return (
                              <g key={`mx-${i}`}>
                                <rect
                                  x="830"
                                  y={y - 15}
                                  width="45"
                                  height="30"
                                  fill="#EC4899"
                                  fillOpacity="0.3"
                                  stroke="#EC4899"
                                  strokeWidth="2"
                                  rx="4"
                                  filter="url(#glow)"
                                />
                                <text x="852" y={y + 4} fill="#FEF3C7" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">
                                  M_X
                                </text>
                              </g>
                            );
                          })}
                          <text x="852" y="25" fill="#F9A8D4" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            X_L Measurements
                          </text>
                        </g>
                      )}

                      {/* Output state |ψ_L⟩ on qubit 16 */}
                      {currentStep >= 5 && (
                        <g>
                          <line x1="890" y1="725" x2="920" y2="725" stroke="#10B981" strokeWidth="3" filter="url(#glow)"/>
                          <text x="905" y="710" fill="#D1FAE5" fontSize="14" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">
                            |ψ_L⟩
                          </text>
                          <text x="905" y="750" fill="#6EE7B7" fontSize="11" textAnchor="middle" fontFamily="Space Grotesk">
                            Output
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>

                  {/* Step descriptions for 15-to-1 */}
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 1 ? 'bg-pink-500/20 border border-pink-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 1: Column 1 CNOTs</h4>
                      <p className="text-sm text-pink-200/70">
                        Apply first column of CNOT gates according to Reed-Muller code structure. Controls from qubits 1, 2, 3, 4, 8, 15 to qubit 16.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 2 ? 'bg-green-500/20 border border-green-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 2: Column 2 CNOTs</h4>
                      <p className="text-sm text-green-200/70">
                        Apply second column of CNOT gates. Multiple controls from qubits 3, 5, 6, 7 to various target qubits.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 3 ? 'bg-amber-500/20 border border-amber-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 3: Column 3 CNOTs</h4>
                      <p className="text-sm text-amber-200/70">
                        Apply third column of CNOT gates. Controls from qubits 9, 10, 11 to multiple targets.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 4 ? 'bg-purple-500/20 border border-purple-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 4: Column 4 CNOTs</h4>
                      <p className="text-sm text-purple-200/70">
                        Apply final column of CNOT gates. Controls from qubits 12, 13 to qubit 14.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 5 ? 'bg-purple-500/20 border border-purple-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 5: T†_L Gates and Measurements</h4>
                      <p className="text-sm text-purple-200/70">
                        Apply transversal T†_L gates to all 15 qubits, then measure in X_L basis. Post-select based on measurement outcomes to obtain purified |A_L⟩ state on qubit 16.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="simplified" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Simplified 3-to-1 Circuit</h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={handlePlayPause}
                        variant="outline"
                        size="sm"
                        className="bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30"
                      >
                        {isPlaying ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        size="sm"
                        className="bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Simplified 3-to-1 circuit */}
                  <div className="bg-black/30 rounded-lg p-6">
                    <svg viewBox="0 0 800 300" className="w-full h-auto">
                      <defs>
                        <linearGradient id="wireGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="#EC4899" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>

                      {/* 5 qubits */}
                      {[0, 1, 2, 3, 4].map((i) => {
                        const y = 60 + i * 50;
                        const label = i < 3 ? "|+⟩" : "|0⟩";
                        return (
                          <g key={i}>
                            <text x="30" y={y + 5} fill="#A78BFA" fontSize="14" fontFamily="JetBrains Mono">
                              {label}
                            </text>
                            <line
                              x1="80"
                              y1={y}
                              x2="750"
                              y2={y}
                              stroke={currentStep > 0 ? "url(#wireGradient2)" : "#4C1D95"}
                              strokeWidth="2"
                              opacity={currentStep > 0 ? 1 : 0.3}
                            />
                          </g>
                        );
                      })}

                      {/* T gates on first 3 qubits */}
                      {currentStep >= 1 && (
                        <g opacity={currentStep >= 2 ? 1 : 0.5}>
                          {[0, 1, 2].map((i) => {
                            const y = 60 + i * 50;
                            return (
                              <g key={`t1-${i}`}>
                                <rect x="140" y={y - 12} width="30" height="24" fill="#8B5CF6" fillOpacity="0.3" stroke="#8B5CF6" strokeWidth="2" rx="3"/>
                                <text x="155" y={y + 4} fill="#DDD6FE" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">T</text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* CNOT gates */}
                      {currentStep >= 2 && (
                        <g opacity={currentStep >= 3 ? 1 : 0.5}>
                          <circle cx="250" cy="60" r="4" fill="#EC4899"/>
                          <circle cx="250" cy="210" r="8" fill="none" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="250" y1="60" x2="250" y2="210" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="242" y1="210" x2="258" y2="210" stroke="#EC4899" strokeWidth="2"/>

                          <circle cx="300" cy="110" r="4" fill="#EC4899"/>
                          <circle cx="300" cy="260" r="8" fill="none" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="300" y1="110" x2="300" y2="260" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="292" y1="260" x2="308" y2="260" stroke="#EC4899" strokeWidth="2"/>
                        </g>
                      )}

                      {/* More T gates */}
                      {currentStep >= 3 && (
                        <g opacity={currentStep >= 4 ? 1 : 0.5}>
                          {[0, 1, 2].map((i) => {
                            const y = 60 + i * 50;
                            return (
                              <g key={`t2-${i}`}>
                                <rect x="400" y={y - 12} width="30" height="24" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" rx="3"/>
                                <text x="415" y={y + 4} fill="#D1FAE5" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">T</text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* Measurements */}
                      {currentStep >= 4 && (
                        <g>
                          {[3, 4].map((i) => {
                            const y = 60 + i * 50;
                            return (
                              <g key={`m-${i}`}>
                                <rect x="550" y={y - 15} width="35" height="30" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2" rx="4"/>
                                <text x="567" y={y + 4} fill="#FEF3C7" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">M</text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* Output */}
                      {currentStep >= 4 && (
                        <g>
                          <line x1="650" y1="60" x2="700" y2="60" stroke="#10B981" strokeWidth="3"/>
                          <text x="675" y="45" fill="#D1FAE5" fontSize="13" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">|T⟩</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  {/* Step descriptions for simplified */}
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 1 ? 'bg-purple-500/20 border border-purple-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 1: Apply T gates</h4>
                      <p className="text-sm text-purple-200/70">
                        Apply noisy T gates to three |+⟩ states. These are the states we want to purify.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 2 ? 'bg-pink-500/20 border border-pink-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 2: CNOT Gates</h4>
                      <p className="text-sm text-pink-200/70">
                        Apply CNOT gates to entangle the qubits with ancilla states.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 3 ? 'bg-green-500/20 border border-green-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 3: More T gates</h4>
                      <p className="text-sm text-green-200/70">
                        Apply additional T gates to complete the distillation circuit.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 4 ? 'bg-amber-500/20 border border-amber-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 4: Measure and Post-select</h4>
                      <p className="text-sm text-amber-200/70">
                        Measure ancilla qubits. If measurements are favorable, keep the output as a purified |T⟩ state.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column: Theory and Controls */}
          <div className="space-y-6">
            {/* Parameter Controls */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <h3 className="text-xl font-semibold mb-4">Input Parameters</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-purple-200">Input Error Rate (ε)</label>
                    <span className="text-sm font-mono text-purple-300">{inputError.toFixed(4)}</span>
                  </div>
                  <Slider
                    value={noise}
                    onValueChange={setNoise}
                    min={0.001}
                    max={0.1}
                    step={0.001}
                    className="w-full"
                  />
                  <p className="text-xs text-purple-300/60 mt-1">
                    Adjust the noise level of input |A_L⟩ states
                  </p>
                </div>
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <h3 className="text-xl font-semibold mb-4">Theoretical Performance</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                    <div className="text-sm text-purple-200/70 mb-1">Input Fidelity</div>
                    <div className="text-2xl font-bold text-purple-100">{inputFidelity.toFixed(6)}</div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30">
                    <div className="text-sm text-green-200/70 mb-1">Output Fidelity</div>
                    <div className="text-2xl font-bold text-green-100">{outputFidelity.toFixed(6)}</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30">
                  <div className="text-sm text-amber-200/70 mb-1">Improvement</div>
                  <div className="text-2xl font-bold text-amber-100">+{improvement}%</div>
                </div>

                <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                  <h4 className="font-semibold mb-2 text-purple-200">Error Suppression Formula</h4>
                  <div className="font-mono text-sm text-purple-100 bg-black/40 p-3 rounded">
                    ε_out = 35 × ε³
                  </div>
                  <p className="text-xs text-purple-300/60 mt-2">
                    Cubic error suppression for [[15,1,3]] Reed-Muller code
                  </p>
                </div>
              </div>
            </Card>

            {/* Educational Content */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <h3 className="text-xl font-semibold mb-4">Key Concepts</h3>
              
              <div className="space-y-3 text-sm text-purple-200/80">
                <div>
                  <h4 className="font-semibold text-purple-100 mb-1">Reed-Muller Code [[15,1,3]]</h4>
                  <p>
                    A quantum error-correcting code that encodes 1 logical qubit into 15 physical qubits with distance 3.
                    Supports transversal T gates, making it ideal for magic state distillation.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-100 mb-1">Transversal Gates</h4>
                  <p>
                    Gates applied independently to each physical qubit. For Reed-Muller code, applying T to each of 15 qubits
                    implements a logical T gate on the encoded qubit.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-100 mb-1">Magic States |A_L⟩</h4>
                  <p>
                    Special quantum states that enable universal quantum computation when combined with Clifford gates.
                    The |A_L⟩ state is an eigenstate of the logical T gate.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-100 mb-1">Post-Selection</h4>
                  <p>
                    Based on measurement outcomes, we either keep or discard the output state. Success probability decreases
                    with input error, but accepted states have much higher fidelity.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
