/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Worker } from 'bullmq';
import { redisConnection } from './redis.config';
import { PrismaClient } from '@prisma/client';
import * as fs from 'node:fs';
import * as path from 'node:path';

const prisma = new PrismaClient();

export const exportWorker = new Worker(
  'audit-export',
  async (job) => {
    const { userId, exportId } = job.data;

    console.log(`Processing export for user: ${userId}`);

    try {
      await prisma.exportLog.update({
        where: { id: exportId },
        data: { status: 'processing' },
      });

      const logs = await prisma.auditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      const content = JSON.stringify(logs, null, 2);

      const dirPath = '/app/exports';
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const fileName = `export-${userId}-${Date.now()}.json`;
      const filePath = path.join(dirPath, fileName);

      fs.writeFileSync(filePath, content);

      console.log(`Export file created: ${fileName}`);

      await prisma.exportLog.update({
        where: { id: exportId },
        data: {
          status: 'completed',
          fileName,
        },
      });

      return { fileName };
    } catch (error) {
      console.error('Export failed:', error);

      await prisma.exportLog.update({
        where: { id: exportId },
        data: {
          status: 'failed',
        },
      });

      throw error;
    }
  },
  {
    connection: redisConnection,
  },
);
