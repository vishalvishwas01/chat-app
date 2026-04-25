import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  // Log normal action
  async logAction(action: string, userId: string) {
    return this.prisma.auditLog.create({
      data: {
        action,
        userId,
      },
    });
  }

  // Log error (IMPORTANT)
  async logError(
    action: string,
    userId: string,
    errorMessage: string,
    source: string,
  ) {
    // first create audit log
    const audit = await this.prisma.auditLog.create({
      data: {
        action,
        userId,
      },
    });

    // then create error linked to audit
    await this.prisma.errorLog.create({
      data: {
        message: errorMessage,
        source,
        auditLogId: audit.id,
      },
    });

    return audit;
  }
}
