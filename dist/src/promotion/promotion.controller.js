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
exports.PromotionController = void 0;
const common_1 = require("@nestjs/common");
const promotion_service_1 = require("./promotion.service");
const create_promotion_dto_1 = require("./dto/create-promotion.dto");
const update_promotion_dto_1 = require("./dto/update-promotion.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const role_guard_1 = require("../auth/authorization/role.guard");
const roles_decorator_1 = require("../auth/authorization/roles.decorator");
const roles_enum_1 = require("../auth/authorization/roles.enum");
let PromotionController = class PromotionController {
    constructor(promotionService) {
        this.promotionService = promotionService;
    }
    create(createPromotionDto) {
        return this.promotionService.create(createPromotionDto);
    }
    findAll() {
        return this.promotionService.findAll();
    }
    findOne(id) {
        return this.promotionService.findOne(id);
    }
    findAllByShopId(productId) {
        return this.promotionService.findAllByProductId(productId);
    }
    update(id, updatePromotionDto) {
        return this.promotionService.update(id, updatePromotionDto);
    }
    remove(id) {
        return this.promotionService.remove(id);
    }
};
exports.PromotionController = PromotionController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN, roles_enum_1.Role.SHOP_ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promotion_dto_1.CreatePromotionDto]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN, roles_enum_1.Role.SHOP_ADMIN]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN, roles_enum_1.Role.SHOP_ADMIN]),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("product/:productId"),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN, roles_enum_1.Role.SHOP_ADMIN]),
    __param(0, (0, common_1.Param)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "findAllByShopId", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN, roles_enum_1.Role.SHOP_ADMIN]),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_promotion_dto_1.UpdatePromotionDto]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN, roles_enum_1.Role.SHOP_ADMIN]),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "remove", null);
exports.PromotionController = PromotionController = __decorate([
    (0, common_1.Controller)("promotion"),
    (0, common_1.UseGuards)(jwt_guard_1.jwtAuthGuard),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [promotion_service_1.PromotionService])
], PromotionController);
//# sourceMappingURL=promotion.controller.js.map