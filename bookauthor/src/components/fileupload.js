// src/components/FileUpload.js
import React, { useState } from 'react';
import { readFile } from '../components/utils/excelParcer';
import './fileupload.css';  // Import the CSS file


const FileUpload = () => {
    const [fileData, setFileData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            readFile(file, (data) => {
                setFileData(data);
            });
        }
    };

    const renderTable = (data) => {
        if (!data || data.length === 0) return null;

        const [header, ...rows] = data;
        return (
            <table>
                <thead>
                    <tr>
                        {header.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <h2>Upload XLSX File</h2>
            <input type="file" accept=".xlsx" onChange={handleFileUpload} />
            {fileData && (
                <div>
                    <h3>File Data:</h3>
                    {renderTable(fileData)}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
