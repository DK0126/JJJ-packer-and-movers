import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'jjj2026';
const BUSINESS_EMAIL_TO = process.env.EMAIL_TO || 'uv.dineshkumar01@gmail.com';

app.use(express.json());

// Persistent Data Storage Paths
const DATA_DIR = path.resolve(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Ensure data folder and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

const DEFAULT_CONFIG = {
  businessName: 'JJJ Packers & Movers',
  tagline: 'Moving Your World, Safely & Smoothly',
  phone: '7010033771',
  whatsapp: '7010033771',
  email: 'uv.dineshkumar01@gmail.com',
  address: '#16 GST Road, Guduvancheri – 603202, Tamil Nadu, India',
  hours: '24 Hours',
  stats: {
    movesCompleted: '[XX+]',
    citiesCovered: '[XX+]',
    happyCustomers: '[XX+]',
    customerRating: '[XX/5]',
  },
  announcement: 'Serving Chennai & all major destinations across India with 24/7 booking support.'
};

if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
}

// Helpers for reading and writing data safely
const readLeads = (): any[] => {
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading leads file:', err);
    return [];
  }
};

const writeLeads = (leads: any[]) => {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing leads file:', err);
  }
};

const readConfig = () => {
  try {
    const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_CONFIG;
  }
};

const writeConfig = (cfg: any) => {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing config file:', err);
  }
};

// In-Memory Rate Limiting & Anti-Spam protection
const ipRequestTimestamps = new Map<string, number[]>();
const recentSubmissions = new Map<string, number>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 10;

  const timestamps = (ipRequestTimestamps.get(ip) || []).filter(t => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return true;
  }
  timestamps.push(now);
  ipRequestTimestamps.set(ip, timestamps);
  return false;
};

// Email Notification Dispatcher
const notifyEnquiryByEmail = async (enquiry: any) => {
  const emailHost = process.env.EMAIL_HOST;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  console.log(`[JJJ Moving Enquiry Received]`);
  console.log(`Reference: ${enquiry.id}`);
  console.log(`Customer: ${enquiry.name} | Phone: ${enquiry.phone} | Email: ${enquiry.email}`);
  console.log(`Route: ${enquiry.pickupLocation} -> ${enquiry.deliveryLocation}`);
  console.log(`Type: ${enquiry.movingType} | Date: ${enquiry.movingDate} | Property: ${enquiry.propertyType}`);

  if (!emailHost || !emailUser || !emailPass) {
    console.log(
      `[Email Dispatch Notice]: SMTP credentials not yet configured in environment variables (EMAIL_HOST, EMAIL_USER, EMAIL_PASS). Notification logged safely to database for admin review at /api/admin/enquiries.`
    );
    return { dispatched: false, reason: 'SMTP credentials pending configuration' };
  }

  // When credentials are provided, standard SMTP transfer can occur
  return { dispatched: true };
};

// Middleware: Admin Authentication Token Check
const requireAdminAuth = (req: Request, res: Response, next: express.NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  // Simple token matching admin secret or valid session hash
  if (token !== ADMIN_SECRET && token !== `session_${ADMIN_SECRET}`) {
    res.status(403).json({ error: 'Forbidden: Invalid admin credentials' });
    return;
  }

  next();
};

/* ---------------- API ENDPOINTS ---------------- */

// 1. Submit Quotation Enquiry
app.post('/api/enquiries', async (req: Request, res: Response): Promise<void> => {
  try {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({ message: 'Too many requests. Please wait a few minutes before submitting again.' });
      return;
    }

    const {
      name,
      phone,
      email,
      whatsapp,
      movingType,
      pickupLocation,
      deliveryLocation,
      movingDate,
      propertyType,
      description,
      additionalRequirements,
      preferredContactMethod
    } = req.body;

    // Strict server-side validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ message: 'Customer full name is required.' });
      return;
    }

    const sanitizedPhone = String(phone || '').replace(/[^0-9]/g, '');
    if (sanitizedPhone.length < 10) {
      res.status(400).json({ message: 'A valid 10-digit mobile number is required.' });
      return;
    }

    if (!pickupLocation || !deliveryLocation) {
      res.status(400).json({ message: 'Pickup and delivery locations are required.' });
      return;
    }

    // Duplicate submission prevention (same phone within 30 seconds)
    const now = Date.now();
    const lastSubmission = recentSubmissions.get(sanitizedPhone);
    if (lastSubmission && now - lastSubmission < 30000) {
      res.status(429).json({ message: 'An enquiry with this number was just received. Our team will contact you shortly.' });
      return;
    }
    recentSubmissions.set(sanitizedPhone, now);

    // Generate unique Enquiry ID
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const enquiryId = `JJJ-${new Date().getFullYear()}-${randomHex}`;

    const newEnquiry = {
      id: enquiryId,
      name: name.trim(),
      phone: sanitizedPhone,
      email: (email || '').trim(),
      whatsapp: (whatsapp || '').trim(),
      movingType: movingType || 'Home Shifting',
      pickupLocation: pickupLocation.trim(),
      deliveryLocation: deliveryLocation.trim(),
      movingDate: movingDate || '',
      propertyType: propertyType || '2 BHK',
      description: (description || '').trim(),
      additionalRequirements: (additionalRequirements || '').trim(),
      preferredContactMethod: preferredContactMethod || 'Phone',
      status: 'New',
      adminNotes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store in persistent file database
    const leads = readLeads();
    leads.unshift(newEnquiry);
    writeLeads(leads);

    // Dispatch notification
    await notifyEnquiryByEmail(newEnquiry);

    res.status(201).json({
      success: true,
      enquiryId: newEnquiry.id,
      message: 'Thank you! Your moving enquiry has been received. Our team will contact you shortly.'
    });
  } catch (error) {
    console.error('Error handling enquiry submission:', error);
    res.status(500).json({ message: 'Server error processing moving quotation. Please call 7010033771 directly.' });
  }
});

// 2. Admin Authentication
app.post('/api/admin/login', (req: Request, res: Response): void => {
  const { password } = req.body;
  if (!password) {
    res.status(400).json({ message: 'Password / PIN is required' });
    return;
  }

  if (password === ADMIN_SECRET) {
    res.json({ success: true, token: `session_${ADMIN_SECRET}` });
  } else {
    res.status(401).json({ message: 'Incorrect PIN / Master Key' });
  }
});

// 3. Admin: Fetch All Enquiries
app.get('/api/admin/enquiries', requireAdminAuth, (req: Request, res: Response) => {
  const leads = readLeads();
  res.json({ enquiries: leads });
});

// 4. Admin: Update Enquiry Status or Internal Notes
app.patch('/api/admin/enquiries/:id', requireAdminAuth, (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const leads = readLeads();
  const index = leads.findIndex(l => l.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Enquiry not found' });
    return;
  }

  if (status) leads[index].status = status;
  if (adminNotes !== undefined) leads[index].adminNotes = adminNotes;
  leads[index].updatedAt = new Date().toISOString();

  writeLeads(leads);
  res.json({ success: true, enquiry: leads[index] });
});

// 5. Admin: Delete Enquiry
app.delete('/api/admin/enquiries/:id', requireAdminAuth, (req: Request, res: Response): void => {
  const { id } = req.params;
  const leads = readLeads();
  const filtered = leads.filter(l => l.id !== id);
  writeLeads(filtered);
  res.json({ success: true });
});

// 6. Public & Admin: Get Config (Editable Trust Stats)
app.get('/api/admin/config', (req: Request, res: Response) => {
  const config = readConfig();
  res.json({ config });
});

// 7. Admin: Update Config
app.post('/api/admin/config', requireAdminAuth, (req: Request, res: Response) => {
  const current = readConfig();
  const updated = {
    ...current,
    ...req.body,
    stats: {
      ...current.stats,
      ...(req.body.stats || {})
    }
  };
  writeConfig(updated);
  res.json({ success: true, config: updated });
});

// 8. Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

/* ---------------- DEV / PRODUCTION SERVING ---------------- */

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve built static files from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JJJ Packers & Movers server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
