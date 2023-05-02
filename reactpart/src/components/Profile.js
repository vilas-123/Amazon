import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from './context/ContextProvider'


function UpdateProfile() {
    const { userId } = useContext(AuthContext)
    const { oldpassword } = useContext(AuthContext)

    const navigator = useNavigate()

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [street, setstreet] = useState("")
    const [city, setcity] = useState("")
    const [state, setstate] = useState("")
    const [pincode, setpincode] = useState("")
    const [oldpass, setoldpass] = useState("")
    const [oldenteredpass, setoldenteredpass] = useState("")
    const [newpass, setnewpass] = useState("")
    const [err, seterr] = useState("")

    const [profile, setprofile] = useState("")
    const [address, setaddress] = useState([])
    // const [userId, setuserId] = useState("")
    const [mainaddress, setmainaddress] = useState("")
    const [primaryaddressid, setprimaryaddressid] = useState("")
    const [selectedaddressid, setselectedaddressid] = useState("")

    const [adr, setadr] = useState("")
    const [prof, setprof] = useState("")
    const [editadr, seteditadr] = useState("")
    const [editprof, seteditprof] = useState("")
    const [editaddressid, seteditaddressid] = useState("")
    const [pass, setpass] = useState("")

    const [editid, seteditid] = useState("")
    const [editstreet, seteditstreet] = useState("")
    const [editcity, seteditcity] = useState("")
    const [editstate, seteditstate] = useState("")
    const [editpincode, seteditpincode] = useState("")
    const [addid, setaddid] = useState("")
    const [addstreet, setaddstreet] = useState("")
    const [addcity, setaddcity] = useState("")
    const [addstate, setaddstate] = useState("")
    const [addpincode, setaddpincode] = useState("")
    const [addaddress, setaddaddress] = useState("")



    let lid = 0;
    // const getloggeduser = async () => {
    //     try {
    //         let response = await axios.get('http://127.0.0.1:8000/api/signup/');
    //         // console.log("users: "+response.data);
    //         // setusers(response.data);
    //         const loggedInUser = response.data.find(user => user.logged === true);
    //         console.log(loggedInUser)
    //         if (loggedInUser) {
    //             lid = loggedInUser.id;
    //             console.log("lid: ", lid)
    //             setoldpass(loggedInUser.password)
    //             setuserId(loggedInUser.id);
    //             // lid=loggedInUser.id
    //         }
    //         else {

    //             console.log("no logged user")
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     getloggeduser()
    // }, [userId])


    const getprofile = async (id) => {
        try {
            await axios.get(`http://localhost:8000/api/profile/${id}/profile`)
                .then(response => {
                    const profileData = response.data[0]; // Access the first object in the array
                    setprofile(profileData);
                    console.log(profileData);
                    const mainad = profileData.address;
                    console.log("address: ", mainad);

                    const addr = axios.get(`http://localhost:8000/api/address/${id}/address/`)
                        .then(response => {
                            const adr = response.data.find(ad => ad.id === mainad);
                            console.log(adr)
                            if (adr) {
                                setmainaddress(adr);
                                // lid=loggedInUser.id
                            }
                            else {
                                console.log("no main address")
                            }

                            // setmainaddress(response.data);
                            // console.log("mainaddress:", response.data);
                        })


                })
                .catch(error => {
                    console.log("Error retrieving profile:", error);
                });

        } catch (error) {
            console.log("No data found: " + error)
        }
    }

    const getaddress = (id) => {
        try {
            axios.get(`http://localhost:8000/api/address/${id}/address/`)
                .then(response => {
                    console.log(response.data);
                    setaddress(response.data)
                })

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        console.log(userId)
        console.log(localStorage.getItem("userId"))
        getaddress(userId)
        getprofile(userId)


    }, [userId])

    // const adrsid="",

    const editaddress = (event) => {


        event.preventDefault()
        console.log("addressid:", editid)
        console.log("street:", editstreet)
        console.log("city:", editcity)
        console.log("state:", editstate)
        console.log("pincode:", editpincode)
        axios.patch(`http://localhost:8000/api/address/${userId}/address/`, {
            id: editid,
            userid: userId,
            street: editstreet,
            city: editcity,
            state: editstate,
            pincode: editpincode


        })
            .then(response => { console.log(response.data); setadr(""); window.location.reload() })


        // .catch(error => console.log(error.response.data));
    }
    const addnewaddress = (e) => {
        e.preventDefault()
        console.log("addressid:", addid)
        console.log("street:", addstreet)
        console.log("city:", addcity)
        console.log("state:", addstate)
        console.log("pincode:", addpincode)
        axios.post(`http://localhost:8000/api/address/${userId}/address/`, {
            id: addid,
            userid: userId,
            street: addstreet,
            city: addcity,
            state: addstate,
            pincode: addpincode


        })
            .then(response => { console.log(response.data); setaddaddress(""); getaddress(userId); window.location.reload() })


        // .catch(error => console.log(error.response.data));
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const emailRegex = /^[a-zA-Z]+\d+(@gmail\.com)$/;
        const isValidEmail = emailRegex.test(email);
        if (isValidEmail) {
            let profl = ""
            try {
                profl = await axios.get(`http://localhost:8000/api/profile/${userId}/profile`)
            } catch (error) {

            }

            console.log(profl.length)
            if (profl.data.length) {
                console.log("first")
                await axios.patch(`http://localhost:8000/api/profile/${userId}/profile`, {
                    userid: userId,
                    name: name,
                    email: email,
                    phone: phone,
                    address: primaryaddressid
                    // userId,name, email, phone, primaryaddressid
                })
                    .then(response => {
                        console.log(response.data);

                        e.preventDefault()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            else {
                await axios.post(`http://localhost:8000/api/profile/${userId}/profile`, {
                    userid: userId,
                    name: name,
                    email: email,
                    phone: phone,
                    address: primaryaddressid
                    // userId,name, email, phone, primaryaddressid
                })
                    .then(response => { console.log(response.data); setprof(""); })
                    .catch(error => console.log(error))
            }
        }
        else {
            seterr("Please enter valid email !!")
        }




        console.log("submittedaddress:", primaryaddressid)
        console.log("submittedname:", name)
        console.log("submittedid:", userId)
        console.log("submittedemail:", email)
        console.log("submittedphone:", phone)
        // console.log("submittedaddress:",primaryaddressid)





    }

    const changepassword = (e) => {
        e.preventDefault()

        axios.patch(`http://localhost:8000/api/signup/${userId}/`, {
            password: newpass
        })
            .then(
                response => {
                    console.log(response.data);
                    setpass("");
                    window.location.reload()
                }
            )

        alert("New password saved successfully !!")
        navigator("/store")

        console.log(err)



    }

    return (
        <div>
            <div className='row m-4'>
                <div className='col-3'>
                    <div className='row'>

                        <div className='col-12'><button type="button" class="btn btn-secondary col-12" name='adr' value={"adr"} onClick={(e) => { getaddress(userId); setadr(e.target.value); setprof(""); seteditadr(""); seteditprof(""); setpass("") }} >Address</button></div>
                        <div className='col-12'><button type="button" class="btn btn-secondary col-12" name='prof' value={"prof"} onClick={(e) => { getprofile(userId); console.log(mainaddress); setpass(""); setadr(""); setprof(e.target.value); seteditadr(""); seteditprof("") }}>Profile</button></div>
                        <div className='col-12'><button type="button" class="btn btn-secondary col-12" name='pass' value={"pass"} onClick={(e) => { setpass(e.target.value); setadr(""); setprof(""); seteditadr(""); seteditprof(""); }} >Change Password</button></div>
                        <div className='col-12'><button type="button" class="btn btn-secondary col-12" name='editprof' value={"editprof"} onClick={(e) => { setadr(""); setpass(""); setprof(""); seteditadr(""); seteditprof(e.target.value) }}>Update Profile</button></div>
                    </div>
                </div>
                <div className='col-8 m-3'>
                    {adr && <div className='row'>
                        <div><button type="button" class="btn btn-warning" value={"addaddress"} onClick={(e) => { setaddaddress(e.target.value); setadr(""); setpass(""); setprof(""); seteditadr(""); seteditprof("") }}>Add address</button></div>
                        {address.map(adrs => (
                            <div className='col-5 m-3 h-100 w-100'>

                                <table class="table table-info">
                                    <tbody>
                                        <tr>
                                            <th>Street: </th>
                                            <td>{adrs.street}</td>
                                        </tr>
                                        <tr>
                                            <th>City: </th>
                                            <td>{adrs.city}</td>
                                        </tr>
                                        <tr>
                                            <th>State:</th>
                                            <td>{adrs.state}</td>
                                        </tr>
                                        <tr>
                                            <th>Pincode: </th>
                                            <td>{adrs.pincode}</td>
                                        </tr>
                                    </tbody>

                                </table>
                                <button type="button" className="btn btn-warning " onClick={(event) => { seteditadr('editadr'); seteditid(adrs.id); setadr(""); setprof(""); seteditprof(""); }}>Edit</button>

                            </div>)
                        )}
                    </div>}

                    {addaddress && <div className='row m-3'>
                        <div className='col-1'></div>
                        <div className='col-10 m-3 border-0'>
                            <form className='p-2' style={{ border: '2px solid grey' }} method='post' onSubmit={(e) => addnewaddress(e)}>
                                <div class="alert alert-secondary" role="alert"><b>Add Address</b></div>
                                <table className='w-100'>
                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'><label >Street: </label></th>
                                            <td className='col-7 p-1'><input type="text" className="form-control" placeholder="Street" onChange={(e) => { setaddstreet(e.target.value) }} /></td>
                                        </tr>
                                    </div>
                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'> <label >City: </label></th>
                                            <td className='col-7 p-1'><input type="text" className="form-control" placeholder="Enter City" onChange={(e) => { setaddcity(e.target.value) }} /></td>
                                        </tr>
                                    </div>

                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'><label >State: </label></th>
                                            <td className='col-7 p-1'><input type="text" className="form-control" placeholder="state" onChange={(e) => { setaddstate(e.target.value) }} /></td>
                                        </tr>
                                    </div>

                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'><label >Pincode: </label></th>
                                            <td className='col-7 p-1'><input type="Number" className="form-control" placeholder="pincode" onChange={(e) => { setaddpincode(e.target.value) }} /></td>
                                        </tr>
                                    </div>


                                </table>


                                <button type="submit" className="btn btn-warning">Submit</button>
                            </form>
                        </div>
                        <div className='col-1'></div>
                    </div>}

                    {editadr && <div className='row m-3'>
                        <div className='col-1'></div>
                        <div className='col-10 m-3 border-0'>
                            <form className='p-2' style={{ border: '2px solid grey' }} method='post' onSubmit={(e) => editaddress(e)}>
                                <div class="alert alert-secondary" role="alert"><b>Update Address</b></div>
                                <table className='w-100'>
                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'><label >Street: </label></th>
                                            <td className='col-7 p-1'><input type="text" className="form-control" placeholder="Street" onChange={(e) => { seteditstreet(e.target.value) }} /></td>
                                        </tr>
                                    </div>
                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'> <label >City: </label></th>
                                            <td className='col-7 p-1'><input type="text" className="form-control" placeholder="Enter City" onChange={(e) => { seteditcity(e.target.value) }} /></td>
                                        </tr>
                                    </div>

                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'><label >State: </label></th>
                                            <td className='col-7 p-1'><input type="text" className="form-control" placeholder="state" onChange={(e) => { seteditstate(e.target.value) }} /></td>
                                        </tr>
                                    </div>

                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'><label >Pincode: </label></th>
                                            <td className='col-7 p-1'><input type="Number" className="form-control" placeholder="pincode" onChange={(e) => { seteditpincode(e.target.value) }} /></td>
                                        </tr>
                                    </div>


                                </table>


                                <button type="submit" className="btn btn-warning">Submit</button>
                            </form>
                        </div>
                        <div className='col-1'></div>
                    </div>}

                    {prof && profile && <div className='row m-3'>
                        <div className='col-1'></div>
                        <div className='col-10 m-3 center'>
                            <table class="table table-info w-100">
                                <tbody>
                                    <tr>
                                        <th scope="row">Name: </th>
                                        <td>{profile.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email: </th>
                                        <td>{profile.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Mobile: </th>
                                        <td>{profile.phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Street: </th>
                                        <td>{mainaddress.street}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">City: </th>
                                        <td>{mainaddress.city}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">State: </th>
                                        <td>{mainaddress.state}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Pincode: </th>
                                        <td>{mainaddress.pincode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='col-1'></div>
                    </div>}


                    {editprof && <div className='row m-3'>
                        <div className='col-1'></div>
                        <div className='col-10 m-3'>
                            <form className='p-2' style={{ border: '2px solid grey' }} method='post' onSubmit={(e) => submitHandler(e)}>
                                <div class="alert alert-secondary" role="alert"><b>Update Profile</b></div>
                                {err && <div class="alert alert-danger" role="alert"><b>{err}</b></div>}
                                <table className='w-100'>
                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1 '><label >Name: </label></th>
                                            <td className='col-7 p-1'><input type="text" className="form-control" placeholder="Enter Name" onChange={(e) => { setname(e.target.value) }} /></td>
                                        </tr>
                                    </div>
                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'> <label >Email address: </label></th>
                                            <td className='col-7 p-1'><input type="email" className="form-control" placeholder="Enter email" onChange={(e) => { setemail(e.target.value) }} /></td>
                                        </tr>
                                    </div>

                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'><label >Phone: </label></th>
                                            <td className='col-7 p-1'><input type="Number" className="form-control" placeholder="9001083433" onChange={(e) => { setphone(e.target.value) }} /></td>
                                        </tr>
                                    </div>

                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-2'><label>Primary Address: </label></th>
                                            <td className='col-7 p-1'><select class="form-control" onChange={(e) => { console.log("value:", e.target.value); setprimaryaddressid(e.target.value); }}>
                                                <option >select address</option>
                                                {address.map(adrs => (
                                                    <option value={adrs.id}>{adrs.street}</option>
                                                ))}
                                            </select></td>
                                        </tr>
                                    </div>


                                </table>


                                <button type="submit" className="btn btn-warning">Submit</button>
                            </form>
                        </div>
                        <div className='col-1'></div>
                    </div>}

                    {pass && <div className='row m-3'>
                        <div className='col-1'></div>
                        <div className='col-10 m-3 border-0'>
                            <form className='p-2' style={{ border: '2px solid grey' }} method='post' onSubmit={(e) => changepassword(e)}>
                                {err && <div class="alert alert-danger" role="alert"><b>{err}</b></div>}
                                <div class="alert alert-secondary" role="alert"><b>Update Address</b></div>
                                <table className='w-100'>

                                    <div className=' mb-2 bg-dark text-white'>
                                        <tr className='row'>
                                            <th className='col-3 p-1'><label >New Password: </label></th>
                                            <td className='col-7 p-1'><input type="password" className="form-control" placeholder="******" onChange={(e) => { setnewpass(e.target.value) }} /></td>
                                        </tr>
                                    </div>
                                </table>


                                <button type="submit" className="btn btn-warning">Submit</button>
                            </form>
                        </div>
                        <div className='col-1'></div>
                    </div>}
                </div>
            </div>

        </div>
    )
}

export default UpdateProfile