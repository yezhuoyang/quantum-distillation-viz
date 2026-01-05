/**
 * Design Philosophy: Holographic Interface with Depth
 * - Glassmorphism cards with frosted effects
 * - Purple gradient background with depth
 * - Holographic accents and glow effects
 * - Smooth spring animations
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Atom, Sparkles, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Atom className="w-8 h-8 text-purple-400" />
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quantum Distillation
              </span>
            </div>
            <div className="flex gap-4">
              <Link href="/bell-state">
                <Button variant="ghost" className="text-purple-200 hover:text-white hover:bg-white/10">
                  Bell State
                </Button>
              </Link>
              <Link href="/magic-state">
                <Button variant="ghost" className="text-purple-200 hover:text-white hover:bg-white/10">
                  Magic State
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent leading-tight">
            Interactive Quantum State Distillation
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-12 font-light">
            Explore and visualize quantum error correction protocols through interactive circuit diagrams and real-time simulations
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/bell-state">
              <Button size="lg" className="holographic text-white font-semibold px-8 py-6 text-lg hover:scale-105 transition-transform">
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Protocol Cards */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Bell State Card */}
          <Link href="/bell-state">
            <Card className="glass p-8 hover:scale-105 transition-all duration-300 cursor-pointer group border-purple-500/20 hover:border-purple-500/40">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                  <Sparkles className="w-8 h-8 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bell-State Distillation</h3>
                  <p className="text-purple-200 text-sm font-mono">BBPSSW Protocol</p>
                </div>
              </div>
              <p className="text-purple-100 mb-6">
                Purify noisy entangled pairs using local operations and measurements. Learn how the BBPSSW protocol achieves quadratic error suppression through clever post-selection.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm">2 Qubits</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm">50% Success</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm">Quadratic Suppression</span>
              </div>
            </Card>
          </Link>

          {/* Magic State Card */}
          <Link href="/magic-state">
            <Card className="glass p-8 hover:scale-105 transition-all duration-300 cursor-pointer group border-pink-500/20 hover:border-pink-500/40">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-pink-500/20 group-hover:bg-pink-500/30 transition-colors">
                  <Zap className="w-8 h-8 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Magic State Distillation</h3>
                  <p className="text-pink-200 text-sm font-mono">15-to-1 Protocol</p>
                </div>
              </div>
              <p className="text-pink-100 mb-6">
                Produce high-fidelity T-states using the [[15,1,3]] Reed-Muller code. Discover how transversal T gates enable cubic error suppression for universal quantum computing.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-200 text-sm">15 Qubits</span>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-200 text-sm">Variable Success</span>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-200 text-sm">Cubic Suppression</span>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Interactive Learning Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass p-6 border-blue-500/20">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Circuit Visualization</h3>
              <p className="text-purple-200">
                Step through quantum circuits gate-by-gate with animated state evolution
              </p>
            </Card>

            <Card className="glass p-6 border-purple-500/20">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Simulation</h3>
              <p className="text-purple-200">
                Adjust noise parameters and see immediate effects on output fidelity
              </p>
            </Card>

            <Card className="glass p-6 border-pink-500/20">
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Educational Content</h3>
              <p className="text-purple-200">
                Learn the theory behind each protocol with integrated explanations
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 glass border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-purple-300">
            <p className="font-mono text-sm">
              Educational tool for quantum error correction • Built for quantum computing students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
