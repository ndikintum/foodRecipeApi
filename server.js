const express = require('express');
const app = express();
const recipesRouter = require('./routes/recipes');

// Middleware
app.use(express.json());

// Routes
app.use('/recipes', recipesRouter);

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running here'); // Provide a simple response indicating that the server is running
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
