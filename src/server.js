import connectDB from './configs/db-config.js';
import app from './index.js';

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB ❌', err);
    process.exit(1);
  });
