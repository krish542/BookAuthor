// src/components/AuthorForm.js
import React, { useState } from 'react';

const AuthorForm = ({ onAuthorSubmit }) => {
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/authors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, dateOfBirth }),
            });

            if (response.ok) {
                // Call parent callback to indicate successful author submission
                onAuthorSubmit(email);
            } else {
                setError('Error submitting author information');
            }
        } catch (error) {
            setError('Error submitting author information');
        }
    };

    return (
        <div>
            <h2>Submit Author Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default AuthorForm;
