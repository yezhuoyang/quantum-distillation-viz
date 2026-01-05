# Quantum State Distillation - Interactive Visualizer

An interactive web application for visualizing and learning about Bell-state and Magic State Distillation protocols in quantum computing.

## 🌟 Features

- **Holographic UI Design** with glassmorphism effects and purple gradient theme
- **Interactive Circuit Diagrams** with step-by-step animations
- **Real-time Parameter Controls** to adjust noise levels
- **Theoretical Calculations** showing error suppression formulas
- **Educational Content** integrated with visualizations

## 🚀 Live Demo

Visit the live application: [Quantum Distillation Visualizer](https://quantum-distillation-viz.vercel.app)

## 📚 Protocols Covered

### Bell-State Distillation (BBPSSW)
- Purifies noisy entangled Bell pairs
- Quadratic error suppression (ε → ε²)
- 50% success rate in ideal case
- Interactive 4-qubit circuit visualization

### Magic State Distillation
- **Simplified 3-to-1**: Educational version for learning
- **Full 15-to-1**: Based on [[15,1,3]] Reed-Muller code
- Cubic error suppression (ε → 35ε³)
- Explains transversal T gates

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Tailwind CSS 4** - Styling with custom theme
- **Vite** - Build tool
- **shadcn/ui** - Component library
- **Wouter** - Client-side routing
- **Framer Motion** - Animations

## 💻 Local Development

### Prerequisites
- Node.js 22+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yezhuoyang/quantum-distillation-viz.git
cd quantum-distillation-viz

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

## 📖 Usage

### For Students

1. **Explore the Home Page** to understand both protocols
2. **Navigate to Bell State** page for BBPSSW protocol
   - Click "Play Animation" to see step-by-step execution
   - Adjust noise slider to see effects on fidelity
3. **Navigate to Magic State** page for 15-to-1 protocol
   - Switch between simplified and full protocol tabs
   - Understand the theoretical performance

### For Educators

Use this tool to:
- Introduce quantum error correction concepts
- Visualize circuit execution before coding
- Demonstrate the threshold question for distillation
- Supplement homework assignments

## 🎓 Educational Context

This visualizer is part of a comprehensive quantum computing course module on state distillation. It complements:

- **Theoretical Explanations** (`distillation_explanation.md`)
- **Python Implementations** (Qiskit code examples)
- **Homework Assignments** (hands-on exercises)
- **State Tomography** (verification methods)

Full course materials: [quantum-distillation-homework](https://github.com/yezhuoyang/quantum-distillation-homework)

## 🎨 Design Philosophy

The interface uses a **holographic aesthetic** inspired by quantum computing's futuristic nature:

- **Color Palette**: Purple gradients (#1A0B2E → #2D1B4E) with holographic accents
- **Typography**: Space Grotesk (display), Outfit (headings), DM Sans (body), JetBrains Mono (code)
- **Effects**: Glassmorphism, depth layers, glow effects, smooth animations
- **Layout**: Asymmetric with floating elements and parallax backgrounds

## 📁 Project Structure

```
client/
  src/
    pages/
      Home.tsx                    # Landing page
      BellStateDistillation.tsx   # BBPSSW protocol
      MagicStateDistillation.tsx  # 15-to-1 protocol
    components/
      ui/                         # shadcn/ui components
    index.css                     # Global styles & theme
    App.tsx                       # Routes
server/
  index.ts                        # Static file server
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### GitHub Pages

```bash
# Build
pnpm build

# Deploy to gh-pages branch
# (configure in repository settings)
```

### Netlify

```bash
# Build command: pnpm build
# Publish directory: dist/public
```

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- Add more protocols (7-to-1, cascaded distillation)
- Implement Bloch sphere visualizations
- Add backend simulation integration
- Create interactive quizzes
- Improve mobile responsiveness

## 📄 License

MIT License - Free for educational use

## 🙏 Acknowledgments

- Based on research by Bravyi, Kitaev, Bennett, and others
- Built with modern web technologies
- Designed for quantum computing education

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the [main course repository](https://github.com/yezhuoyang/quantum-distillation-homework)

---

**Built with ❤️ for quantum computing education**
