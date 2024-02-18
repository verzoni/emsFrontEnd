import { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";
import {useNavigate} from 'react-router-dom';
import { deleteEmployee } from "../services/EmployeeService";
//import axios from "axios";


export const ListEmployeeComponent = () => {
 

    const [employees,setEmployees] = useState([]);
    const [axiosErr,setAxiosErr] = useState("");
    const navigate = useNavigate();
    //const REST_API_BASE_URL = "http://localhost:8080/api/employees"
    //const REST_API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL

    useEffect( () => {

        // const getList = async () => {
        //     try {
        //         const {data} = await axios.get(REST_API_BASE_URL)
        //         setEmployees(data)
        //         return
        //     } catch (error) {
        //         console.log(error);
        //         setEmployees([])
        //     }
            
        // }
        //getList();

        const getList = async () => {
            const empList = await listEmployees();
            //console.log("empList=",empList);
            setEmployees(empList)
        }

        getList()
        
        
    } , []);

    const addNewEmploy = () => {
        //console.log("ADD");
        navigate('/add-employee')
    }

    const updateEmployee = (id) => {
        //console.log("Update "+id);
        navigate(`/update-employee/${id}`);
    }

    const deleteThisEmployee = async (id) => {
      console.log("Delete "+id);
      setAxiosErr("");
      const result = await deleteEmployee(id)
            result.status === "OK" ? window.location.reload(false) : setAxiosErr(result.error)
    }

  return (
    <div className="container">
        <button className="btn btn-primary mb-2" onClick={addNewEmploy}>Add Employee</button>
        {axiosErr && <div className="alert alert-danger" role="alert">
                                {axiosErr}
                        </div>}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => 
            <tr key={employee.id}>
              <th scope="row">{employee.id}</th>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button className="btn btn-primary me-3" onClick={() => updateEmployee(employee.id)}>
                  Update
                </button>
                <button className="btn btn-danger" onClick={() => deleteThisEmployee(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
