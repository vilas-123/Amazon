import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/ContextProvider';

function Login() {
    const navigate = useNavigate()
    const { setUserId } = useContext(AuthContext)
    const { setsuperuser } = useContext(AuthContext)
    // const { setoldpassword } = useContext(AuthContext)
    // const [logged, setlogged] = useState('')
    const [users, setusers] = useState([])
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [errormsg, seterrormsg] = useState("")
    // const [users,setusers]=useState([])

    const getuser = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/signup/');
            console.log(response.data);
            setusers(response.data);
            //   console.log(response.data[0].id); // You can add this line to check if the users state has been updated correctly.
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getuser()
    }, [])



    const submithandler = (e) => {
        e.preventDefault()
        const token = "0971ec5ae480ee59aee0a0f7ff6da785ef7b27cd"
        console.log("users is" + users)
        for (const user of users) {
            console.log(user)
            if (user.email === email && user.password === password) {
                // axios.patch(`http://127.0.0.1:8000/api/signup/${user.id}/`,
                //     { logged: true },
                //     {
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': `Bearer ${token}` // add your token here
                //         }
                //     })
                //     .then(response => {
                //         console.log(response.data);
                //     })
                //     .catch(error => {
                //         console.error(error); 
                //     });
                setUserId(user?.id)
                setsuperuser(user?.superuser)
                // setoldpassword(user?.password)
                localStorage.setItem("userId", user?.id)
                navigate("/store")
            }
            else {
                seterrormsg("Email or Password is wrong !!!")
            }
        }



    }


    return (
        <div>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6 border-0'>
                    <form className='p-2' style={{ border: '2px solid grey' }} method='post' onSubmit={(e) => submithandler(e)}>
                        {errormsg && <div class="alert alert-danger" role="alert"><b>{errormsg}</b></div>}
                        <div class="alert alert-secondary" role="alert"><b>Login</b></div>
                        <table className='w-100'>
                            <div className=' mb-2 bg-dark text-white'>
                                <tr className='row'>
                                    <th className='col-3 p-1'><label >Email: </label></th>
                                    <td className='col-7 p-1'><input type="email" className="form-control" placeholder="email" onChange={(e) => { setemail(e.target.value) }} /></td>
                                </tr>
                            </div>
                            <div className=' mb-2 bg-dark text-white'>
                                <tr className='row'>
                                    <th className='col-3 p-1'><label >Password: </label></th>
                                    <td className='col-7 p-1'><input type="password" className="form-control" placeholder="******"  onChange={(e)=>{setpassword(e.target.value)}} /></td>
                                </tr>
                            </div>



                        </table>


                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
                <div className='col-3'></div>
            </div>
        </div>
    )
}

export default Login