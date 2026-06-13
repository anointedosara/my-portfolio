import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Whether a database is configured. When false the app falls back to the
 * built-in seed content so the site still renders without a database.
 */
export const hasDatabase = Boolean(MONGODB_URI && MONGODB_URI.trim().length > 0);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!hasDatabase) return null;
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string, { bufferCommands: false })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
