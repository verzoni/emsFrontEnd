import { useEffect, useState } from 'react'
import { addEmployee , getEmployee, updateEmployee} from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {

    
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');

    const [errors,setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [axiosErr,setAxiosErr] = useState("");

    const navigate = useNavigate();

    const {Id} = useParams();
    const employeeId = Id;
    
    useEffect( () => {
        const readEmployee = async () => {
         //console.log("useEffect id=",employeeId); 
         const employee = await  getEmployee(employeeId) 
         //console.log(employee); 
         if (employee) {
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setEmail(employee.email);
           } else {
            setAxiosErr("Error reading employee")
           }
         }

        if (employeeId){
            readEmployee();
        }
        
        
    },[employeeId])

    let pageTitle = () => {
        //console.log("EmployeeComponent params=",employeeId);
        if (employeeId ) {
            return (<h2 className='text-center'>Update Employee</h2>)
        } else {
            return (<h2 className='text-center'>Add Employee</h2>)
        }
    }

    const validateForm = () => {

        let valid = true;

        const errorsCopy = { ...errors}

        if (firstName.trim()) {
            errorsCopy.firstName = ''
        } else {
            errorsCopy.firstName = "First Name is required";
            valid = false;
        }
        if (lastName.trim()) {
            errorsCopy.lastName = ''
        } else {
            errorsCopy.lastName = "Last Name is required";
            valid = false;
        }
        if (email.trim()) {
            errorsCopy.email = ''
        } else {
            errorsCopy.email = "Email is required";
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    const saveEmployee = async (e) => {
        e.preventDefault();
        const employee = {
            firstName,
            lastName,
            email
        }
        
        if (validateForm()) {
            setAxiosErr("");
            const result = await addEmployee(employee)
            result.status === "OK" ? navigate("/") : setAxiosErr(result.error)
        }
        
    }

    const saveUpdatedEmployee = async (e) => {
        e.preventDefault();
        const employee = {
            id: employeeId,
            firstName,
            lastName,
            email
        }
        
        if (validateForm()) {
            setAxiosErr("");
            const result = await updateEmployee(employee)
            result.status === "OK" ? navigate("/") : setAxiosErr(result.error)
        }
        
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                { pageTitle() }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input type='text' 
                                    placeholder='Enter First Name' 
                                    name='firstName' 
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                   
                            />
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input type='text' 
                                    placeholder='Enter Last Name' 
                                    name='lastName' 
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                    
                            />
                             {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email</label>
                            <input type='email' 
                                    placeholder='Enter Email' 
                                    name='emailName' 
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                    
                            />
                             {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        
                        {axiosErr && <div className="alert alert-danger" role="alert">
                                {axiosErr}
                        </div>}
                        <button className='btn btn-success' onClick={ employeeId ? saveUpdatedEmployee : saveEmployee}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent