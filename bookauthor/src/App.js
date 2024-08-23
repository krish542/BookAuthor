import React from 'react';
import FileUpload from './components/fileupload';
import AuthorForm from './components/authorForm';

function App() {
    return (
        <div className="App">
            <h1>My Library</h1>
            <AuthorForm/>
            <FileUpload/>
        </div>
    );
}

export default App;
