// src/utils/excelParser.js
import * as XLSX from 'xlsx';

export const readFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Change to header: 1 for array of arrays
        callback(json);
    };
    reader.readAsArrayBuffer(file);
};
