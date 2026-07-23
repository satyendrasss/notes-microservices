import prisma from "../config/prisma.js";
import redisClient from "../config/redis.js";

export const createTag = async (userId, name, icon) => {
  if (!userId || !name) {
    throw new Error("User ID and tag name are required");
  }
  const tag = await prisma.tag.create({
    data: {
      userId,
      name: name.trim(),
      icon
    },
  });

  await redisClient.del(`tags:${userId}`);
  return tag;
};


export const update = async (id, userId, data) => {
  const tag = await prisma.tag.update({
    where: {
      id,
    },
    data,
  });

  await redisClient.del(`tags:${userId}`);
  return tag;
};

export const getTags = async (userId) => {
  const cacheKey = `tags:${userId}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log("Returning tags from Redis");
    return JSON.parse(cached);
  }


  const tags = await prisma.tag.findMany({
    select:{ id:true, name:true, icon:true },
    where: {
      userId,
    },
    orderBy: {
      name: "asc",
    },
  });

  await redisClient.set(cacheKey, JSON.stringify(tags), { EX: 300, });
  return tags;

};