// pages/api/hello.js
import corsMiddleware from '../../lib/middlewares/cors.middleware';

export default async function handler(req, res) {
  // Run the CORS middleware
  await corsMiddleware(req, res);

  // Continue with the rest of the API logic
  res.status(200).json({ message: 'Hello, world!' });
}