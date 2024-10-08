import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    origin: '*', // Update this to your specific domain if needed
  });



// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  }
  
  export default async function corsMiddleware(req, res) {
    await runMiddleware(req, res, cors);
  }

  