import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Signup() {

    const [error, seterror] = useState("")
    const [user, setuser] = useState([])
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/signup/')
                setuser(response.data)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        console.log("Hello")
        getdata()
    }, [user])
    console.log("Hello2")
    console.log(user)
    const submitHandler = (e) => {
        e.preventDefault()
        // alert(user.data)
        var flag = false
        user.map(users => (
            users.email === email ? flag = true : false
        ))

        if (flag) {
            seterror("email already exist")
        }
        else {
            axios.post('http://127.0.0.1:8000/api/signup/', {
                name, email, password
            })
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }



    }

    return (
        <div>
            <div>
                {/* {user?user.map(users=>(<div key={users.id}>{users.name}</div>)):""} */}
            </div>
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4 border-0'>
                    <form method='post' onSubmit={(e) => submitHandler(e)}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" className="form-control" placeholder="Enter Name" name='name' onChange={(e) => { setname(e.target.value) }} />

                        </div>
                        <div className="form-group">
                            <label>Email address: </label>
                            <input type="email" className="form-control" placeholder="Enter email" name='email' onChange={(e) => { setemail(e.target.value) }} />
                            {error&&<div className='alert-alert-danger' role='alert'>{error}</div>}
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password: </label>
                            <input type="password" className="form-control" placeholder="Password" name='password' onChange={(e) => { setpassword(e.target.value) }} />
                        </div>
                        <button type="submit" className="btn btn-warning">Submit</button>
                    </form>
                </div>
                <div className='col-4'></div>
            </div>
        </div>
    )
}

export default Signup