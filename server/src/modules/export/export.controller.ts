import { Controller, Post, Get, Param, Res } from '@nestjs/common';
import { ExportService } from '../../queue/export.service';
import { PrismaService } from '../../prisma/prisma.service';
import express from 'express';
import * as path from 'path';

@Controller('export')
export class ExportController {
  constructor(
    private exportService: ExportService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async createExport() {
    const userId = 'vishal'; // later from auth

    const record = await this.exportService.addExportJob(userId);

    return {
      message: 'Export started',
      exportId: record.id,
    };
  }

  @Get()
  async getExports() {
    return this.prisma.exportLog.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: express.Response) {
    const record = await this.prisma.exportLog.findUnique({
      where: { id: Number(id) },
    });

    if (!record || record.status !== 'completed' || !record.fileName) {
      return res.status(400).send('File not ready');
    }

    const filePath = path.join('/app/exports', record.fileName);

    return res.download(filePath);
  }
}
