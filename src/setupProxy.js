const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/tables', '/reservations'], 
    createProxyMiddleware({
      target: 'http://localhost:8000', 
      changeOrigin: true,
      secure: false,
    })
  );
};
