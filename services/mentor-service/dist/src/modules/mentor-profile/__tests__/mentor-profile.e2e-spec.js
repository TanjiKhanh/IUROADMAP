"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../../../app.module");
const client_1 = require("@prisma/client");
const jwt = __importStar(require("jsonwebtoken"));
describe('MentorProfileController (E2E Tests)', () => {
    let app;
    let prisma;
    const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
    const generateToken = (userId, role) => {
        return jwt.sign({ sub: userId, userId, role, email: `user${userId}@test.com` }, JWT_SECRET, { expiresIn: '1h' });
    };
    const createMockHeaders = (userId, role = 'MENTOR') => ({
        authorization: `Bearer ${generateToken(userId, role)}`,
    });
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        await app.init();
        prisma = new client_1.PrismaClient();
    });
    beforeEach(async () => {
        await prisma.mentorProfile.deleteMany();
    });
    afterAll(async () => {
        await prisma.$disconnect();
        await app.close();
    });
    describe('GET /mentor-profiles/me (Get Current User Profile)', () => {
        it('should return mentor profile when authenticated', async () => {
            const userId = 1;
            await prisma.mentorProfile.create({
                data: {
                    userId,
                    cvUrl: 'https://example.com/cv.pdf',
                    linkedinUrl: 'https://linkedin.com/in/user1',
                    industry: 'TECHNOLOGY',
                    skills: ['Node.js', 'TypeScript', 'React'],
                    bio: { text: 'Experienced full-stack developer' },
                },
            });
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .expect(200);
            expect(response.body).toMatchObject({
                userId,
                cvUrl: 'https://example.com/cv.pdf',
                linkedinUrl: 'https://linkedin.com/in/user1',
                industry: 'TECHNOLOGY',
                skills: expect.arrayContaining(['Node.js', 'TypeScript', 'React']),
            });
        });
        it('should return 401 when not authenticated', async () => {
            await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles/me')
                .expect(401);
        });
        it('should return 403 when user is not a mentor', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles/me')
                .set(createMockHeaders(1, 'STUDENT'))
                .expect(403);
            expect(response.body.message).toContain('Insufficient permissions');
        });
        it('should return 404 when profile does not exist', async () => {
            const userId = 999;
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .expect(404);
            expect(response.body.message).toContain('not found');
        });
        it('should return profile with minimal data', async () => {
            const userId = 2;
            await prisma.mentorProfile.create({
                data: {
                    userId,
                },
            });
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .expect(200);
            expect(response.body).toMatchObject({
                userId,
                skills: [],
            });
        });
    });
    describe('PUT /mentor-profiles/me (Update Current User Profile)', () => {
        it('should update mentor profile with all fields', async () => {
            const userId = 10;
            await prisma.mentorProfile.create({
                data: {
                    userId,
                    cvUrl: null,
                    linkedinUrl: null,
                    industry: null,
                    skills: [],
                },
            });
            const updateDto = {
                cvUrl: 'https://example.com/updated-cv.pdf',
                linkedinUrl: 'https://linkedin.com/in/updated',
                industry: 'FINTECH',
                skills: ['TypeScript', 'Solidity', 'Web3'],
                bio: 'Blockchain expert',
            };
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .send(updateDto)
                .expect(200);
            expect(response.body).toMatchObject({
                userId,
                cvUrl: 'https://example.com/updated-cv.pdf',
                linkedinUrl: 'https://linkedin.com/in/updated',
                industry: 'FINTECH',
                skills: expect.arrayContaining(['TypeScript', 'Solidity']),
            });
        });
        it('should update only specific fields (PATCH-style)', async () => {
            const userId = 11;
            await prisma.mentorProfile.create({
                data: {
                    userId,
                    cvUrl: 'https://old-cv.com',
                    industry: 'MARKETING',
                    skills: ['SEO', 'Content Writing'],
                },
            });
            const updateDto = {
                skills: ['SEO', 'Content Writing', 'Analytics'],
            };
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .send(updateDto)
                .expect(200);
            expect(response.body).toMatchObject({
                userId,
                cvUrl: 'https://old-cv.com',
                industry: 'MARKETING',
                skills: expect.arrayContaining(['Analytics']),
            });
        });
        it('should validate URL fields', async () => {
            const userId = 12;
            await prisma.mentorProfile.create({
                data: { userId },
            });
            const updateDto = {
                cvUrl: 'not-a-valid-url',
            };
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .send(updateDto)
                .expect(400);
            expect(response.body.message).toContainEqual(expect.stringContaining('cvUrl'));
        });
        it('should return 401 when not authenticated', async () => {
            await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .send({ skills: ['Node.js'] })
                .expect(401);
        });
        it('should return 404 when profile does not exist', async () => {
            const userId = 777;
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .send({ cvUrl: 'https://example.com/cv.pdf' })
                .expect(404);
            expect(response.body.message).toContain('not found');
        });
        it('should reject non-mentor users', async () => {
            await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(1, 'STUDENT'))
                .send({ skills: ['Node.js'] })
                .expect(403);
        });
    });
    describe('GET /mentor-profiles (List All Profiles - Admin Only)', () => {
        it('should list all profiles with default pagination (admin)', async () => {
            const userIds = [20, 21, 22];
            for (const userId of userIds) {
                await prisma.mentorProfile.create({
                    data: {
                        userId,
                        industry: 'TECHNOLOGY',
                        skills: ['Node.js'],
                    },
                });
            }
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles')
                .set(createMockHeaders(100, 'ADMIN'))
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
        it('should handle pagination parameters', async () => {
            for (let i = 0; i < 15; i++) {
                await prisma.mentorProfile.create({
                    data: {
                        userId: 50 + i,
                        industry: 'TECHNOLOGY',
                    },
                });
            }
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles')
                .query({ skip: '5', take: '5' })
                .set(createMockHeaders(100, 'ADMIN'))
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
        it('should return 401 when not authenticated', async () => {
            await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles')
                .expect(401);
        });
        it('should return 403 when user is not admin', async () => {
            await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles')
                .set(createMockHeaders(1, 'MENTOR'))
                .expect(403);
        });
        it('should return empty list when no profiles exist', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles')
                .set(createMockHeaders(100, 'ADMIN'))
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });
    });
    describe('DELETE /mentor-profiles/:id (Delete Profile - Admin Only)', () => {
        it('should delete mentor profile (admin)', async () => {
            const userId = 30;
            await prisma.mentorProfile.create({
                data: {
                    userId,
                    cvUrl: 'https://example.com/cv.pdf',
                    skills: ['Node.js'],
                },
            });
            await (0, supertest_1.default)(app.getHttpServer())
                .delete(`/mentor-profiles/${userId}`)
                .set(createMockHeaders(100, 'ADMIN'))
                .expect(204);
            const profile = await prisma.mentorProfile.findUnique({
                where: { userId },
            });
            expect(profile).toBeNull();
        });
        it('should return 401 when not authenticated', async () => {
            await (0, supertest_1.default)(app.getHttpServer())
                .delete('/mentor-profiles/999')
                .expect(401);
        });
        it('should return 403 when user is not admin', async () => {
            const userId = 35;
            await prisma.mentorProfile.create({
                data: { userId },
            });
            await (0, supertest_1.default)(app.getHttpServer())
                .delete(`/mentor-profiles/${userId}`)
                .set(createMockHeaders(1, 'MENTOR'))
                .expect(403);
        });
        it('should return 404 when profile does not exist', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .delete('/mentor-profiles/999')
                .set(createMockHeaders(100, 'ADMIN'))
                .expect(404);
            expect(response.body.message).toContain('not found');
        });
        it('should delete only the specified profile', async () => {
            await prisma.mentorProfile.create({ data: { userId: 40 } });
            await prisma.mentorProfile.create({ data: { userId: 41 } });
            await (0, supertest_1.default)(app.getHttpServer())
                .delete('/mentor-profiles/40')
                .set(createMockHeaders(100, 'ADMIN'))
                .expect(204);
            const deleted = await prisma.mentorProfile.findUnique({
                where: { userId: 40 },
            });
            const remaining = await prisma.mentorProfile.findUnique({
                where: { userId: 41 },
            });
            expect(deleted).toBeNull();
            expect(remaining).not.toBeNull();
        });
    });
    describe('Input Validation', () => {
        it('should reject invalid email in request', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(1, 'MENTOR'))
                .send({
                cvUrl: 'not-a-url',
            });
            expect(response.status).toBe(400);
        });
        it('should reject skills if not an array', async () => {
            const userId = 45;
            await prisma.mentorProfile.create({
                data: { userId },
            });
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .send({
                skills: 'not-an-array',
            })
                .expect(400);
            expect(response.body.message).toBeDefined();
        });
        it('should accept valid string input for industry', async () => {
            const userId = 46;
            await prisma.mentorProfile.create({
                data: { userId },
            });
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .send({
                industry: 'TECHNOLOGY',
            })
                .expect(200);
            expect(response.body.industry).toBe('TECHNOLOGY');
        });
    });
    describe('Edge Cases and Error Handling', () => {
        it('should handle concurrent requests properly', async () => {
            const userId = 50;
            await prisma.mentorProfile.create({
                data: { userId },
            });
            const requests = [
                (0, supertest_1.default)(app.getHttpServer())
                    .put('/mentor-profiles/me')
                    .set(createMockHeaders(userId, 'MENTOR'))
                    .send({ cvUrl: 'https://cv1.com' }),
                (0, supertest_1.default)(app.getHttpServer())
                    .put('/mentor-profiles/me')
                    .set(createMockHeaders(userId, 'MENTOR'))
                    .send({ cvUrl: 'https://cv2.com' }),
                (0, supertest_1.default)(app.getHttpServer())
                    .get('/mentor-profiles/me')
                    .set(createMockHeaders(userId, 'MENTOR')),
            ];
            const results = await Promise.all(requests);
            expect(results[0].status).toBe(200);
            expect(results[1].status).toBe(200);
            expect(results[2].status).toBe(200);
        });
        it('should preserve existing data when updating partial fields', async () => {
            const userId = 51;
            const originalData = {
                userId,
                cvUrl: 'https://original-cv.com',
                linkedinUrl: 'https://linkedin.com/original',
                industry: 'TECHNOLOGY',
                skills: ['Node.js', 'Python'],
                bio: { text: 'Original bio' },
            };
            await prisma.mentorProfile.create({ data: originalData });
            await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .send({ bio: 'Updated bio' })
                .expect(200);
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .expect(200);
            expect(response.body.cvUrl).toBe('https://original-cv.com');
            expect(response.body.linkedinUrl).toBe('https://linkedin.com/original');
            expect(response.body.industry).toBe('TECHNOLOGY');
            expect(response.body.skills).toEqual(['Node.js', 'Python']);
        });
        it('should handle large skill arrays', async () => {
            const userId = 52;
            await prisma.mentorProfile.create({
                data: { userId },
            });
            const largeSkillArray = Array.from({ length: 100 }, (_, i) => `Skill${i}`);
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .put('/mentor-profiles/me')
                .set(createMockHeaders(userId, 'MENTOR'))
                .send({ skills: largeSkillArray })
                .expect(200);
            expect(response.body.skills).toEqual(largeSkillArray);
        });
    });
});
//# sourceMappingURL=mentor-profile.e2e-spec.js.map