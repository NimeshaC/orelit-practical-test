import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/user.entity").User>>;
    findAll(): Promise<import("../utility/response.utill").ResponseData<any>>;
    findOne(id: string): Promise<import("../utility/response.utill").ResponseData<any>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../utility/response.utill").ResponseData<import("./entities/user.entity").User>>;
    remove(id: string): Promise<import("../utility/response.utill").ResponseData<import("./entities/user.entity").User>>;
}
