import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { DB_BASE64 } from './dbSeed';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaClient(): PrismaClient {
  let dbUrl = process.env.DATABASE_URL;

  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const tmpDbPath = '/tmp/dev.db';
    try {
      if (!fs.existsSync(tmpDbPath) || fs.statSync(tmpDbPath).size === 0) {
        const buffer = Buffer.from(DB_BASE64, 'base64');
        fs.writeFileSync(tmpDbPath, buffer);
      }
    } catch (e) {
      console.error('Failed to initialize /tmp/dev.db:', e);
    }
    dbUrl = `file:${tmpDbPath}`;
  }

  return new PrismaClient({
    datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
