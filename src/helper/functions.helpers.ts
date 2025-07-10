import { User } from "src/schema/user.schema"

export function GenerateOtp(){
    const num=Math.floor(Math.random()*10000).toString()
    const otp=(num.length==4)?num:num+'0'
    return otp
}

export function VerifyPassword(user:User,otp?:string) {
    if (user.otp != otp)
        return false

    if (user.otpGenerateTime) {
        if ((new Date().getTime() - new Date(user.otpGenerateTime).getTime()) <= 90 * 1000) {
            return true
        }
    }
    return false
}