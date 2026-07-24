const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`🚀 Google OAuth Auth Server is running!`);
  console.log(`🔗 Local Base URL: http://localhost:${PORT}`);
  console.log(`==========================================`);
});
