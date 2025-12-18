import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise
    const db = client.db("9m-ai-store")
    const collection = db.collection('products')

    switch (req.method) {
      case 'GET':
        try {
          const products = await collection.find({}).toArray()
          res.status(200).json(products)
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch products' })
        }
        break
      case 'POST':
        try {
          const newProduct = req.body
          if (!newProduct || typeof newProduct !== 'object') {
            return res.status(400).json({ error: 'Invalid product data' });
          }
          const result = await collection.insertOne(newProduct)
          res.status(201).json(result)
        } catch (error) {
          res.status(500).json({ error: 'Failed to create product' })
        }
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: 'Failed to connect to database' })
  }
}
