
import app from '../app.js';
import MongoDBConnection from '../database/mongoDb.js';

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await MongoDBConnection(); 

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
