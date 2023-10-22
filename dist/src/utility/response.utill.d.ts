export interface ResponseData<T> {
    status: true | false;
    status_code: number;
    message: string;
    data?: T;
}
export declare function generateResponse<T>(status: true | false, status_code: number, message: string, data?: T): ResponseData<T>;
