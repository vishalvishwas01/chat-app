/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Worker } from 'bullmq';
import { redisConnection } from './redis.config';
import { PrismaClient } from '@prisma/client';
import * as mongoose from 'mongoose';
import * as fs from 'node:fs';

void mongoose.connect(process.env.MONGO_URI as string);
const prisma = new PrismaClient();

export const exportWorker = new Worker(
  'audit-export',
  async (job) => {
    if (job.name === 'import-chat-history') {
      const { filePath, userId } = job.data;

      console.log(`Processing import for user: ${userId}`);

      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const messages = JSON.parse(fileContent);

        const messageSchema = new mongoose.Schema(
          {
            sender: String,
            content: String,
            room: String,
          },
          { timestamps: true },
        );

        const MessageModel =
          mongoose.models.Message || mongoose.model('Message', messageSchema);

        for (const msg of messages) {
          await MessageModel.create({
            sender: msg.sender || userId,
            content: msg.content,
            room: msg.room || 'imported-room',
          });
        }

        await prisma.auditLog.create({
          data: {
            action: 'CHAT_IMPORTED',
            userId,
          },
        });

        console.log(`Import completed for user: ${userId}`);

        return { status: 'completed' };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        console.error('Import failed:', errorMessage);

        const audit = await prisma.auditLog.create({
          data: {
            action: 'IMPORT_FAILED',
            userId,
          },
        });

        await prisma.errorLog.create({
          data: {
            message: errorMessage,
            source: 'import-worker',
            auditLogId: audit.id,
          },
        });

        throw error;
      }
    }

    if (job.name === 'export-audit-logs') {
      const { userId, exportId } = job.data;

      await prisma.exportLog.update({
        where: { id: exportId },
        data: { status: 'processing' },
      });

      const logs = await prisma.auditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      const content = JSON.stringify(logs, null, 2);

      const fileName = `export-${userId}-${Date.now()}.json`;
      const filePath = `/app/exports/${fileName}`;

      fs.writeFileSync(filePath, content);

      await prisma.exportLog.update({
        where: { id: exportId },
        data: {
          status: 'completed',
          fileName,
        },
      });

      return { fileName };
    }
  },
  {
    connection: redisConnection,
  },
);
