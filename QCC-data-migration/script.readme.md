# Steps to run the migration script at the root directory:

### 1. Generate Prisma Client for the QCC database:
npx prisma generate --schema=./Qcc-data-migration/prisma-second/schema.prisma

### 2. Generate Prisma Client for the FSAI database:
npx prisma generate

### 3. To the compile and run prisma.service.ts file:
npm run qcc-migration-script
