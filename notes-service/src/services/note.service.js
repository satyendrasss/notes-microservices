import prisma from "../config/prisma.js";
import redisClient from "../config/redis.js";

export const create = async (userId, data) => {
  const note = await prisma.note.create({
    data: {
      userId: userId,
      title: data.title,
      content: data.content
    }
  });

  // Invalidate cache
  await redisClient.del(`notes:${userId}`);
  return note;
};

export const findAll = async (userId) => {
  const cacheKey = `notes:${userId}`;
  console.log(cacheKey);
  // Check cache
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log("Returning notes from Redis");
    return JSON.parse(cached);
  }

  // Fetch from PostgreSQL
  const notes = await prisma.note.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
    where: { userId: userId },
    orderBy: { createdAt: "desc" }
  });

  // Cache for 5 minutes
  await redisClient.set(cacheKey, JSON.stringify(notes), { EX: 300, });
  return notes;

};

export const findById = async (id, userId) => {
  const cacheKey = `note:${userId}:${id}`;
  const cachedNote = await redisClient.get(cacheKey);
  if (cachedNote) {
    return JSON.parse(cachedNote);
  }

  const note = await prisma.note.findUnique({
    where: { id, userId },
  });

  if (note) {
    await redisClient.set(cacheKey, JSON.stringify(note), { EX: 300 })
  }

  return note;
};

export const update = async (id, userId, data) => {
  const cacheKey = `notes:${userId}`;
  const { title, content, tagIds = [], isPinned, isFavorite, isArchived, deletedAt } = data;

  const note = await prisma.note.update({
    where: {
      id,
      userId,
    },

    data: {
      title,
      content,
      isPinned,
      isFavorite,
      isArchived,
      deletedAt,

      tags: {
        deleteMany: {},
        create: tagIds.map((tagId) => ({
          tag: {
            connect: {
              id: tagId,
            },
          },
        })),
      },
    },

    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });


  const deleted = await redisClient.del(cacheKey);
  console.log("Deleted:", cacheKey, deleted);
  return note;
};


export const toggleFavorite = async (id, userId) => {

  const note = await prisma.note.findUnique({
    where: { id, userId },
    select: { id: true, isFavorite: true, },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  const updatedNote = await prisma.note.update({
    where: { id },
    data: { isFavorite: !note.isFavorite, },
  });

  await redisClient.del(`notes:${userId}`);
  return updatedNote;
};


export const toggleArchive = async (id, userId) => {

  const note = await prisma.note.findUnique({
    where: { id, userId },
    select: { id: true, isArchived: true, },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  const updatedNote = await prisma.note.update({
    where: { id },
    data: { isArchived: !note.isArchived, },
  });

  await redisClient.del(`notes:${userId}`);
  return updatedNote;
};

export const togglePin = async (id, userId) => {

  const note = await prisma.note.findUnique({
    where: { id, userId },
    select: { id: true, isPinned: true, },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  const updatedNote = await prisma.note.update({
    where: { id },
    data: { isPinned: !note.isPinned, },
  });

  await redisClient.del(`notes:${userId}`);
  return updatedNote;
};




export const softDelete = async (id, userId) => {
  const note = await prisma.note.update({
    where: {
      id,
      userId
    },
    data: {
      deletedAt: new Date(),
    },
  });

  await redisClient.del(`notes:${userId}`);
  return note;
};


// permanent delete
export const remove = async (id, userId) => {
  const note = await prisma.note.delete({
    where: {
      id,
      userId
    },
  });
  await redisClient.del(`notes:${userId}`);
  return note;
};