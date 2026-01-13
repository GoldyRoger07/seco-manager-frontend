import { Employee } from "../employees/employee.model";

export class Departement{
    constructor(
        public id = 0,
        public name = "",
        public employees: Employee[] = []
    ){}
}