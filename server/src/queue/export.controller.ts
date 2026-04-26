/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Get, Query } from '@nestjs/common';
import { ExportService } from './export.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('export')
export class ExportController {
  constructor(
    private readonly exportService: ExportService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async exportLogs(@Query('userId') userId: string) {
    return this.exportService.addExportJob(userId);
  }

  @Get()
  async getExports(@Query('userId') userId: string) {
    return this.prisma.exportLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
