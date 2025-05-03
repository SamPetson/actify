const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  // Create a modules directory if it doesn't exist
  const modulesDir = path.join(__dirname, 'modules');
  if (!fs.existsSync(modulesDir)) {
    fs.mkdirSync(modulesDir);
  }

  // API endpoint to list modules
  app.get('/modules/list', (req, res) => {
    fs.readdir(modulesDir, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to scan modules directory' });
      }
      res.json(files.map(file => ({ name: file })));
    });
  });

  // API endpoint to get module content
  app.get('/modules/:moduleName', (req, res) => {
    const modulePath = path.join(modulesDir, req.params.moduleName);
    
    fs.readFile(modulePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(404).json({ error: 'Module not found' });
      }
      res.send(data);
    });
  });
};