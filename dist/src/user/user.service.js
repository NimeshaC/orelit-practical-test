"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const response_utill_1 = require("../utility/response.utill");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOneByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        return user || null;
    }
    async hashPassword(password) {
        const saltRounds = 10;
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err)
                    reject(err);
                resolve(hash);
            });
        });
        return hashedPassword;
    }
    async create(createUserDto) {
        try {
            const { email, role } = createUserDto;
            const existingUser = await this.userRepository.find({
                where: { email, role },
            });
            if (existingUser && existingUser.length > 0) {
                throw new common_1.BadRequestException("Email already exists");
            }
            await this.userRepository.save({
                ...createUserDto,
                password: await this.hashPassword(createUserDto.password),
            });
            return (0, response_utill_1.generateResponse)(true, 200, " User created successfully");
        }
        catch (error) {
            return (0, response_utill_1.generateResponse)(false, error.status || 500, error.message);
        }
    }
    async findAll() {
        const user = await this.userRepository.find();
        return (0, response_utill_1.generateResponse)(true, 200, "All Users", user);
    }
    async findOneById(user_id) {
        try {
            const user = await this.userRepository.findOne({
                where: { user_id },
            });
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            return (0, response_utill_1.generateResponse)(true, 200, "User", user);
        }
        catch (error) {
            throw error;
        }
    }
    async update(user_id, updateUserDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { user_id },
            });
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            const updatedUser = await this.userRepository.save({
                ...user,
                ...updateUserDto,
            });
            return (0, response_utill_1.generateResponse)(true, 200, "User updated successfully", updatedUser);
        }
        catch (error) {
            throw error;
        }
    }
    async remove(user_id) {
        try {
            const user = await this.userRepository.findOne({
                where: { user_id },
            });
            if (!user) {
                throw new common_1.BadRequestException("User not found");
            }
            await this.userRepository.delete({ user_id });
            return (0, response_utill_1.generateResponse)(true, 200, "User deleted successfully");
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map