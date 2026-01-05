import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable JSON parsing for API requests
  app.use(express.json());

  // API endpoint for running quantum simulation
  app.post("/api/simulate", async (req, res) => {
    try {
      const { shots = 10000, error_rate = 0.0 } = req.body;

      // Validate parameters
      if (typeof shots !== "number" || shots < 100 || shots > 100000) {
        return res.status(400).json({
          error: "Invalid shots parameter. Must be between 100 and 100000.",
        });
      }

      if (typeof error_rate !== "number" || error_rate < 0 || error_rate > 0.5) {
        return res.status(400).json({
          error: "Invalid error_rate parameter. Must be between 0 and 0.5.",
        });
      }

      // Run Python simulation script
      const pythonScript = process.env.NODE_ENV === "production"
        ? path.resolve(__dirname, "simulation.py")
        : path.resolve(__dirname, "..", "server", "simulation.py");
      const python = spawn("python3", [
        pythonScript,
        JSON.stringify({ shots, error_rate }),
      ]);

      let stdout = "";
      let stderr = "";

      python.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      python.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      python.on("close", (code) => {
        if (code !== 0) {
          console.error("Python script error:", stderr);
          return res.status(500).json({
            error: "Simulation failed",
            details: stderr,
          });
        }

        try {
          const result = JSON.parse(stdout);
          res.json(result);
        } catch (e) {
          console.error("Failed to parse simulation output:", stdout);
          res.status(500).json({
            error: "Failed to parse simulation output",
            details: stdout,
          });
        }
      });
    } catch (error) {
      console.error("Simulation endpoint error:", error);
      res.status(500).json({
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
