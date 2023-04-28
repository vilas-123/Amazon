import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Login() {
    // const [logged, setlogged] = useState('')
    const [users, setusers] = useState([])
    const [email, setemail] = useState("")
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
        const flag = false
        for (const user of users) {
            console.log(user)
            if (user.email === email) {
                axios.patch(`http://127.0.0.1:8000/api/signup/${user.id}/`,
                    { logged: true },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // add your token here
                        }
                    })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                flag = true
            }
        }
        if (!flag) {
            seterrormsg("User doesn't exists !!!")
        }


        window.location.replace('store')
    }


    return (
        <div>
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4 border-0'>
                    <form onSubmit={(e) => submithandler(e)} method='post'>
                        {errormsg && <div class="alert alert-danger" role="alert">{errormsg}</div>}


                        <div className="form-group">
                            <label >Email address: </label>
                            <input type="email" className="form-control" placeholder="Enter name" name='email' onChange={(e) => { setemail(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label >Password: </label>
                            <input type="password" className="form-control" placeholder="Password" name='password' />
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