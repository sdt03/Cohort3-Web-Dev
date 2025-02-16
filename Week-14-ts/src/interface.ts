interface User{
    firstName: string;
    age: number;
    lastName: string,
    email: string;
}

function isLegal(user: User){
    if(user.age >= 18){
        return true;
    } else {
        return false;
    }

}