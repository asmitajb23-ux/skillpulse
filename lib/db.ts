import mongoose from "mongoose";

declare global {
  // Cached across Next.js hot reloads in development.
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;

  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI?: string;
      MONGODB_DB?: string;
    }
  }
}

export interface MongoDbConfig {
  uri: string;
  dbName?: string;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cache: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (process.env.NODE_ENV !== "production") {
  global.mongooseCache = cache;
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
 * Shared Mongoose connection for API routes and models.
 *
 * Uses a module-level cache so Next.js does not create a new
 * connection on every hot reload. Call this only when a route
 * needs the database — do not invoke it from the health check.
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

  cache.conn = await cache.promise;
  return cache.conn;
}
