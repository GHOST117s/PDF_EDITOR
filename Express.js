const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

// Proxy all requests to the Stirling PDF service
const apiProxy = createProxyMiddleware({
  target: 'https://stirling-pdf-backend.vercel.app', // You'll need to deploy the backend separately
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
});

app.use('/api', apiProxy);

// Serve static files
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});