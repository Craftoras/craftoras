const mongoose = require('mongoose');

let mongoServer;

module.exports.dbConnect = async () => {
    try {
        const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/ec';
        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 2000,
        });
        console.log("Database connected to MongoDB:", dbUrl);
    } catch (error) {
        console.log("Local MongoDB not reachable, starting embedded database...");
        try {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log("Database connected to embedded MongoDB successfully at:", uri);
        } catch (memErr) {
            console.error("Failed to initialize database:", memErr.message);
        }
    }
};
