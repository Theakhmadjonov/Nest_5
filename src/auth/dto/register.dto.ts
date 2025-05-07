import { IsString, IsStrongPassword, minLength, MinLength } from "class-validator"

export class RegisterDto {
    @IsString()
    @MinLength(6)
    full_name: string
    @IsString()
    username: string
    @IsString()
    @MinLength(6)
    @IsStrongPassword()
    password: string
}
