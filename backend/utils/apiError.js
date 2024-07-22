class ApiError extends Error {
    constructor(status, message){
        super(message);
        this.status = status;
    }
}

export default ApiError;

//class le dine vaneko variable ho 
//hamilaae chahiyako vaneko message and status ko variable ho
// message ko variable Error le set garx
//new ApiError call garda Error le ApiError laae  message dinx 
//ApiError le status ko variable pani set gari dinx
// throw new ApiError call garda message and status ko variable throw vayar errorMiddleware maa janx r tyo function le aafno kaam garx
 
