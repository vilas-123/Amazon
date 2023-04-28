import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Index() {

    const [loggedid,setloggedid]=useState("")
    const [users,setusers]=useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/signup/")
        .then(response=>{console.log(response.data);setusers(response.data)})
        
      }, []);

      useEffect(()=>{
        for(const user of users){
            if(user.logged===true){
                setloggedid(user.id)
                console.log(user.id)
            }
        }
      })
    
      const logout = (e) => {
        
        // console.log(users[0].id)
        console.log("loggedid:"+loggedid)
        const token = "0971ec5ae480ee59aee0a0f7ff6da785ef7b27cd"
        axios.patch(`http://127.0.0.1:8000/api/signup/${loggedid}/`,
                    { logged: false },
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
                    window.location.reload()
      };
    
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Beehyv</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="Home">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="store" >Store</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="AddProduct" >Add Product</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="cart" >cart</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Account
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {!loggedid && <a className="dropdown-item" href="login" >Login</a>}
                            {!loggedid && <a className="dropdown-item" href="Signup" >Signup</a>}
                            {loggedid && <a className="dropdown-item" href="ChangePassword">Change Password</a>}
                            {loggedid && <a className="dropdown-item" href="UpdateProfile" >Update Profile</a>}
                            {loggedid && <a className="dropdown-item" href="order" >Your Order</a>}
                            {loggedid && <a className="dropdown-item" href="#" onClick={(e)=>{logout()}}>Logout</a>}
                        </div>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
        
    </div>
  )
}

export default Index