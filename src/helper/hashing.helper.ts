import * as bcrypt from 'bcrypt'

const hashRound=10
function HashPassword(password: string) {
    return bcrypt.hash(password,hashRound)
} 
function HashCompare(enteredPassword,cryptedPassword) :Promise<boolean>{
    return bcrypt.compare(enteredPassword,cryptedPassword)
}

export{HashPassword,HashCompare}