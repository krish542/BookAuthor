import { useState } from 'react';

const useFileReader = () => {
    const [fileContent, setFileContent] = useState(null);

    const readFile = (file, callback) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = event.target.result;
            setFileContent(binaryString);
            if (callback) {
                callback(binaryString);
            }
        };
        reader.readAsBinaryString(file);
    };

    return { fileContent, readFile };
};

export default useFileReader;
