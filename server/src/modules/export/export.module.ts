import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from '../../queue/export.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
