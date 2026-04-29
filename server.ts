import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from 'better-sqlite3';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Initialize Database
const db = new Database('leads.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    budget TEXT NOT NULL,
    property_type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_new BOOLEAN DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Seed data for properties if empty
  INSERT INTO properties (title, price, type, location, image_url)
  SELECT 'Premium 1BHK Flat', '12,500', '1BHK', 'Block B, New Ashok Nagar', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400'
  WHERE NOT EXISTS (SELECT 1 FROM properties);

  INSERT INTO properties (title, price, type, location, image_url)
  SELECT 'Spacious 1RK', '7,500', '1RK', 'New Ashok Nagar Metro', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400'
  WHERE NOT EXISTS (SELECT 1 FROM properties WHERE title = 'Spacious 1RK');

  INSERT INTO properties (title, price, type, location, image_url)
  SELECT 'Luxurious 2BHK', '18,500', '2BHK', 'Pocket D, New Ashok Nagar', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400'
  WHERE NOT EXISTS (SELECT 1 FROM properties WHERE title = 'Luxurious 2BHK');
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use('/uploads', express.static(uploadsDir));

  // --- Leads API ---
  app.post("/api/addLead", (req, res) => {
    const { name, phone, budget, propertyType } = req.body;
    try {
      const stmt = db.prepare('INSERT INTO leads (name, phone, budget, property_type) VALUES (?, ?, ?, ?)');
      const info = stmt.run(name, phone, budget, propertyType);
      res.json({ status: "success", id: info.lastInsertRowid });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.get("/api/getLeads", (req, res) => {
    try {
      const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
      res.json(leads.map((l: any) => ({
        id: l.id.toString(),
        name: l.name,
        phone: l.phone,
        budget: l.budget,
        propertyType: l.property_type,
        createdAt: l.created_at,
        isNew: !!l.is_new
      })));
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.delete("/api/deleteLead/:id", (req, res) => {
    try {
      const stmt = db.prepare('DELETE FROM leads WHERE id = ?');
      stmt.run(req.params.id);
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.post("/api/bulkDelete", (req, res) => {
    const { ids } = req.body;
    try {
      const stmt = db.prepare(`DELETE FROM leads WHERE id IN (${ids.map(() => '?').join(',')})`);
      stmt.run(...ids);
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // --- Properties API ---
  app.get("/api/getProperties", (req, res) => {
    try {
      const rows = db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all();
      res.json(rows.map((r: any) => ({
        id: r.id.toString(),
        title: r.title,
        price: r.price,
        type: r.type,
        location: r.location,
        imageUrl: r.image_url.startsWith('http') ? r.image_url : `/uploads/${r.image_url}`,
        createdAt: r.created_at
      })));
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.post("/api/addProperty", upload.single('image'), (req, res) => {
    const { title, price, type, location } = req.body;
    const imageUrl = req.file ? req.file.filename : '';
    try {
      const stmt = db.prepare('INSERT INTO properties (title, price, type, location, image_url) VALUES (?, ?, ?, ?, ?)');
      const info = stmt.run(title, price, type, location, imageUrl);
      res.json({ status: "success", id: info.lastInsertRowid });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.delete("/api/deleteProperty/:id", (req, res) => {
    try {
      const stmt = db.prepare('DELETE FROM properties WHERE id = ?');
      stmt.run(req.params.id);
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.put("/api/updateProperty/:id", upload.single('image'), (req, res) => {
    const { title, price, type, location, existingImage } = req.body;
    const imageUrl = req.file ? req.file.filename : existingImage;
    try {
      const stmt = db.prepare('UPDATE properties SET title = ?, price = ?, type = ?, location = ?, image_url = ? WHERE id = ?');
      stmt.run(title, price, type, location, imageUrl, req.params.id);
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Admin Login
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@newashoknagarrooms.in' && password === 'admin123') {
      res.json({ status: "success", token: "fake-jwt-token" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // --- Vite & Static Assets ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
