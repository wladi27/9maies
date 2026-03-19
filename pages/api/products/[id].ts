import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise
    const db = client.db("9m-ai-store")
    const collection = db.collection('products')
    const { id } = req.query

    if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    const query = { _id: new ObjectId(id) }

    switch (req.method) {
      case 'GET':
        try {
          const product = await collection.findOne(query)
          if (!product) {
            return res.status(404).json({ error: 'Product not found' })
          }
          res.status(200).json(product)
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch product' })
        }
        break
      case 'POST':
        // support HTML forms that POST with _method=DELETE or _method=PUT
        try {
          const body = req.body || {}
          if (body._method === 'DELETE') {
            const result = await collection.deleteOne(query)
            if (result.deletedCount === 0) {
              return res.status(404).json({ error: 'Product not found' })
            }
            return res.status(200).json({ message: 'Product deleted successfully' })
          }

          if (body._method === 'PUT') {
            const updatedProduct = { ...body }
            delete updatedProduct._method
            delete updatedProduct._id
            const result = await collection.updateOne(query, { $set: updatedProduct })
            if (result.matchedCount === 0) {
              return res.status(404).json({ error: 'Product not found' })
            }
            return res.status(200).json({ message: 'Product updated successfully' })
          }

          res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST'])
          return res.status(405).end(`Method ${req.method} Not Allowed`)
        } catch (error) {
          res.status(500).json({ error: 'Failed to process form method override' })
        }
        break
      case 'PUT':
        try {
          const updatedProduct = req.body
          if (!updatedProduct || typeof updatedProduct !== 'object') {
            return res.status(400).json({ error: 'Invalid product data' });
          }
          delete updatedProduct._id // Ensure the _id is not updated
          const result = await collection.updateOne(query, { $set: updatedProduct })
          if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Product not found' })
          }
          res.status(200).json({ message: 'Product updated successfully' })
        } catch (error) {
          res.status(500).json({ error: 'Failed to update product' })
        }
        break
      case 'DELETE':
        try {
          const result = await collection.deleteOne(query)
          if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found' })
          }
          res.status(200).json({ message: 'Product deleted successfully' })
        } catch (error) {
          res.status(500).json({ error: 'Failed to delete product' })
        }
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: 'Failed to connect to database' })
  }
}
