import fc from 'fast-check';
import { CacheService } from '../src/services/cacheService';
import { connectRedis, getRedisClient, disconnectRedis } from '../src/config/redis';

describe('CacheService Tests', () => {
  let cacheService: CacheService;

  beforeAll(async () => {
    await connectRedis();
    const redisClient = getRedisClient();
    cacheService = new CacheService(redisClient);
  });

  afterAll(async () => {
    await disconnectRedis();
  });

  describe('Property 1: Cache-first data retrieval', () => {
    // Feature: uninexus-phase-2-infrastructure-and-pages, Property 1: Cache-first data retrieval
    it('should check cache before querying database, return cached data on hit, and cache on miss', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            category: fc.option(fc.constantFrom('sports', 'music', 'academic'), { nil: undefined }),
            search: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
          }),
          fc.array(fc.record({
            id: fc.integer({ min: 1, max: 1000 }),
            title: fc.string({ minLength: 1, maxLength: 50 }),
          }), { minLength: 0, maxLength: 10 }),
          async (filters, mockData) => {
            // Clean filters
            const cleanFilters = Object.fromEntries(
              Object.entries(filters).filter(([_, v]) => v !== undefined)
            );

            // Clear cache before test
            await cacheService.invalidateEvents();

            // First call - cache miss, should return null
            const cachedBeforeSet = await cacheService.getEvents(cleanFilters);
            expect(cachedBeforeSet).toBeNull();

            // Set cache with data
            await cacheService.setEvents(cleanFilters, mockData, 300);

            // Second call - cache hit, should return cached data
            const cachedAfterSet = await cacheService.getEvents(cleanFilters);
            expect(cachedAfterSet).toEqual(mockData);

            // Verify TTL is set (data should exist in cache)
            const redisClient = getRedisClient();
            if (redisClient) {
              const filterHash = cacheService.hashFilters(cleanFilters);
              const key = cacheService.generateKey('events', 'list', filterHash);
              const ttl = await redisClient.ttl(key);
              expect(ttl).toBeGreaterThan(0);
              expect(ttl).toBeLessThanOrEqual(300);
            }
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle cache miss gracefully and allow database query', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 20 }),
          async (userId) => {
            // Ensure cache is empty
            await cacheService.invalidateUserProfile(userId);

            // Cache miss should return null (allowing database query)
            const cached = await cacheService.getUserProfile(userId);
            expect(cached).toBeNull();
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Property 2: Cache invalidation on data modification', () => {
    // Feature: uninexus-phase-2-infrastructure-and-pages, Property 2: Cache invalidation on data modification
    it('should invalidate all related cache entries when data is modified', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(
            fc.record({
              category: fc.option(fc.constantFrom('sports', 'music', 'academic'), { nil: undefined }),
              search: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: undefined }),
            }),
            { minLength: 1, maxLength: 5 }
          ),
          async (filtersList) => {
            // Clean all filters
            const cleanFiltersList = filtersList.map(filters =>
              Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== undefined)
              )
            );

            // Set cache for multiple filter combinations
            for (const filters of cleanFiltersList) {
              await cacheService.setEvents(filters, [{ id: 1, title: 'Test Event' }], 300);
            }

            // Verify all are cached
            for (const filters of cleanFiltersList) {
              const cached = await cacheService.getEvents(filters);
              expect(cached).not.toBeNull();
            }

            // Invalidate all event caches
            await cacheService.invalidateEvents();

            // Verify all are invalidated
            for (const filters of cleanFiltersList) {
              const cached = await cacheService.getEvents(filters);
              expect(cached).toBeNull();
            }
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should invalidate specific user profile without affecting other caches', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 20 }),
          fc.string({ minLength: 1, maxLength: 20 }),
          async (userId1, userId2) => {
            // Ensure different user IDs
            fc.pre(userId1 !== userId2);

            const profile1 = { id: userId1, name: 'User 1' };
            const profile2 = { id: userId2, name: 'User 2' };

            // Cache both profiles
            await cacheService.setUserProfile(userId1, profile1);
            await cacheService.setUserProfile(userId2, profile2);

            // Invalidate only first profile
            await cacheService.invalidateUserProfile(userId1);

            // First should be invalidated
            expect(await cacheService.getUserProfile(userId1)).toBeNull();

            // Second should still be cached
            expect(await cacheService.getUserProfile(userId2)).toEqual(profile2);
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should invalidate clubs independently from events', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            category: fc.option(fc.string({ minLength: 1, maxLength: 10 }), { nil: undefined }),
          }),
          async (filters) => {
            const cleanFilters = Object.fromEntries(
              Object.entries(filters).filter(([_, v]) => v !== undefined)
            );

            // Cache both events and clubs
            await cacheService.setEvents(cleanFilters, [{ id: 1, title: 'Event' }]);
            await cacheService.setClubs(cleanFilters, [{ id: 1, name: 'Club' }]);

            // Invalidate only events
            await cacheService.invalidateEvents();

            // Events should be invalidated
            expect(await cacheService.getEvents(cleanFilters)).toBeNull();

            // Clubs should still be cached
            expect(await cacheService.getClubs(cleanFilters)).not.toBeNull();
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  describe('Property 3: Structured cache key format', () => {
    // Feature: uninexus-phase-2-infrastructure-and-pages, Property 3: Structured cache key format
    it('should generate cache keys following the pattern {resourceType}:{operation}:{identifier}', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('events', 'clubs', 'users', 'notifications', 'messages'),
          fc.constantFrom('list', 'detail', 'profile', 'conversation'),
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes(':')),
          (resourceType, operation, identifier) => {
            const key = cacheService.generateKey(resourceType, operation, identifier);
            
            // Key should follow the pattern resourceType:operation:identifier
            const parts = key.split(':');
            expect(parts).toHaveLength(3);
            expect(parts[0]).toBe(resourceType);
            expect(parts[1]).toBe(operation);
            expect(parts[2]).toBe(identifier);
            
            // Key should be a string
            expect(typeof key).toBe('string');
            
            // Key should start with resourceType:operation:
            expect(key).toMatch(new RegExp(`^${resourceType}:${operation}:`));
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should generate consistent hash for identical filter objects', () => {
      fc.assert(
        fc.property(
          fc.record({
            category: fc.option(fc.string(), { nil: undefined }),
            search: fc.option(fc.string(), { nil: undefined }),
            date: fc.option(fc.string(), { nil: undefined }),
          }),
          (filters) => {
            // Remove undefined values
            const cleanFilters = Object.fromEntries(
              Object.entries(filters).filter(([_, v]) => v !== undefined)
            );
            
            const hash1 = cacheService.hashFilters(cleanFilters);
            const hash2 = cacheService.hashFilters(cleanFilters);
            
            // Same filters should produce same hash
            expect(hash1).toBe(hash2);
            
            // Hash should be a 32-character hex string (MD5)
            expect(hash1).toMatch(/^[a-f0-9]{32}$/);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should generate same hash regardless of key order in filter object', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.string(),
          fc.string(),
          (val1, val2, val3) => {
            const filters1 = { a: val1, b: val2, c: val3 };
            const filters2 = { c: val3, a: val1, b: val2 };
            const filters3 = { b: val2, c: val3, a: val1 };
            
            const hash1 = cacheService.hashFilters(filters1);
            const hash2 = cacheService.hashFilters(filters2);
            const hash3 = cacheService.hashFilters(filters3);
            
            // All hashes should be identical regardless of key order
            expect(hash1).toBe(hash2);
            expect(hash2).toBe(hash3);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Unit: Core Cache Operations', () => {
    beforeEach(async () => {
      // Clean up test keys before each test
      const redisClient = getRedisClient();
      if (redisClient) {
        await redisClient.flushdb();
      }
    });

    it('should set and get a value from cache', async () => {
      const key = 'test:key:1';
      const value = { id: 1, name: 'Test' };
      
      await cacheService.set(key, value, 60);
      const retrieved = await cacheService.get(key);
      
      expect(retrieved).toEqual(value);
    });

    it('should return null for non-existent key', async () => {
      const retrieved = await cacheService.get('non:existent:key');
      expect(retrieved).toBeNull();
    });

    it('should delete a key from cache', async () => {
      const key = 'test:key:2';
      const value = { id: 2, name: 'Test 2' };
      
      await cacheService.set(key, value, 60);
      await cacheService.del(key);
      const retrieved = await cacheService.get(key);
      
      expect(retrieved).toBeNull();
    });

    it('should delete all keys matching a pattern', async () => {
      await cacheService.set('events:list:1', { id: 1 }, 60);
      await cacheService.set('events:list:2', { id: 2 }, 60);
      await cacheService.set('events:detail:3', { id: 3 }, 60);
      await cacheService.set('clubs:list:1', { id: 4 }, 60);
      
      await cacheService.delPattern('events:*');
      
      expect(await cacheService.get('events:list:1')).toBeNull();
      expect(await cacheService.get('events:list:2')).toBeNull();
      expect(await cacheService.get('events:detail:3')).toBeNull();
      expect(await cacheService.get('clubs:list:1')).not.toBeNull();
    });

    it('should handle cache operations gracefully when Redis is unavailable', async () => {
      const nullCacheService = new CacheService(null);
      
      // Should not throw errors
      await expect(nullCacheService.set('key', 'value', 60)).resolves.not.toThrow();
      await expect(nullCacheService.get('key')).resolves.toBeNull();
      await expect(nullCacheService.del('key')).resolves.not.toThrow();
      await expect(nullCacheService.delPattern('pattern:*')).resolves.not.toThrow();
    });
  });

  describe('Unit: Graceful Failure Handling', () => {
    it('should continue without caching when Redis client is null', async () => {
      const nullCacheService = new CacheService(null);
      
      // All operations should complete without throwing
      await nullCacheService.set('test:key', { data: 'test' }, 60);
      const result = await nullCacheService.get('test:key');
      expect(result).toBeNull();
      
      await nullCacheService.del('test:key');
      await nullCacheService.delPattern('test:*');
      
      // Specialized methods should also work
      await nullCacheService.setEvents({ category: 'sports' }, [{ id: 1 }]);
      expect(await nullCacheService.getEvents({ category: 'sports' })).toBeNull();
      
      await nullCacheService.setClubs({ category: 'academic' }, [{ id: 1 }]);
      expect(await nullCacheService.getClubs({ category: 'academic' })).toBeNull();
      
      await nullCacheService.setUserProfile('user123', { name: 'Test' });
      expect(await nullCacheService.getUserProfile('user123')).toBeNull();
    });

    it('should handle Redis connection failures gracefully', async () => {
      const disconnectedService = new CacheService(null);
      
      // Operations should not throw
      await expect(disconnectedService.invalidateEvents()).resolves.not.toThrow();
      await expect(disconnectedService.invalidateClubs()).resolves.not.toThrow();
      await expect(disconnectedService.invalidateUserProfile('user123')).resolves.not.toThrow();
    });

    it('should handle malformed data gracefully', async () => {
      const redisClient = getRedisClient();
      
      if (redisClient) {
        // Manually set invalid JSON in Redis
        await redisClient.set('test:malformed', 'not valid json');
        
        // Should return null instead of throwing
        const result = await cacheService.get('test:malformed');
        expect(result).toBeNull();
      }
    });

    it('should return false for ping when Redis is unavailable', async () => {
      const nullCacheService = new CacheService(null);
      const isHealthy = await nullCacheService.ping();
      expect(isHealthy).toBe(false);
    });

    it('should handle empty filter objects', async () => {
      const emptyFilters = {};
      
      await cacheService.setEvents(emptyFilters, [{ id: 1 }]);
      const result = await cacheService.getEvents(emptyFilters);
      
      expect(result).toEqual([{ id: 1 }]);
    });

    it('should handle complex nested data structures', async () => {
      const complexData = {
        id: 1,
        nested: {
          array: [1, 2, 3],
          object: { key: 'value' },
          null: null,
          boolean: true,
        },
      };
      
      await cacheService.set('test:complex', complexData, 60);
      const result = await cacheService.get('test:complex');
      
      expect(result).toEqual(complexData);
    });
  });

  describe('Unit: Specialized Caching Methods', () => {
    beforeEach(async () => {
      const redisClient = getRedisClient();
      if (redisClient) {
        await redisClient.flushdb();
      }
    });

    it('should cache and retrieve events by filters', async () => {
      const filters = { category: 'sports', date: '2024-01-01' };
      const events = [{ id: 1, title: 'Event 1' }, { id: 2, title: 'Event 2' }];
      
      await cacheService.setEvents(filters, events);
      const retrieved = await cacheService.getEvents(filters);
      
      expect(retrieved).toEqual(events);
    });

    it('should invalidate all event caches', async () => {
      await cacheService.setEvents({ category: 'sports' }, [{ id: 1 }]);
      await cacheService.setEvents({ category: 'music' }, [{ id: 2 }]);
      
      await cacheService.invalidateEvents();
      
      expect(await cacheService.getEvents({ category: 'sports' })).toBeNull();
      expect(await cacheService.getEvents({ category: 'music' })).toBeNull();
    });

    it('should cache and retrieve clubs by filters', async () => {
      const filters = { category: 'academic' };
      const clubs = [{ id: 1, name: 'Club 1' }, { id: 2, name: 'Club 2' }];
      
      await cacheService.setClubs(filters, clubs);
      const retrieved = await cacheService.getClubs(filters);
      
      expect(retrieved).toEqual(clubs);
    });

    it('should invalidate all club caches', async () => {
      await cacheService.setClubs({ category: 'academic' }, [{ id: 1 }]);
      await cacheService.setClubs({ category: 'sports' }, [{ id: 2 }]);
      
      await cacheService.invalidateClubs();
      
      expect(await cacheService.getClubs({ category: 'academic' })).toBeNull();
      expect(await cacheService.getClubs({ category: 'sports' })).toBeNull();
    });

    it('should cache and retrieve user profile', async () => {
      const userId = 'user123';
      const profile = { id: userId, name: 'John Doe', email: 'john@example.com' };
      
      await cacheService.setUserProfile(userId, profile);
      const retrieved = await cacheService.getUserProfile(userId);
      
      expect(retrieved).toEqual(profile);
    });

    it('should invalidate specific user profile', async () => {
      const userId = 'user123';
      const profile = { id: userId, name: 'John Doe' };
      
      await cacheService.setUserProfile(userId, profile);
      await cacheService.invalidateUserProfile(userId);
      
      expect(await cacheService.getUserProfile(userId)).toBeNull();
    });
  });

  describe('Unit: Health Check', () => {
    it('should return true when Redis is connected', async () => {
      const isHealthy = await cacheService.ping();
      expect(isHealthy).toBe(true);
    });

    it('should return false when Redis is not available', async () => {
      const nullCacheService = new CacheService(null);
      const isHealthy = await nullCacheService.ping();
      expect(isHealthy).toBe(false);
    });
  });
});
