import { Controller, Post, Get, Query, Param, Res } from '@nestjs/common';
import { ExportService } from './export.service';
import { PrismaService } from '../prisma/prisma.service';
import type { Response } from 'express';

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

  @Get('download/:fileName')
  downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = `/app/exports/${fileName}`;
    return res.download(filePath);
  }
}
