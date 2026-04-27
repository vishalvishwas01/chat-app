/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
}
