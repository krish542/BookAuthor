const { MongoClient } = require('mongodb');

// Function to validate data
function validateAuthorData(data) {
    // Simple validation example
    if (!data.authorId || typeof data.authorId !== 'string') {
        throw new Error('Invalid or missing authorId');
    }
    if (!data.authorName || typeof data.authorName !== 'string') {
        throw new Error('Invalid or missing authorName');
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        throw new Error('Invalid email format');
    }
    if (!data.dateOfBirth || isNaN(new Date(data.dateOfBirth).getTime())) {
        throw new Error('Invalid or missing dateOfBirth');
    }
    return true;
}

async function run() {
    const uri = 'mongodb+srv://202312099:<db_password>@cluster0.46sqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('myLib');
        const collection = database.collection('author');

        // Sample input data
        const inputData = {
            authorId: 'a4',
            authorName: 'Alice Brown',
            email: 'alice.brown@example.com',
            dateOfBirth: '1980-05-15T00:00:00.000Z'
        };

        // Validate the input data
        try {
            validateAuthorData(inputData);
        } catch (validationError) {
            console.error('Validation error:', validationError.message);
            return;
        }

        // Check if the author already exists
        const existingAuthor = await collection.findOne({ email: inputData.email });
        if (existingAuthor) {
            console.log('Author already exists:', existingAuthor);
            return;
        }

        // Insert new author if not exists
        const result = await collection.insertOne(inputData);
        console.log('Inserted document:', result.insertedId);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
