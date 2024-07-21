class ApiResponse{
    statusCode:number;
    message: string = "Success";
    success:boolean;
    constructor(statusCode:number, message:string){
        this.statusCode = statusCode;
        this.message = message;
        this.success = true
    }
}