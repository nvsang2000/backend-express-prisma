-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sic" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "displayName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "thumbnail" TEXT,
    "updateAt" TIMESTAMP(3),
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_sic_key" ON "category"("sic");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "users"("email");
