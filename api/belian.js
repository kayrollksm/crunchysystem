import express from 'express';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/belian', async (req, res) => {
  const { pendaftar_id, jumlah } = req.body;

  try {
    const { data, error } = await supabase
      .from('pembelian')
      .insert([{ pendaftar_id, jumlah }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Pembelian berjaya direkodkan', data });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Belian API running on port ${port}`);
});