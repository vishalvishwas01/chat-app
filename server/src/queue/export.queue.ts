import { Queue } from 'bullmq';
import { redisConnection } from './redis.config';

export const exportQueue = new Queue('audit-export', {
  connection: redisConnection,
});
