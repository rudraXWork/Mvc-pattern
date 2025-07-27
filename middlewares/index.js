const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {
        const log = `${Date.now()}: ${req.ip} ${req.method} ${req.path}\n`;
        fs.appendFile(filename, log, (err) => {
            if (err) console.error("Logging error:", err);
        });
        next(); // Ensure next() is called outside appendFile to avoid delay
    };
}

function homeMiddleware(req, res, next) {
    if (req.path === '/' && req.method === 'GET') {
      res.send('🏠 Welcome to the Home Page (from middleware)');
    } else {
      next();
    }
  }


        module.exports= {
            logReqRes,
            homeMiddleware,
        };