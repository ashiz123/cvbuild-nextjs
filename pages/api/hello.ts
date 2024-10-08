import type { NextApiRequest, NextApiResponse } from 'next'
import corsMiddleware from '../../lib/middlewares/cors.middleware';
 
type ResponseData = {
  message: string
}
 
export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) 
{
  await corsMiddleware(req, res);
  res.status(200).json({ message: 'Hello from Next.js!' })
}