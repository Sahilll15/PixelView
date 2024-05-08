import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { toast } from 'react-toastify';
import axios from 'axios';

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  
  const createAccount=async()=>{
    console.log('Account Created');
    console.log(signupState)
    
    if(signupState.password !== signupState.cPassword ){
        toast.error('Passwords do not match');
        return;
    }

    const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`,signupState);

    if(response.status === 200){
        toast.success('Account Created');
        }
    else{
        toast.error('Account Creation Failed');
    }
    console.log(response);
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}