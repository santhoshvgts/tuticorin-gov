import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

import connectDB from '../lib/mongodb.js';
import AC211 from '../lib/models/AC211.js';
import XLSX from 'xlsx';

async function checkData() {
  try {
    await connectDB();
    console.log('Connected to MongoDB\n');

    // Check first 5 records from database
    console.log('=== Sample records from AC211 collection ===');
    const dbRecords = await AC211.find().limit(5).lean();
    dbRecords.forEach((record: any, index: number) => {
      console.log(`\nRecord ${index + 1}:`);
      console.log(`  Name (Tamil): ${record.fmNameV2}`);
      console.log(`  Relation Name (Tamil): ${record.rlnFmNmV2}`);
      console.log(`  Relation Type: ${record.rlnType}`);
    });

    // Check Excel file
    console.log('\n\n=== Sample rows from Excel AC211withsex sheet ===');
    const filePath = '/Users/santhoshraja/Santhosh/Web Application/tuticorin-gov-app/EROLL 2002.xlsx';
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets['AC211withsex'];
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: false });

    console.log('Column headers:', Object.keys(data[0] as any));

    console.log('\nFirst 3 rows:');
    (data.slice(0, 3) as any[]).forEach((row: any, index: number) => {
      console.log(`\nRow ${index + 1}:`);
      console.log(`  FM_NAME_V2: ${row.FM_NAME_V2}`);
      console.log(`  RLN_FM_NM_V2: ${row.RLN_FM_NM_V2}`);
      console.log(`  RLN_TYPE: ${row.RLN_TYPE}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkData();
