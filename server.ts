import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Community Resources Mock Data
  const communityResources = [
    {
      id: 1,
      name: "Federal City Food Pantry",
      type: "Food",
      address: "123 Main St, Metro Center",
      hours: "Mon-Fri, 9am-4pm",
      description: "Providing fresh produce and non-perishables to community residents."
    },
    {
      id: 2,
      name: "Unity Health Clinic",
      type: "Healthcare",
      address: "456 Oak Lane, Central District",
      hours: "24/7 Urgent Care",
      description: "Low-cost healthcare services for uninsured families."
    },
    {
      id: 3,
      name: "National Legal Aid Society",
      type: "Legal",
      address: "789 Pine Rd, Downtown",
      hours: "Tue, Thu 10am-2pm",
      description: "Free legal consultations for housing disputes and social security appeals."
    },
    {
      id: 4,
      name: "Safe Harbor Shelter",
      type: "Housing",
      address: "101 Maple Way, North Side",
      hours: "Intake 6pm-9pm daily",
      description: "Emergency overnight shelter for individuals and families."
    }
  ];

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", version: "1.0.0" });
  });

  app.get("/api/resources", (req, res) => {
    const { query } = req.query;
    console.log("Resource search query:", query);
    if (query) {
      const filtered = communityResources.filter(r => 
        r.name.toLowerCase().includes(String(query).toLowerCase()) ||
        r.type.toLowerCase().includes(String(query).toLowerCase()) ||
        r.description.toLowerCase().includes(String(query).toLowerCase())
      );
      return res.json(filtered);
    }
    res.json(communityResources);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
