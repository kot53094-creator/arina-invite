import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleChoiceRequest } from '../server/lib/telegram.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const result = await handleChoiceRequest(req.body)
  res.setHeader('Access-Control-Allow-Origin', '*')
  return res.status(result.status).json(result.json)
}
