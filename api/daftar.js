import express from 'express';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/daftar', async (req, res) => {
  const { name, phone, email, referral } = req.body;

  try {
    const { data, error } = await supabase
      .from('pendaftar')
      .insert([{ name, phone, email, referral }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Pendaftaran berjaya', data });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});