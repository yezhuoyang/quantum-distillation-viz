import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { PlayCircle, PauseCircle, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Design Philosophy: Holographic Quantum Aesthetic
 * - Purple gradients with glassmorphism
 * - Complete 15-to-1 circuit based on research paper
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
                    <h3 className="text-xl font-semibold">15-to-1 T-State Distillation Circuit</h3>
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

                  {/* Full 15-to-1 Circuit based on paper Figure 32(b) */}
                  <div className="bg-black/30 rounded-lg p-6 overflow-x-auto">
                    <svg viewBox="0 0 900 800" className="w-full h-auto">
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

                      {/* Qubit labels and wires - 16 qubits total */}
                      {Array.from({ length: 16 }, (_, i) => {
                        const y = 50 + i * 45;
                        const label = i === 0 ? "|+L⟩" : i <= 7 ? "|+L⟩" : "|gL⟩";
                        const isActive = currentStep > 0;
                        
                        return (
                          <g key={i}>
                            {/* Qubit label */}
                            <text x="30" y={y + 5} fill="#A78BFA" fontSize="14" fontFamily="JetBrains Mono">
                              {label}
                            </text>
                            {/* Wire */}
                            <line
                              x1="80"
                              y1={y}
                              x2="850"
                              y2={y}
                              stroke={isActive ? "url(#wireGradient)" : "#4C1D95"}
                              strokeWidth="2"
                              opacity={isActive ? 1 : 0.3}
                            />
                            {/* Qubit number on right */}
                            <text x="860" y={y + 5} fill="#A78BFA" fontSize="12" fontFamily="JetBrains Mono">
                              {i + 1}
                            </text>
                          </g>
                        );
                      })}

                      {/* Step 1: Initial state preparation (already in |+L⟩ and |gL⟩) */}
                      {currentStep >= 0 && (
                        <g opacity={currentStep >= 1 ? 1 : 0.3}>
                          <rect x="100" y="20" width="100" height="30" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="2" rx="4"/>
                          <text x="150" y="40" fill="#E9D5FF" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            Prepare States
                          </text>
                        </g>
                      )}

                      {/* Step 2: Encoding - CNOT gates forming Steane code structure */}
                      {currentStep >= 1 && (
                        <g opacity={currentStep >= 2 ? 1 : 0.5}>
                          {/* CNOT from qubit 1 to 3 */}
                          <circle cx="250" cy="50" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="250" cy="140" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="250" y1="50" x2="250" y2="140" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="242" y1="140" x2="258" y2="140" stroke="#EC4899" strokeWidth="2"/>
                          
                          {/* CNOT from qubit 2 to 4 */}
                          <circle cx="280" cy="95" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="280" cy="185" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="280" y1="95" x2="280" y2="185" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="272" y1="185" x2="288" y2="185" stroke="#EC4899" strokeWidth="2"/>
                          
                          {/* CNOT from qubit 3 to 5 */}
                          <circle cx="310" cy="140" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="310" cy="230" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="310" y1="140" x2="310" y2="230" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="302" y1="230" x2="318" y2="230" stroke="#EC4899" strokeWidth="2"/>

                          {/* Additional CNOTs for full Steane encoding */}
                          {/* Qubit 4 to 6 */}
                          <circle cx="340" cy="185" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="340" cy="275" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="340" y1="185" x2="340" y2="275" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="332" y1="275" x2="348" y2="275" stroke="#EC4899" strokeWidth="2"/>

                          {/* Qubit 5 to 7 */}
                          <circle cx="370" cy="230" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="370" cy="320" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="370" y1="230" x2="370" y2="320" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="362" y1="320" x2="378" y2="320" stroke="#EC4899" strokeWidth="2"/>

                          {/* Qubit 6 to 8 */}
                          <circle cx="400" cy="275" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="400" cy="365" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="400" y1="275" x2="400" y2="365" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="392" y1="365" x2="408" y2="365" stroke="#EC4899" strokeWidth="2"/>

                          {/* Cross connections for stabilizers */}
                          <circle cx="430" cy="365" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="430" cy="455" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="430" y1="365" x2="430" y2="455" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="422" y1="455" x2="438" y2="455" stroke="#EC4899" strokeWidth="2"/>

                          <circle cx="460" cy="410" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="460" cy="500" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="460" y1="410" x2="460" y2="500" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="452" y1="500" x2="468" y2="500" stroke="#EC4899" strokeWidth="2"/>

                          <circle cx="490" cy="455" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="490" cy="545" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="490" y1="455" x2="490" y2="545" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="482" y1="545" x2="498" y2="545" stroke="#EC4899" strokeWidth="2"/>

                          <circle cx="520" cy="500" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="520" cy="590" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="520" y1="500" x2="520" y2="590" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="512" y1="590" x2="528" y2="590" stroke="#EC4899" strokeWidth="2"/>

                          <circle cx="550" cy="545" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="550" cy="635" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="550" y1="545" x2="550" y2="635" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="542" y1="635" x2="558" y2="635" stroke="#EC4899" strokeWidth="2"/>

                          <circle cx="580" cy="590" r="4" fill="#EC4899" filter="url(#glow)"/>
                          <circle cx="580" cy="680" r="8" fill="none" stroke="#EC4899" strokeWidth="2" filter="url(#glow)"/>
                          <line x1="580" y1="590" x2="580" y2="680" stroke="#EC4899" strokeWidth="2"/>
                          <line x1="572" y1="680" x2="588" y2="680" stroke="#EC4899" strokeWidth="2"/>

                          <text x="250" y="15" fill="#F9A8D4" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            Steane Encoding
                          </text>
                        </g>
                      )}

                      {/* Step 3: Transversal S_L gates (represented as boxes) */}
                      {currentStep >= 2 && (
                        <g opacity={currentStep >= 3 ? 1 : 0.5}>
                          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                            const y = 50 + i * 45;
                            return (
                              <g key={`sl-${i}`}>
                                <rect
                                  x="640"
                                  y={y - 12}
                                  width="30"
                                  height="24"
                                  fill="#10B981"
                                  fillOpacity="0.3"
                                  stroke="#10B981"
                                  strokeWidth="2"
                                  rx="3"
                                  filter="url(#glow)"
                                />
                                <text x="655" y={y + 4} fill="#D1FAE5" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">
                                  S_L
                                </text>
                              </g>
                            );
                          })}
                          <text x="655" y="15" fill="#6EE7B7" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            Transversal S_L
                          </text>
                        </g>
                      )}

                      {/* Step 4: Measurements in X basis (M_X) */}
                      {currentStep >= 3 && (
                        <g opacity={currentStep >= 4 ? 1 : 0.5}>
                          {Array.from({ length: 15 }, (_, i) => {
                            const y = 50 + (i + 1) * 45;
                            return (
                              <g key={`mx-${i}`}>
                                <rect
                                  x="730"
                                  y={y - 15}
                                  width="40"
                                  height="30"
                                  fill="#F59E0B"
                                  fillOpacity="0.3"
                                  stroke="#F59E0B"
                                  strokeWidth="2"
                                  rx="4"
                                  filter="url(#glow)"
                                />
                                <text x="750" y={y + 4} fill="#FEF3C7" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">
                                  M_X
                                </text>
                              </g>
                            );
                          })}
                          <text x="750" y="15" fill="#FCD34D" fontSize="12" textAnchor="middle" fontFamily="Space Grotesk">
                            Syndrome Measurements
                          </text>
                        </g>
                      )}

                      {/* Step 5: Output state |ψ_L⟩ */}
                      {currentStep >= 4 && (
                        <g opacity={currentStep >= 5 ? 1 : 0.5}>
                          <line x1="800" y1="50" x2="840" y2="50" stroke="#8B5CF6" strokeWidth="3" filter="url(#glow)"/>
                          <text x="820" y="35" fill="#DDD6FE" fontSize="14" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">
                            |ψ_L⟩
                          </text>
                          <text x="820" y="75" fill="#A78BFA" fontSize="11" textAnchor="middle" fontFamily="Space Grotesk">
                            High-fidelity
                          </text>
                          <text x="820" y="90" fill="#A78BFA" fontSize="11" textAnchor="middle" fontFamily="Space Grotesk">
                            T-state
                          </text>
                        </g>
                      )}

                      {/* Post-selection note */}
                      {currentStep >= 5 && (
                        <text x="450" y="760" fill="#F9A8D4" fontSize="13" textAnchor="middle" fontFamily="Space Grotesk" fontStyle="italic">
                          Post-select: Keep only if all syndrome measurements = +1
                        </text>
                      )}
                    </svg>
                  </div>

                  {/* Step descriptions for 15-to-1 */}
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 0 ? 'bg-purple-500/20 border border-purple-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 1: Prepare Input States</h4>
                      <p className="text-sm text-purple-200/70">
                        Start with 8 copies of |+L⟩ (logical plus) and 8 copies of |gL⟩ (logical ancilla states). These are noisy T-states with fidelity F_in.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 1 ? 'bg-pink-500/20 border border-pink-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 2: Steane Code Encoding</h4>
                      <p className="text-sm text-pink-200/70">
                        Apply CNOT gates to encode one qubit from the Bell pair with 6 ancilla qubits using the [[7,1,3]] Steane code. This creates correlations for error detection.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 2 ? 'bg-green-500/20 border border-green-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 3: Transversal S_L Gates</h4>
                      <p className="text-sm text-green-200/70">
                        Apply S_L gate (logical S gate) to each of the 7 encoded qubits. This is transversal - errors don't spread between logical qubits. The S_L gates use the |Y_L⟩ states being purified.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 3 ? 'bg-amber-500/20 border border-amber-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 4: Syndrome Measurements</h4>
                      <p className="text-sm text-amber-200/70">
                        Measure all 15 ancilla qubits in the X basis (M_X). These measurements reveal whether errors occurred during the protocol.
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 4 ? 'bg-purple-500/20 border border-purple-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Step 5: Post-Selection</h4>
                      <p className="text-sm text-purple-200/70">
                        Keep the output |ψ_L⟩ only if all syndrome measurements equal +1. This filters out errors, leaving a high-fidelity T-state with F_out ≈ 1 - 35ε³.
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
                          <line x1="700" y1="60" x2="740" y2="60" stroke="#8B5CF6" strokeWidth="3"/>
                          <text x="720" y="50" fill="#DDD6FE" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono">Output</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg transition-all ${currentStep >= 0 ? 'bg-purple-500/20 border border-purple-400/30' : 'bg-white/5 border border-white/10'}`}>
                      <h4 className="font-semibold mb-1">Simplified Protocol</h4>
                      <p className="text-sm text-purple-200/70">
                        This 3-to-1 version demonstrates the key concepts: prepare noisy T-states, apply T gates, create correlations with CNOTs, measure syndromes, and post-select on measurement outcomes.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column: Theory and Controls */}
          <div className="space-y-6">
            {/* Noise Control */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <h3 className="text-xl font-semibold mb-4">Noise Parameters</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-purple-200/70">Input Error Rate (ε)</label>
                    <span className="text-sm font-mono text-purple-300">{noise[0].toFixed(3)}</span>
                  </div>
                  <Slider
                    value={noise}
                    onValueChange={setNoise}
                    min={0.001}
                    max={0.05}
                    step={0.001}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-purple-200/50 mb-1">Input Fidelity</p>
                    <p className="text-lg font-mono text-purple-300">{inputFidelity.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-200/50 mb-1">Output Fidelity</p>
                    <p className="text-lg font-mono text-green-300">{outputFidelity.toFixed(4)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-purple-200/50 mb-1">Improvement</p>
                    <p className={`text-lg font-mono ${parseFloat(improvement) > 0 ? 'text-green-300' : 'text-red-300'}`}>
                      {improvement}%
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Theory */}
            <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
              <h3 className="text-xl font-semibold mb-4">Theoretical Performance</h3>
              <div className="space-y-4 text-sm text-purple-200/70">
                <div>
                  <h4 className="font-semibold text-purple-300 mb-2">Error Suppression</h4>
                  <p className="font-mono text-xs bg-black/30 p-3 rounded">
                    ε_out ≈ 35 × ε_in³
                  </p>
                  <p className="mt-2">
                    Cubic error suppression means errors decrease dramatically. At ε = 1%, output error is only 0.0035%.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-300 mb-2">Success Probability</h4>
                  <p>
                    The protocol succeeds when all syndrome measurements indicate no errors. Success rate depends on input noise level.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-300 mb-2">The Threshold Question</h4>
                  <p>
                    Distillation only improves fidelity when hardware noise is below a threshold (~1-2% for this protocol). Above threshold, the 15-qubit overhead introduces more errors than the protocol corrects.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-semibold text-purple-300 mb-2">Based on Research</h4>
                  <p className="text-xs">
                    Circuit structure from Bravyi & Haah (2012), "Magic State Distillation with Low Overhead"
                    <br/>
                    arXiv:1208.0928, Figure 32(b)
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
