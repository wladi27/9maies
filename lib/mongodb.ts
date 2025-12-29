// This approach is taken from the Next.js official documentation
// https://nextjs.org/docs/app/building-your-application/data-fetching/patterns/database-connections

import { MongoClient } from 'mongodb'

// Lazily create the client promise so builds don't crash when envs are missing.
const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient | undefined
let clientPromise: Promise<MongoClient>

if (uri && typeof uri === 'string' && uri.length > 0) {
  if (process.env.NODE_ENV === 'development') {
    // In development, use a global to preserve the connection across HMR.
    // @ts-ignore
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      // @ts-ignore
      global._mongoClientPromise = client.connect()
    }
    // @ts-ignore
    clientPromise = global._mongoClientPromise
  } else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
} else {
  // Provide a thenable that rejects only when awaited, avoiding build-time crashes.
  const thenable: any = {
    then: (_resolve: any, reject: any) => {
      reject(new Error('Invalid/Missing environment variable: "MONGODB_URI"'))
    },
  }
  clientPromise = thenable as Promise<MongoClient>
}

export default clientPromise
