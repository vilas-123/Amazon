import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Index() {
    const navigate=useNavigate()

    const [loggedid, setloggedid] = useState("")
    const [users, setusers] = useState([])
    const [superuser,setsuperuser]=useState("")

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/signup/")
            .then(response => { console.log(response.data); setusers(response.data) })

    }, []);

    useEffect(() => {
        for (const user of users) {
            if (user.logged === true) {
                setsuperuser(user.superuser)
                setloggedid(user.id)
                console.log(user.id)
            }
            
        }
    })

    const logout = (e) => {
        setsuperuser(false)

        // console.log(users[0].id)
        console.log("loggedid:" + loggedid)
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
        navigate("/store")
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
                        {superuser===true && <li className="nav-item">
                            <a className="nav-link" href="AddProduct" >{superuser}Add Product</a>
                        </li>}
                        {loggedid &&<li className="nav-item">
                            <a className="nav-link" href="cart" >cart</a>
                        </li>}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Account
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {!loggedid && <a className="dropdown-item" href="login" >Login</a>}
                                {!loggedid && <a className="dropdown-item" href="Signup" >Signup</a>}
                                {loggedid && <a className="dropdown-item" href="Profile" >Profile</a>}
                                {loggedid && <a className="dropdown-item" href="order" >Your Order</a>}
                                {loggedid && <a className="dropdown-item" href="#" onClick={(e) => { logout() }}>Logout</a>}
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            {/* <div className='m-3'>
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100 " height={500} src="images/img1.jpg" alt="First slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" height={500} src="images/img2.jpg" alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" height={500} src="images/img3.jpg" alt="Third slide"/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            </div> */}
        </div>
    )
}

export default Index