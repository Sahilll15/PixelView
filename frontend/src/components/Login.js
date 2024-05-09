import { useEffect, useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const [testDetailsOn,setTestDetailsOn]=useState(false);
    const [loading,setLoading]=useState(false);

    const handleChange=(e)=>{   
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }


    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    useEffect(()=>{
        if(testDetailsOn){
            setLoginState({...loginState,email:process.env.REACT_APP_TEST_EMAIL,password:process.env.REACT_APP_TEST_PASSWORD})
        }else{
            setLoginState({...loginState,email:'',password:''})
        }
    },[testDetailsOn])


    const authenticateUser = async() =>{
        try {
            setLoading(true);
            const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`,loginState);
                
            if(response.status == 200){
                console.log('User Logged In');
                toast.success('User Logged In');
                localStorage.setItem('token',response.data.token)
                setLoading(false)
                navigate('/home')

            }else{
                console.log('Error Logging In');
                toast.error('Error Logging In');
                setLoading(false)
            }




        } catch (error) {
            console.error(error);
        }
    }   

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            onChange={()=>setTestDetailsOn(!testDetailsOn)}
            checked={testDetailsOn}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Fill Test Details
          </label>
        </div>
        

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text={loading ? 'Loading ...':'Login'}/>

      </form>
    )
}