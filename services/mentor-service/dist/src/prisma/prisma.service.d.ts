import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma-client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
//# sourceMappingURL=prisma.service.d.ts.map