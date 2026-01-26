import { connectRedis, getRedisClient, checkRedisHealth, disconnectRedis } from '../src/config/redis';

describe('Redis Infrastructure Tests', () => {
  describe('Unit: Redis Connection', () => {
    afterAll(async () => {
      await disconnectRedis();
    });

    it('should establish Redis connection successfully', async () => {
      const client = await connectRedis();
      expect(client).not.toBeNull();
    });

    it('should return Redis client instance', () => {
      const client = getRedisClient();
      expect(client).not.toBeNull();
    });

    it('should pass health check when Redis is connected', async () => {
      const isHealthy = await checkRedisHealth();
      expect(isHealthy).toBe(true);
    });

    it('should perform basic Redis operations', async () => {
      const client = getRedisClient();
      expect(client).not.toBeNull();

      if (client) {
        // Test SET operation
        await client.set('test:key', 'test-value');
        
        // Test GET operation
        const value = await client.get('test:key');
        expect(value).toBe('test-value');
        
        // Test DEL operation
        await client.del('test:key');
        const deletedValue = await client.get('test:key');
        expect(deletedValue).toBeNull();
      }
    });

    it('should handle PING command', async () => {
      const client = getRedisClient();
      expect(client).not.toBeNull();

      if (client) {
        const response = await client.ping();
        expect(response).toBe('PONG');
      }
    });
  });

  describe('Unit: Error Handling', () => {
    it('should return false for health check when Redis is disconnected', async () => {
      await disconnectRedis();
      const isHealthy = await checkRedisHealth();
      expect(isHealthy).toBe(false);
    });

    it('should return null client after disconnection', async () => {
      await disconnectRedis();
      const client = getRedisClient();
      expect(client).toBeNull();
    });
  });
});
