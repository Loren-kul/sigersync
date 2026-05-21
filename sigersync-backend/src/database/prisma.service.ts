import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";

type PrismaCategoryDelegate = {
  findUnique: (args: unknown) => Promise<unknown>;
  findMany: (args?: unknown) => Promise<unknown[]>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
};

type PrismaClientLike = {
  category: PrismaCategoryDelegate;
  $connect?: () => Promise<void>;
  $disconnect?: () => Promise<void>;
} & Record<string, unknown>;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  declare category: PrismaCategoryDelegate;
  private client?: PrismaClientLike;

  constructor() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PrismaClient } = require("@prisma/client");
      this.client = new PrismaClient();
      Object.assign(this, this.client);
    } catch {
      this.client = undefined;
    }
  }

  async onModuleInit() {
    if (this.client?.$connect) {
      await this.client.$connect();
    }
  }

  async onModuleDestroy() {
    if (this.client?.$disconnect) {
      await this.client.$disconnect();
    }
  }
}
