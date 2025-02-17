interface Users {
    firstName: string,
    lastName: string,
    age: number,
}

function filteredUsers(users: Users[]){
    return users.filter(x=>x.age>=18);
}

console.log(filteredUsers([{
    firstName: 'naste',
    lastName: 'da',
    age:20
}, {
    firstName: 'naste',
    lastName: 'da sr',
    age: 21
}]))