import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { shots = 2000, error_rate = 0.0 } = req.body;

    // Validate parameters
    if (typeof shots !== 'number' || shots < 100 || shots > 100000) {
      return res.status(400).json({
        error: 'Invalid shots parameter. Must be between 100 and 100000.',
      });
    }

    if (typeof error_rate !== 'number' || error_rate < 0 || error_rate > 0.5) {
      return res.status(400).json({
        error: 'Invalid error_rate parameter. Must be between 0 and 0.5.',
      });
    }

    // Find Python simulation script
    // In Vercel, the script should be in the function directory
    const pythonScript = path.resolve(__dirname, '..', 'server', 'simulation.py');
    
    // Run Python simulation script
    const python = spawn('python3', [
      pythonScript,
      JSON.stringify({ shots, error_rate }),
    ]);

    let stdout = '';
    let stderr = '';

    python.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    python.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    // Wait for Python process to complete
    await new Promise((resolve, reject) => {
      python.on('close', (code) => {
        if (code !== 0) {
          console.error('Python script error:', stderr);
          reject(new Error(`Simulation failed with code ${code}: ${stderr}`));
        } else {
          resolve();
        }
      });

      python.on('error', (err) => {
        reject(err);
      });
    });

    // Parse and return result
    try {
      const result = JSON.parse(stdout);
      return res.status(200).json(result);
    } catch (e) {
      console.error('Failed to parse simulation output:', stdout);
      return res.status(500).json({
        error: 'Failed to parse simulation output',
        details: stdout,
      });
    }
  } catch (error) {
    console.error('Simulation endpoint error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
