import { HttpStatus } from "@nestjs/common";

export interface IBaseResponse<T> {
    code: HttpStatus;
    body: T;
    message?: string;
}