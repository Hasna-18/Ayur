import Redis from "ioredis";

let redis = null;

if (process.env.REDIS_URL) {
  try {
    console.log("🔌 Initializing Redis client using REDIS_URL...");
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1, // Minimize block time on lookup failure
      connectTimeout: 2000,   // Fail quickly if Redis is unreachable
      retryStrategy(times) {
        // Try reconnecting up to 3 times, then stop
        if (times > 3) {
          return null;
        }
        return Math.min(times * 100, 2000);
      }
    });

    redis.on("error", (err) => {
      // Log connection warnings instead of throwing uncaught process exceptions
      console.warn("⚠️ Redis warning:", err.message);
    });

    redis.on("connect", () => {
      console.log("✅ Connected to Redis successfully.");
    });
  } catch (error) {
    console.error("❌ Redis initialization exception:", error);
  }
} else {
  console.log("ℹ️ REDIS_URL not configured. Redis caching is disabled.");
}

export default redis;
