type StringOrNumber = string | number;

function printId(id: StringOrNumber){
    console.log(`ID is ${id}`);
}

printId(101);
printId("202");

type Employee = {
    name: string;
    startDate: Date;
}

type Manager = {
    name: string;
    department: string;
}

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
    name: "Shoumik",
    startDate: new Date(),
    department: "Engineering"
};