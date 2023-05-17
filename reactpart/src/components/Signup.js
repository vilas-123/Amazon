import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Signup() {
    const navigate = useNavigate()

    const [error, seterror] = useState("")
    const [user, setuser] = useState([])
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")


    const submitHandler = (e) => {
        e.preventDefault()
        
            const emailRegex = /^[a-zA-Z]+\d+(@gmail\.com)$/;
            const isValidEmail = emailRegex.test(email);
            if (isValidEmail) {
                axios.post('localhost:8000/api/signup/', {
                    name, email, password
                })
                    .then(response => {
                        if(response.data.success){
                        console.log(response); navigate("/login")
                    }
                else{
                    seterror(response.data.error)
                }  })
                    .catch(error => {console.log(error);seterror(error)})
            }
            else{
                seterror("Please enter valid email id !!")
            }




    }

    return (
        <div>
            <div>
                {/* {user?user.map(users=>(<div key={users.id}>{users.name}</div>)):""} */}
            </div>
            <div className='row'>
                <div className='col-1'></div>
                <div className='col-10 border-0'>
                    <form className='p-2' style={{ border: '2px solid grey' }} method='post' onSubmit={(e) => submitHandler(e)}>
                        {error && <div class="alert alert-danger" role="alert"><b>{error}</b></div>}
                        <div class="alert alert-secondary" role="alert"><b>Signup</b></div>
                        <table className='w-100'>
                            <div className=' mb-2 bg-dark text-white'>
                                <tr className='row'>
                                    <th className='col-3 p-1'><label >Name: </label></th>
                                    <td className='col-7 p-1'><input type="text" className="form-control" placeholder="Name" onChange={(e) => { setname(e.target.value) }} /></td>
                                </tr>
                            </div>
                            <div className=' mb-2 bg-dark text-white'>
                                <tr className='row'>
                                    <th className='col-3 p-1'><label >Email: </label></th>
                                    <td className='col-7 p-1'><input type="email" className="form-control" placeholder="email" onChange={(e) => { setemail(e.target.value) }} /></td>
                                </tr>
                            </div>
                            <div className=' mb-2 bg-dark text-white'>
                                <tr className='row'>
                                    <th className='col-3 p-1'><label >Password: </label></th>
                                    <td className='col-7 p-1'><input type="password" className="form-control" placeholder="******" onChange={(e) => { setpassword(e.target.value) }} /></td>
                                </tr>
                            </div>

                        </table>


                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
                <div className='col-1'></div>
            </div>

        </div>
    )
}

export default Signup