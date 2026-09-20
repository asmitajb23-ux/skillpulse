import mongoose from "mongoose";

export interface MongoDbConfig {
  uri: string;
  dbName?: string;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache: MongooseCache = globalForMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (process.env.NODE_ENV !== "production") {
  globalForMongoose.mongooseCache = cache;
}

/**
 * Reads MongoDB settings from the environment.
 * Does not open a database connection.
 */
export function getMongoDbConfig(): MongoDbConfig {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI. Set it in .env.local (see .env.example).",
    );
  }

  const dbName = process.env.MONGODB_DB;

  return dbName ? { uri, dbName } : { uri };
}

/**
 * Shared Mongoose connection for future API routes and models.
 *
 * Cached on `globalThis` so Next.js hot reload does not open extra
 * connections in development. Call this only from routes that need
 * the database — do not invoke it from the health check or at import time.
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  const { uri, dbName } = getMongoDbConfig();

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      dbName,
      bufferCommands: false,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}
