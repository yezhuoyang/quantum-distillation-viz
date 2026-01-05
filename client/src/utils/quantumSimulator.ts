/**
 * Frontend Quantum Simulator for 15-to-1 Reed-Muller Distillation
 * Implements noisy quantum simulation with state tomography in JavaScript
 */

// Complex number operations
class Complex {
  constructor(public real: number, public imag: number) {}

  add(other: Complex): Complex {
    return new Complex(this.real + other.real, this.imag + other.imag);
  }

  multiply(other: Complex): Complex {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    );
  }

  conjugate(): Complex {
    return new Complex(this.real, -this.imag);
  }

  magnitude(): number {
    return Math.sqrt(this.real * this.real + this.imag * this.imag);
  }

  static fromPolar(r: number, theta: number): Complex {
    return new Complex(r * Math.cos(theta), r * Math.sin(theta));
  }
}

// Quantum state representation (simplified for single qubit)
class QuantumState {
  // State vector: [alpha, beta] representing alpha|0⟩ + beta|1⟩
  constructor(public amplitudes: Complex[]) {}

  // Apply depolarizing noise
  applyDepolarizingNoise(errorRate: number): QuantumState {
    const p = errorRate;
    const rand = Math.random();
    
    if (rand < p / 3) {
      // Bit flip (X error)
      return new QuantumState([this.amplitudes[1], this.amplitudes[0]]);
    } else if (rand < 2 * p / 3) {
      // Phase flip (Z error)
      return new QuantumState([
        this.amplitudes[0],
        new Complex(-this.amplitudes[1].real, -this.amplitudes[1].imag)
      ]);
    } else if (rand < p) {
      // Y error (both)
      return new QuantumState([
        new Complex(this.amplitudes[1].imag, -this.amplitudes[1].real),
        new Complex(-this.amplitudes[0].imag, this.amplitudes[0].real)
      ]);
    }
    
    // No error
    return this;
  }

  // Measure in computational basis
  measure(): number {
    const prob0 = this.amplitudes[0].magnitude() ** 2;
    return Math.random() < prob0 ? 0 : 1;
  }

  // Measure in X basis
  measureX(): number {
    // Transform to X basis: H gate
    const h = 1 / Math.sqrt(2);
    const newAmps = [
      new Complex(
        h * (this.amplitudes[0].real + this.amplitudes[1].real),
        h * (this.amplitudes[0].imag + this.amplitudes[1].imag)
      ),
      new Complex(
        h * (this.amplitudes[0].real - this.amplitudes[1].real),
        h * (this.amplitudes[0].imag - this.amplitudes[1].imag)
      )
    ];
    const newState = new QuantumState(newAmps);
    return newState.measure();
  }

  // Measure in Y basis
  measureY(): number {
    // Transform to Y basis: S†H gate
    const h = 1 / Math.sqrt(2);
    // Apply S† (phase gate -i)
    const afterS = new QuantumState([
      this.amplitudes[0],
      new Complex(this.amplitudes[1].imag, -this.amplitudes[1].real)
    ]);
    // Apply H
    const newAmps = [
      new Complex(
        h * (afterS.amplitudes[0].real + afterS.amplitudes[1].real),
        h * (afterS.amplitudes[0].imag + afterS.amplitudes[1].imag)
      ),
      new Complex(
        h * (afterS.amplitudes[0].real - afterS.amplitudes[1].real),
        h * (afterS.amplitudes[0].imag - afterS.amplitudes[1].imag)
      )
    ];
    const newState = new QuantumState(newAmps);
    return newState.measure();
  }

  // Measure in Z basis (computational basis)
  measureZ(): number {
    return this.measure();
  }
}

// Create noisy |A_L⟩ state (approximation of magic state)
function createNoisyMagicState(errorRate: number): QuantumState {
  // Ideal |A_L⟩ = cos(π/8)|0⟩ + sin(π/8)|1⟩
  const theta = Math.PI / 8;
  const alpha = new Complex(Math.cos(theta), 0);
  const beta = new Complex(Math.sin(theta), 0);
  
  let state = new QuantumState([alpha, beta]);
  
  // Apply depolarizing noise
  state = state.applyDepolarizingNoise(errorRate);
  
  return state;
}

// Simplified 15-to-1 distillation simulation
export interface SimulationResult {
  fidelity: number;
  acceptanceRate: number;
  expectationValues: {
    x: number;
    y: number;
    z: number;
  };
  acceptedShots: {
    x: number;
    y: number;
    z: number;
  };
  totalShots: number;
  errorRate: number;
}

export async function runDistillationSimulation(
  shots: number,
  errorRate: number
): Promise<SimulationResult> {
  // For frontend simulation, we'll use a simplified model
  // that captures the essential physics without full 15-qubit simulation
  
  let acceptedCount = 0;
  let xMeasurements: number[] = [];
  let yMeasurements: number[] = [];
  let zMeasurements: number[] = [];

  // Acceptance probability for 15-to-1 protocol (approximate)
  // In reality, this depends on the stabilizer measurements
  const acceptanceProbability = Math.max(0.001, (1 - errorRate) ** 15);

  // Run simulation for each measurement basis
  for (let basis of ['X', 'Y', 'Z']) {
    let basisAccepted = 0;
    let basisMeasurements: number[] = [];

    for (let i = 0; i < shots; i++) {
      // Simulate 15-to-1 distillation with post-selection
      const accepted = Math.random() < acceptanceProbability;
      
      if (accepted) {
        // Create output state (better than input due to distillation)
        const outputErrorRate = Math.min(errorRate, 35 * errorRate ** 3);
        const outputState = createNoisyMagicState(outputErrorRate);
        
        // Measure in the specified basis
        let measurement: number;
        if (basis === 'X') {
          measurement = outputState.measureX();
        } else if (basis === 'Y') {
          measurement = outputState.measureY();
        } else {
          measurement = outputState.measureZ();
        }
        
        basisMeasurements.push(measurement === 0 ? 1 : -1);
        basisAccepted++;
      }
    }

    if (basis === 'X') {
      xMeasurements = basisMeasurements;
    } else if (basis === 'Y') {
      yMeasurements = basisMeasurements;
    } else {
      zMeasurements = basisMeasurements;
    }

    acceptedCount += basisAccepted;
  }

  // Calculate expectation values
  const avgX = xMeasurements.length > 0
    ? xMeasurements.reduce((a, b) => a + b, 0) / xMeasurements.length
    : 0;
  const avgY = yMeasurements.length > 0
    ? yMeasurements.reduce((a, b) => a + b, 0) / yMeasurements.length
    : 0;
  const avgZ = zMeasurements.length > 0
    ? zMeasurements.reduce((a, b) => a + b, 0) / zMeasurements.length
    : 0;

  // Calculate fidelity to ideal |T⟩ state
  // |T⟩ = (|0⟩ + e^(iπ/4)|1⟩)/√2
  // For |A_L⟩ (eigenstate of T), fidelity can be estimated from Pauli expectations
  const idealX = Math.cos(Math.PI / 8) * Math.sin(Math.PI / 8) * 2;
  const idealY = 0;
  const idealZ = Math.cos(Math.PI / 8) ** 2 - Math.sin(Math.PI / 8) ** 2;

  // Fidelity estimate (simplified)
  const fidelity = Math.max(0, Math.min(1,
    0.5 + 0.5 * (avgX * idealX + avgY * idealY + avgZ * idealZ)
  ));

  const acceptanceRate = acceptedCount / (shots * 3);

  return {
    fidelity,
    acceptanceRate,
    expectationValues: {
      x: avgX,
      y: avgY,
      z: avgZ
    },
    acceptedShots: {
      x: xMeasurements.length,
      y: yMeasurements.length,
      z: zMeasurements.length
    },
    totalShots: shots,
    errorRate
  };
}
