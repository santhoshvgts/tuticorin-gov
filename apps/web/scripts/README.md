# Data Import Scripts

This directory contains scripts to import electoral roll data from Excel files into MongoDB.

## Available Scripts

### 1. Import AC 210 Data
Imports data from `2002 EROLL Detail AC 210 Part No 1.xlsx`

```bash
npm run import
```

### 2. Import AC212 and AC224 Data
Imports data from `AC212 AC224.xlsx` into two separate collections: `AC212` and `AC224`

```bash
npm run import:ac212-ac224
```

## Prerequisites

1. Make sure you have a `.env.local` file in the `apps/web` directory with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://your-connection-string
   ```

2. The Excel file should be placed at the correct path:
   - For AC212/AC224: `/Users/santhoshraja/Santhosh/Web Application/tuticorin-gov-app/AC212 AC224.xlsx`

## How It Works

### AC212 and AC224 Import (`import-ac212-ac224.ts`)

1. **Reads the Excel file** from the specified path
2. **Processes both sheets** (AC212 and AC224)
3. **Creates two separate MongoDB collections**:
   - `ac212s` collection for AC212 data
   - `ac224s` collection for AC224 data
4. **Transliterates Tamil names** to English for better searchability
5. **Batch inserts** 1000 records at a time for efficiency
6. **Creates indexes** on common query fields (name, relation name, age, gender, etc.)

### Data Fields

Each record contains:
- `acNo` - Assembly Constituency Number
- `partNo` - Part Number
- `slNoInPart` - Serial Number in Part
- `houseNo` - House Number
- `sectionNo` - Section Number
- `fmNameV2` - Voter Name (Tamil)
- `fmNameEn` - Voter Name (English transliteration)
- `rlnFmNmV2` - Relation Name (Tamil)
- `rlnFmNmEn` - Relation Name (English transliteration)
- `rlnType` - Relation Type (H/F/M/W/S/D/B/SI/O)
- `age` - Age
- `sex` - Gender (M/F/O)
- `idCardNo` - ID Card Number
- `psName` - Polling Station Name

## Troubleshooting

### File not found error
Make sure the Excel file exists at the specified path. Update the `filePath` variable in the script if needed.

### Connection error
Verify your `MONGODB_URI` in `.env.local` is correct and the MongoDB server is running.

### TypeScript errors
The scripts use TypeScript with `tsx`. Make sure all dependencies are installed:
```bash
npm install
```
