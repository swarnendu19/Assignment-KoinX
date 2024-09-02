import Redis from "ioredis";

export const connectRedis =(redisURI: string)=>{
    const redis = new Redis(redisURI);
    redis.on("connect", ()=> console.log("Reids Connected"));
    redis.on("error", (e)=> console.log(e));
    return redis;
  }
  
 