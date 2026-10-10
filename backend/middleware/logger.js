/**
 * Simple Request Logger Middleware
 */
const logger = (req, res, next) => {
  const start = Date.now();
  const { method, url, ip } = req;

  // Listen for the finish event to log the response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    let color = '\x1b[0m'; // Default
    if (statusCode >= 500) color = '\x1b[31m'; // Red
    else if (statusCode >= 400) color = '\x1b[33m'; // Yellow
    else if (statusCode >= 300) color = '\x1b[36m'; // Cyan
    else if (statusCode >= 200) color = '\x1b[32m'; // Green

    console.log(
      `${color}[${method}]\x1b[0m ${url} ${color}${statusCode}\x1b[0m - ${duration}ms - ${ip}`
    );
  });

  next();
};

export default logger;
