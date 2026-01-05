/**
 * Design Philosophy: Holographic Interface with Depth
 * - Interactive circuit visualization
 * - Step-by-step animation controls
 * - Real-time parameter adjustment
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Play, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function BellStateDistillation() {
  const [step, setStep] = useState(0);
  const [noise, setNoise] = useState([5]);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    { title: "Prepare Input Pairs", desc: "Two noisy Bell pairs |Φ⁺⟩ with fidelity F" },
    { title: "Apply CNOT Gates", desc: "Create correlations between pairs" },
    { title: "Measure Syndromes", desc: "Measure qubits 1 and 3 in X-basis" },
    { title: "Post-Selection", desc: "Keep only results where both syndromes = 0" },
    { title: "Output State", desc: "High-fidelity Bell pair with improved F" }
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="font-display text-xl font-bold text-white">
                Bell-State Distillation
              </span>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Circuit Visualization */}
          <div>
            <Card className="glass p-8 border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">BBPSSW Protocol Circuit</h2>
              
              {/* Circuit SVG */}
              <div className="bg-black/30 rounded-lg p-8 mb-6">
                <svg viewBox="0 0 600 300" className="w-full h-auto">
                  {/* Qubit lines */}
                  <line x1="50" y1="60" x2="550" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <line x1="50" y1="120" x2="550" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <line x1="50" y1="180" x2="550" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <line x1="50" y1="240" x2="550" y2="240" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  
                  {/* Labels */}
                  <text x="20" y="65" fill="rgba(255,255,255,0.8)" fontSize="14" fontFamily="monospace">q₀</text>
                  <text x="20" y="125" fill="rgba(255,255,255,0.8)" fontSize="14" fontFamily="monospace">q₁</text>
                  <text x="20" y="185" fill="rgba(255,255,255,0.8)" fontSize="14" fontFamily="monospace">q₂</text>
                  <text x="20" y="245" fill="rgba(255,255,255,0.8)" fontSize="14" fontFamily="monospace">q₃</text>
                  
                  {/* Step 0: Initial states */}
                  {step >= 0 && (
                    <>
                      <rect x="80" y="40" width="60" height="40" fill="rgba(147, 51, 234, 0.3)" stroke="rgba(147, 51, 234, 0.8)" strokeWidth="2" rx="4" className="animate-pulse" />
                      <text x="110" y="65" fill="white" fontSize="14" textAnchor="middle" fontFamily="monospace">|Φ⁺⟩</text>
                      
                      <rect x="80" y="160" width="60" height="40" fill="rgba(147, 51, 234, 0.3)" stroke="rgba(147, 51, 234, 0.8)" strokeWidth="2" rx="4" className="animate-pulse" />
                      <text x="110" y="185" fill="white" fontSize="14" textAnchor="middle" fontFamily="monospace">|Φ⁺⟩</text>
                    </>
                  )}
                  
                  {/* Step 1: CNOT gates */}
                  {step >= 1 && (
                    <>
                      {/* CNOT 0->1 */}
                      <circle cx="220" cy="60" r="8" fill="rgba(59, 130, 246, 0.8)" stroke="white" strokeWidth="2" />
                      <line x1="220" y1="60" x2="220" y2="120" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" />
                      <circle cx="220" cy="120" r="15" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" />
                      <line x1="220" y1="105" x2="220" y2="135" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" />
                      <line x1="205" y1="120" x2="235" y2="120" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" />
                      
                      {/* CNOT 2->3 */}
                      <circle cx="220" cy="180" r="8" fill="rgba(59, 130, 246, 0.8)" stroke="white" strokeWidth="2" />
                      <line x1="220" y1="180" x2="220" y2="240" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" />
                      <circle cx="220" cy="240" r="15" fill="none" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" />
                      <line x1="220" y1="225" x2="220" y2="255" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" />
                      <line x1="205" y1="240" x2="235" y2="240" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="3" />
                    </>
                  )}
                  
                  {/* Step 2: Bilateral CNOT */}
                  {step >= 2 && (
                    <>
                      <circle cx="340" cy="60" r="8" fill="rgba(236, 72, 153, 0.8)" stroke="white" strokeWidth="2" />
                      <line x1="340" y1="60" x2="340" y2="180" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="3" />
                      <circle cx="340" cy="180" r="15" fill="none" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="3" />
                      <line x1="340" y1="165" x2="340" y2="195" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="3" />
                      <line x1="325" y1="180" x2="355" y2="180" stroke="rgba(236, 72, 153, 0.8)" strokeWidth="3" />
                    </>
                  )}
                  
                  {/* Step 3: Measurements */}
                  {step >= 3 && (
                    <>
                      <rect x="440" y="100" width="50" height="40" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.8)" strokeWidth="2" rx="4" />
                      <text x="465" y="125" fill="white" fontSize="16" textAnchor="middle">M</text>
                      
                      <rect x="440" y="220" width="50" height="40" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.8)" strokeWidth="2" rx="4" />
                      <text x="465" y="245" fill="white" fontSize="16" textAnchor="middle">M</text>
                    </>
                  )}
                  
                  {/* Step 4: Output */}
                  {step >= 4 && (
                    <>
                      <rect x="480" y="40" width="60" height="40" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.8)" strokeWidth="2" rx="4" className="glow" />
                      <text x="510" y="65" fill="white" fontSize="14" textAnchor="middle" fontFamily="monospace">|Φ⁺⟩</text>
                      <text x="510" y="30" fill="rgba(34, 197, 94, 1)" fontSize="12" textAnchor="middle">High F</text>
                    </>
                  )}
                </svg>
              </div>

              {/* Controls */}
              <div className="flex gap-4 mb-6">
                <Button 
                  onClick={handlePlay} 
                  disabled={isPlaying || step >= steps.length - 1}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Play className="mr-2 w-4 h-4" />
                  {isPlaying ? "Playing..." : "Play Animation"}
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 border-purple-500/50 text-purple-200 hover:bg-purple-500/20"
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
                        ? 'glass border border-purple-500/50 glow' 
                        : i < step 
                          ? 'bg-purple-500/10 border border-purple-500/20'
                          : 'bg-black/20 border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm ${
                        i === step ? 'bg-purple-500 text-white' : i < step ? 'bg-purple-500/50 text-white' : 'bg-white/10 text-white/50'
                      }`}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{s.title}</div>
                        <div className="text-sm text-purple-200">{s.desc}</div>
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
            <Card className="glass p-8 border-blue-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
              <div className="space-y-4 text-purple-100">
                <p>
                  The BBPSSW protocol purifies noisy Bell pairs through a clever combination of local operations and post-selection.
                </p>
                <p>
                  <strong className="text-white">Key Idea:</strong> Use two noisy Bell pairs to create one high-fidelity pair. The CNOT gates create correlations that allow errors to be detected through syndrome measurements.
                </p>
                <p>
                  <strong className="text-white">Error Suppression:</strong> If input fidelity is F, output fidelity becomes approximately:
                </p>
                <div className="bg-black/30 p-4 rounded-lg font-mono text-sm">
                  F_out ≈ F² + (1-F)²
                </div>
                <p>
                  This is <strong className="text-white">quadratic suppression</strong> - errors are reduced much faster than the input error rate.
                </p>
                <p>
                  <strong className="text-white">Success Rate:</strong> The protocol succeeds with probability ~50% in the ideal case, as we post-select on specific measurement outcomes.
                </p>
              </div>
            </Card>

            {/* Parameters */}
            <Card className="glass p-8 border-pink-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">Noise Parameters</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-purple-200">Input Noise Level</label>
                    <span className="font-mono text-white">{noise[0]}%</span>
                  </div>
                  <Slider 
                    value={noise}
                    onValueChange={setNoise}
                    min={0}
                    max={20}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-sm text-purple-300">
                    Simulates depolarizing noise on input Bell pairs
                  </p>
                </div>

                <div className="bg-black/30 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-purple-200">Input Fidelity:</span>
                    <span className="font-mono text-white">{(1 - noise[0]/100).toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Expected Output Fidelity:</span>
                    <span className="font-mono text-green-400">
                      {(Math.pow(1 - noise[0]/100, 2) + Math.pow(noise[0]/100, 2)).toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Improvement:</span>
                    <span className="font-mono text-green-400">
                      {((Math.pow(1 - noise[0]/100, 2) + Math.pow(noise[0]/100, 2)) - (1 - noise[0]/100)).toFixed(3)}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <p className="text-sm text-purple-200">
                    <strong className="text-white">Note:</strong> Distillation only improves fidelity when F &gt; 0.5. Below this threshold, the protocol makes things worse!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
