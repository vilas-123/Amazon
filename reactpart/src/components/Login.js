import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Login() {
    const [name,setname]=useState('')
    const [password,setpassword]=useState('')

    useEffect=()=>{
        axios.get('http://127.0.0.1:8000/api/login/')
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
    }


    
    const submithandler=(e)=>{
        e.preventDefault()
        

        axios.post('http://127.0.0.1:8000/api/login/',{
            name,
            password
        })
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
    }
    

    return (
        <div>
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4 border-0'>
                    <form onSubmit={(e)=>submithandler(e)} method='post'>
                        <div className="form-group">
                            <label >Email address: </label>
                            <input type="text" className="form-control" placeholder="Enter name" name='name'  onChange={(e)=>{setname(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label >Password: </label>
                            <input type="password" className="form-control" placeholder="Password" name='password'  onChange={(e)=>{setpassword(e.target.value)}}/>
                        </div>
                        <button type="submit" className="btn btn-warning">Submit</button>
                    </form>
                </div>
                <div className='col-4'></div>
            </div>
        </div>
    )
}

export default Login