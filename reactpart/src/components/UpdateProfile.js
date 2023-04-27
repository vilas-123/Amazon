import React, { useState } from 'react'
import axios from 'axios'

function UpdateProfile() {


    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [phone,setphone]=useState("")
    const [street,setstreet]=useState("")
    const [city,setcity]=useState("")
    const [state,setstate]=useState("")
    const [pincode,setpincode]=useState("")


    const submitHandler=(e)=>{
        e.preventDefault()

        axios.post('http://localhost:8000/api/Profile/',{
            name,email,phone,street,city,state,pincode
        })
        .then(response=>response.json())
        .then(json=>console.log(json))
        .catch(error=>console.log(error))
    }

  return (
    <div>
        <div className='row'>
            <div className='col-4'></div>
                <div className='col-4 border-0'>
                    <form method='post' onSubmit={(e)=>submitHandler(e)}>
                        <div className="form-group">
                            <label >Name: </label>
                            <input type="text" className="form-control" placeholder="Enter Name" onChange={(e)=>{setname(e.target.value)}}/>

                        </div>
                        <div className="form-group">
                            <label >Email address: </label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=>{setemail(e.target.value)}}/>

                        </div>
                        <div className="form-group">
                            <label >Phone: </label>
                            <input type="Number" className="form-control" placeholder="" onChange={(e)=>{setphone(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label >Street: </label>
                            <input type="text" className="form-control" placeholder="" onChange={(e)=>{setstreet(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label >City: </label>
                            <input type="text" className="form-control" placeholder="" onChange={(e)=>{setcity(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label >State: </label>
                            <input type="text" className="form-control" placeholder="" onChange={(e)=>{setstate(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label >Pincode: </label>
                            <input type="Number" className="form-control" placeholder="" onChange={(e)=>{setpincode(e.target.value)}}/>
                        </div>
                        <button type="submit" className="btn btn-warning">Submit</button>
                    </form>
                </div>
            <div className='col-4'></div>
        </div>
    </div>
  )
}

export default UpdateProfile