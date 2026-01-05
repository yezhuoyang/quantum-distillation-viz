/**
 * Design Philosophy: Holographic Interface with Depth
 * - Complex 15-qubit circuit visualization
 * - Interactive parameter controls
 * - Real-time fidelity calculations
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, RotateCcw, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function MagicStateDistillation() {
  const [step, setStep] = useState(0);
  const [noise, setNoise] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    { title: "Prepare 15 T-States", desc: "Initialize 15 qubits in T|+⟩ states" },
    { title: "Encode [[15,1,3]]", desc: "Apply encoding circuit for Reed-Muller code" },
    { title: "Transversal T", desc: "Apply T gate to all 15 qubits simultaneously" },
    { title: "Decode & Measure", desc: "Decode and measure syndrome qubits" },
    { title: "Output T-State", desc: "High-fidelity T-state on qubit 0" }
  ];

  const handlePlay = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  // Calculate error suppression
  const inputError = noise[0] / 100;
  const outputError = 35 * Math.pow(inputError, 3);
  const inputFidelity = 1 - inputError;
  const outputFidelity = 1 - outputError;
  const successRate = Math.pow(1 - 2 * inputError, 14);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-purple-200 hover:text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-pink-400" />
              <span className="font-display text-xl font-bold text-white">
                Magic State Distillation
              </span>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <Tabs defaultValue="simplified" className="space-y-6">
          <TabsList className="glass border border-white/10">
            <TabsTrigger value="simplified">3-to-1 (Simplified)</TabsTrigger>
            <TabsTrigger value="full">15-to-1 (Full Protocol)</TabsTrigger>
          </TabsList>

          {/* Simplified 3-to-1 */}
          <TabsContent value="simplified" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass p-8 border-pink-500/20">
                <h2 className="text-2xl font-bold text-white mb-6">Simplified 3-to-1 Protocol</h2>
                
                <div className="bg-black/30 rounded-lg p-8 mb-6">
                  <svg viewBox="0 0 500 200" className="w-full h-auto">
                    {/* Qubit lines */}
                    <line x1="50" y1="50" x2="450" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="50" y1="100" x2="450" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <line x1="50" y1="150" x2="450" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    
                    {/* Labels */}
                    <text x="20" y="55" fill="rgba(255,255,255,0.8)" fontSize="14" fontFamily="monospace">q₀</text>
                    <text x="20" y="105" fill="rgba(255,255,255,0.8)" fontSize="14" fontFamily="monospace">q₁</text>
                    <text x="20" y="155" fill="rgba(255,255,255,0.8)" fontSize="14" fontFamily="monospace">q₂</text>
                    
                    {/* T gates */}
                    <rect x="80" y="35" width="30" height="30" fill="rgba(236, 72, 153, 0.3)" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="2" rx="4" />
                    <text x="95" y="55" fill="white" fontSize="14" textAnchor="middle" fontFamily="monospace">T</text>
                    
                    <rect x="80" y="85" width="30" height="30" fill="rgba(236, 72, 153, 0.3)" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="2" rx="4" />
                    <text x="95" y="105" fill="white" fontSize="14" textAnchor="middle" fontFamily="monospace">T</text>
                    
                    <rect x="80" y="135" width="30" height="30" fill="rgba(236, 72, 153, 0.3)" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="2" rx="4" />
                    <text x="95" y="155" fill="white" fontSize="14" textAnchor="middle" fontFamily="monospace">T</text>
                    
                    {/* CNOT gates */}
                    <circle cx="180" cy="50" r="6" fill="rgba(59, 130, 246, 0.8)" stroke="white" strokeWidth="2" />
                    <line x1="180" y1="50" x2="180" y2="100" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" />
                    <circle cx="180" cy="100" r="12" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" />
                    <line x1="180" y1="88" x2="180" y2="112" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" />
                    <line x1="168" y1="100" x2="192" y2="100" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" />
                    
                    <circle cx="220" cy="50" r="6" fill="rgba(59, 130, 246, 0.8)" stroke="white" strokeWidth="2" />
                    <line x1="220" y1="50" x2="220" y2="150" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" />
                    <circle cx="220" cy="150" r="12" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" />
                    <line x1="220" y1="138" x2="220" y2="162" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" />
                    <line x1="208" y1="150" x2="232" y2="150" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" />
                    
                    {/* Measurements */}
                    <rect x="350" y="85" width="40" height="30" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.8)" strokeWidth="2" rx="4" />
                    <text x="370" y="105" fill="white" fontSize="14" textAnchor="middle">M</text>
                    
                    <rect x="350" y="135" width="40" height="30" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.8)" strokeWidth="2" rx="4" />
                    <text x="370" y="155" fill="white" fontSize="14" textAnchor="middle">M</text>
                  </svg>
                </div>

                <p className="text-purple-100 mb-4">
                  This simplified protocol demonstrates the key concepts of magic state distillation using only 3 qubits instead of 15.
                </p>
                <p className="text-purple-100">
                  While less powerful than the full 15-to-1 protocol, it's much easier to understand and implement on current quantum hardware.
                </p>
              </Card>

              <Card className="glass p-8 border-purple-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">Key Concepts</h2>
                <div className="space-y-4 text-purple-100">
                  <div>
                    <h3 className="font-semibold text-white mb-2">What are Magic States?</h3>
                    <p className="text-sm">
                      Magic states like T|+⟩ are special quantum states that enable universal quantum computing when combined with Clifford gates. They're called "magic" because they provide the non-Clifford resources needed for quantum advantage.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">Why Distill?</h3>
                    <p className="text-sm">
                      T gates are notoriously difficult to implement with high fidelity. Distillation allows us to start with many noisy T-states and produce fewer, but much higher quality T-states.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-2">The Trade-off</h3>
                    <p className="text-sm">
                      We sacrifice quantity for quality. The 15-to-1 protocol uses 15 noisy T-states to produce just 1 high-fidelity T-state, but with cubic error suppression.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Full 15-to-1 */}
          <TabsContent value="full" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Circuit */}
              <div>
                <Card className="glass p-8 border-pink-500/20">
                  <h2 className="text-2xl font-bold text-white mb-6">15-to-1 Protocol Circuit</h2>
                  
                  <div className="bg-black/30 rounded-lg p-6 mb-6">
                    <div className="text-center text-purple-200 mb-4">
                      <p className="text-sm">Schematic view of 15-qubit circuit</p>
                      <p className="text-xs text-purple-300 mt-2">Full circuit is too complex to display in detail</p>
                    </div>
                    
                    {/* Simplified schematic */}
                    <div className="space-y-3">
                      {[...Array(15)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs text-purple-300 font-mono w-8">q{i}</span>
                          <div className="flex-1 h-0.5 bg-purple-500/30"></div>
                          {i === 0 && (
                            <span className="text-xs text-green-400 font-mono">Data</span>
                          )}
                          {i > 0 && (
                            <span className="text-xs text-purple-400 font-mono">Syndrome</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-4 mb-6">
                    <Button 
                      onClick={handlePlay} 
                      disabled={isPlaying || step >= steps.length - 1}
                      className="flex-1 bg-pink-600 hover:bg-pink-700"
                    >
                      <Play className="mr-2 w-4 h-4" />
                      {isPlaying ? "Playing..." : "Play Animation"}
                    </Button>
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1 border-pink-500/50 text-pink-200 hover:bg-pink-500/20"
                    >
                      <RotateCcw className="mr-2 w-4 h-4" />
                      Reset
                    </Button>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    {steps.map((s, i) => (
                      <div 
                        key={i}
                        className={`p-3 rounded-lg transition-all ${
                          i === step 
                            ? 'glass border border-pink-500/50 glow' 
                            : i < step 
                              ? 'bg-pink-500/10 border border-pink-500/20'
                              : 'bg-black/20 border border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm ${
                            i === step ? 'bg-pink-500 text-white' : i < step ? 'bg-pink-500/50 text-white' : 'bg-white/10 text-white/50'
                          }`}>
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white">{s.title}</div>
                            <div className="text-sm text-pink-200">{s.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right: Theory and Parameters */}
              <div className="space-y-6">
                {/* Theory */}
                <Card className="glass p-8 border-purple-500/20">
                  <h2 className="text-2xl font-bold text-white mb-4">[[15,1,3]] Reed-Muller Code</h2>
                  <div className="space-y-4 text-purple-100">
                    <p>
                      The 15-to-1 protocol is based on the quantum Reed-Muller code, which encodes 1 logical qubit into 15 physical qubits with distance 3.
                    </p>
                    <p>
                      <strong className="text-white">Key Property:</strong> The T gate is <em>transversal</em> for this code, meaning we can apply a physical T gate to each of the 15 qubits, and the result is equivalent to a logical T gate on the encoded qubit.
                    </p>
                    <p>
                      <strong className="text-white">Error Suppression:</strong> Cubic suppression of errors:
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-sm">
                      ε_out ≈ 35 × ε_in³
                    </div>
                    <p>
                      For example, with 1% input error, output error is ~0.0035% - a 285× improvement!
                    </p>
                  </div>
                </Card>

                {/* Parameters */}
                <Card className="glass p-8 border-pink-500/20">
                  <h2 className="text-2xl font-bold text-white mb-6">Simulation Parameters</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-purple-200">Input Error Rate</label>
                        <span className="font-mono text-white">{noise[0]}%</span>
                      </div>
                      <Slider 
                        value={noise}
                        onValueChange={setNoise}
                        min={0.1}
                        max={5}
                        step={0.1}
                        className="mb-2"
                      />
                      <p className="text-sm text-purple-300">
                        Error rate per T gate
                      </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-purple-200">Input Fidelity:</span>
                        <span className="font-mono text-white">{inputFidelity.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Output Fidelity:</span>
                        <span className="font-mono text-green-400">{outputFidelity.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Error Reduction:</span>
                        <span className="font-mono text-green-400">{(inputError / outputError).toFixed(1)}×</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Success Rate:</span>
                        <span className="font-mono text-yellow-400">{(successRate * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="bg-pink-500/10 border border-pink-500/30 p-4 rounded-lg">
                      <p className="text-sm text-pink-200">
                        <strong className="text-white">Reality Check:</strong> Current quantum computers have error rates around 0.1-1%, which is barely below the threshold for 15-to-1 to work. This is why magic state distillation is a major challenge in fault-tolerant quantum computing!
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
