import { Injectable } from '@nestjs/common';
import { exportQueue } from './export.queue';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExportService {
  constructor(private readonly prisma: PrismaService) {}

  async addExportJob(userId: string) {
    const record = await this.prisma.exportLog.create({
      data: {
        userId,
        status: 'pending',
      },
    });

    await exportQueue.add('export-audit-logs', {
      userId,
      exportId: record.id,
    });

    return record;
  }

  async addImportJob(filePath: string, userId: string) {
    return exportQueue.add('import-chat-history', {
      filePath,
      userId,
    });
  }
}
