-- CreateTable
CREATE TABLE "Tier" (
    "type" STRING NOT NULL,
    "t0" INT4[] DEFAULT ARRAY[]::INT4[],
    "t1" INT4[] DEFAULT ARRAY[]::INT4[],
    "t2" INT4[] DEFAULT ARRAY[]::INT4[],
    "t3" INT4[] DEFAULT ARRAY[]::INT4[],
    "t4" INT4[] DEFAULT ARRAY[]::INT4[],
    "tN" INT4[] DEFAULT ARRAY[]::INT4[],

    CONSTRAINT "Tier_pkey" PRIMARY KEY ("type")
);
