export interface loginRequest{
    emailOrUsername: "string",
    password: "string"
}
export interface loginResponse{
    statusCode: 200,
    meta: {
        message:boolean,
        token:string ,
        email: string,
        userName:string,
        tokenExpirationDate:Date,
        isAuthenticated:boolean
    },
    succeeded: boolean,
    message?: string,
    errors?: null,
    data?: null
}