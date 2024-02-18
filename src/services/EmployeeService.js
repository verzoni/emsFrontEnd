import axios from "axios";

//const REST_API_BASE_URL = "http://localhost:8080/api/employees"
const REST_API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL

export const listEmployees = async () => {
    try {
        const {data} =  await axios.get(REST_API_BASE_URL);
        //console.log("listEmployees=",data);
        return data;
    } catch (error) {
        console.log(error);
    }
   
}

export const addEmployee = async (employee) => {
    try {
        const res = await axios.post(REST_API_BASE_URL,employee);
        console.log("ADDemployee",res.status,res.statusText);
        return {status: "OK"};
    } catch (error) {
        console.log("EmployeeService addEmployee Error=",error);
        return {status: "KO" , error: error.message}
    }
}

export const getEmployee = async (employeeId) => {
    try {
        const res = await axios.get(`${REST_API_BASE_URL}/${employeeId}`);
        //console.log("GETemployee=",res.data);
        return res.data;
    } catch (error) {
        console.log("EmployeeService getEmployee Error=",error);
        return null;
    }
}

export const updateEmployee = async (employee) => {
    try {
        const res = await axios.put(`${REST_API_BASE_URL}/${employee.id}`,employee);
        console.log("UPDATEemployee",res.status,res.statusText);
        return {status: "OK"};
    } catch (error) {
        console.log("EmployeeService updateEmployee Error=",error);
        return {status: "KO" , error: error.message}
    }
}

export const deleteEmployee = async (id) => {
    try {
        const res = await axios.delete(`${REST_API_BASE_URL}/${id}`);
        console.log("DELETEemployee",res.status,res.statusText);
        return {status: "OK"};
    } catch (error) {
        console.log("EmployeeService deleteEmployee Error=",error);
        return {status: "KO" , error: error.message}
    }
}