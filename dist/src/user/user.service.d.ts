import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { ResponseData } from "src/utility/response.utill";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    hashPassword(password: string): Promise<string>;
    create(createUserDto: CreateUserDto): Promise<ResponseData<User>>;
    findAll(): Promise<ResponseData<User[]>>;
    findOneById(user_id: string): Promise<ResponseData<User>>;
    update(user_id: string, updateUserDto: UpdateUserDto): Promise<ResponseData<User | null>>;
    remove(user_id: string): Promise<ResponseData<User | null>>;
}
