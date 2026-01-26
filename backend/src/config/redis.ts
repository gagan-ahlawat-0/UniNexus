import Redis from 'ioredis';
import { logger } from '../utils/logger';

let redisClient: Redis | null = null;

export const connectRedis = async (): Promise<Redis | null> => {
  try {
    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);
    const redisPassword = process.env.REDIS_PASSWORD;
    const redisDb = parseInt(process.env.REDIS_DB || '0', 10);

    logger.info('🔄 Connecting to Redis...');
    logger.info(`Redis configuration: ${redisHost}:${redisPort}, DB: ${redisDb}`);

    const redisOptions: any = {
      host: redisHost,
      port: redisPort,
      db: redisDb,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        logger.warn(`Redis connection attempt ${times}, retrying in ${delay}ms...`);
        return delay;
      },
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false,
    };

    // Only add password if it exists
    if (redisPassword) {
      redisOptions.password = redisPassword;
    }

    redisClient = new Redis(redisOptions);

    // Handle connection events
    redisClient.on('connect', () => {
      logger.info('✅ Redis client connected');
    });

    redisClient.on('ready', () => {
      logger.info('✅ Redis client ready');
    });

    redisClient.on('error', (error: Error) => {
      logger.error('❌ Redis connection error:', error);
    });

    redisClient.on('close', () => {
      logger.warn('⚠️ Redis connection closed');
    });

    redisClient.on('reconnecting', () => {
      logger.info('🔄 Redis client reconnecting...');
    });

    // Test the connection with a ping
    await redisClient.ping();
    logger.info('✅ Redis connection successful - PING responded');

    return redisClient;
  } catch (error) {
    logger.error('❌ Failed to connect to Redis:', error instanceof Error ? error.message : String(error));
    logger.warn('⚠️ Application will continue without caching');
    redisClient = null;
    return null;
  }
};

export const getRedisClient = (): Redis | null => {
  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    try {
      await redisClient.quit();
      redisClient = null;
      logger.info('✅ Redis connection closed gracefully');
    } catch (error) {
      logger.error('❌ Error closing Redis connection:', error instanceof Error ? error.message : String(error));
      redisClient = null;
    }
  }
};

export const checkRedisHealth = async (): Promise<boolean> => {
  if (!redisClient) {
    return false;
  }

  try {
    const response = await redisClient.ping();
    return response === 'PONG';
  } catch (error) {
    logger.error('❌ Redis health check failed:', error instanceof Error ? error.message : String(error));
    return false;
  }
};
