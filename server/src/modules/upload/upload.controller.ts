/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { File as MulterFile } from 'multer';
import { ExportService } from '../../queue/export.service';

const storage = multer.diskStorage({
  destination: '/app/imports',
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + file.originalname.replaceAll(' ', '_');
    cb(null, uniqueName);
  },
});

@Controller('upload')
export class UploadController {
  constructor(private readonly exportService: ExportService) {}

  @Post('chat')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  async uploadFile(@UploadedFile() file: MulterFile) {
    const userId = 'vishal';

    await this.exportService.addImportJob(String(file.path), userId);

    return {
      message: 'File uploaded and queued for processing',
      fileName: file.filename,
      path: file.path,
    };
  }
}
