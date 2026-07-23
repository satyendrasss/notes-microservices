## 1. Install Prisma
cd auth-service

npm install @prisma/client
npm install -D prisma

## 2. Initialize Prisma
npx prisma init


## DATABASE_URL="postgresql://postgres:password@auth-db:5432/auth_db

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

enum UserRole {
  USER
  ADMIN
}

model User {
  id            String         @id @default(uuid())
  name          String
  email         String         @unique
  password      String
  avatar        String?
  role          UserRole       @default(USER)
  status        UserStatus     @default(ACTIVE)
  emailVerified Boolean        @default(false)
  lastLoginAt   DateTime?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  refreshTokens RefreshToken[]

  @@map("users")
}

model RefreshToken {
  id         String   @id @default(uuid())
  token      String   @unique
  expiresAt  DateTime
  revoked    Boolean  @default(false)

  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt  DateTime @default(now())

  @@map("refresh_tokens")
}


=========================================
auth-service/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── prisma.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── services/
│   │   └── auth.service.js
│   │
│   ├── repositories/
│   │   └── user.repository.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── validators/
│   │   └── auth.validator.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── hash.js
│   │   └── response.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
├── Dockerfile
└── .env






## Start development

From root:

docker compose -f docker-compose.dev.yml up --build

After first build:

docker compose -f docker-compose.dev.yml up


## Prisma commands

npx prisma generate

npx prisma migrate dev --name init

Because Prisma is now inside the container:

Migration:

docker compose -f docker-compose.dev.yml exec auth-service npx prisma migrate dev --name init

Generate client:

docker compose -f docker-compose.dev.yml exec auth-service npx prisma generate

Prisma Studio:

docker compose -f docker-compose.dev.yml exec auth-service npx prisma studio