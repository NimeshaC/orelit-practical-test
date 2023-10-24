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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const shop_service_1 = require("./shop.service");
const create_shop_dto_1 = require("./dto/create-shop.dto");
const update_shop_dto_1 = require("./dto/update-shop.dto");
const role_guard_1 = require("../auth/authorization/role.guard");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_decorator_1 = require("../auth/authorization/roles.decorator");
const roles_enum_1 = require("../auth/authorization/roles.enum");
let ShopController = class ShopController {
    constructor(shopsService) {
        this.shopsService = shopsService;
    }
    create(createShopDto) {
        return this.shopsService.create(createShopDto);
    }
    findAll() {
        return this.shopsService.findAll();
    }
    findAllByUserId(userId) {
        return this.shopsService.findAllByUserId(userId);
    }
    findOne(id) {
        return this.shopsService.findOne(id);
    }
    update(id, updateShopDto) {
        return this.shopsService.update(id, updateShopDto);
    }
    remove(id) {
        return this.shopsService.remove(id);
    }
};
exports.ShopController = ShopController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shop_dto_1.CreateShopDto]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN, roles_enum_1.Role.SHOP_ADMIN]),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "findAllByUserId", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN, roles_enum_1.Role.SHOP_ADMIN]),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN, roles_enum_1.Role.SHOP_ADMIN]),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shop_dto_1.UpdateShopDto]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)([roles_enum_1.Role.SYSTEM_ADMIN]),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "remove", null);
exports.ShopController = ShopController = __decorate([
    (0, common_1.Controller)("shop"),
    (0, common_1.UseGuards)(jwt_guard_1.jwtAuthGuard),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
//# sourceMappingURL=shop.controller.js.map