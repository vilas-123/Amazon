import React, { useEffect, useState } from 'react'
import axios from 'axios'
import cart from './Cart'



function Store() {
    const [cartitems, setcartitems] = useState([])
    const [users, setusers] = useState([])
    const [userid, setuserid] = useState("")
    // const [cartitemid,setcartitemid]=useState("")
    const [items, setItem] = useState([])
    const [quantity, setquantity] = useState("0")
    const [itemid, setitemid] = useState("")
    const [cat, setcat] = useState([])
    const [subcategoryNames, setsubCategoryNames] = useState({});
    const [categoryNames, setCategoryNames] = useState({});


    const getuser = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/signup/');
            console.log(response.data);
            setusers(response.data);

            // find the logged-in user and set the userid state based on their id
            const loggedInUser = response.data.find(user => user.logged === true);
            if (loggedInUser) {
                setuserid(loggedInUser.id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getuser()
    }, []);



    console.log("userid:" + userid)
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/Product/")
            .then(response => response.json())
            .then(json => setItem(json))

        console.log(items)

        fetch("http://127.0.0.1:8000/api/category/")
            .then(response => response.json())
            .then(json => setcat(json))
    }, [])

    useEffect(() => {
        const getCategoryName = async () => {
            const categoryNames = {};
            for (const item of items) {
                const response = await fetch(item.category);
                const json = await response.json();
                categoryNames[item.category] = json.name;
            }
            setCategoryNames(categoryNames);
        };

        getCategoryName();
    }, [items]);

    useEffect(() => {
        const getsubCategoryName = async () => {
            const subcategoryNames = {};
            for (const item of items) {
                const response = await fetch(item.subcategory);
                const json = await response.json();
                subcategoryNames[item.subcategory] = json.name;
            }

            setsubCategoryNames(subcategoryNames);
        };

        getsubCategoryName();
    }, [items]);


    const addtocart = async(e, id) => {
        e.preventDefault()
        let qty=0;

        try {

            await axios.get(`http://localhost:8000/api/cartex/carts/${userid}/`)
                .then(response => {
                    // console.log(cartitems)
                    for (const cartitem of response.data) {
                        if (cartitem.productid === id) {
                            qty = cartitem.quantity
                            console.log("qty: "+qty)
                        }
                    }
                    // setcartitems(response.data)
                    })

        }
        catch (error) {
            console.log(error)
        }



        
        if (qty > 0) {
            qty=qty+1
            console.log("qty>0: "+qty)
            const token = "0971ec5ae480ee59aee0a0f7ff6da785ef7b27cd"
            await axios.patch(`http://localhost:8000/api/cartex/carts/${userid}/`, {
                'quantity': qty,
                'userid': userid,
                'productid': id
            },
                // {itemid,userid},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // add your token here
                        // 'X-CSRFToken': token
                    }
                })
                .then(response => { console.log(response.data);setquantity(response.data.quantity); console.log("status:success") })
                .catch(error => {
                    console.error(error);
                });
                
        }
        else{
            qty=1
            console.log("qty=0: "+qty)
            const token = "0971ec5ae480ee59aee0a0f7ff6da785ef7b27cd"
            await axios.post(`http://localhost:8000/api/cartex/carts/${userid}/`, {
                'quantity': qty,
                'userid': userid,
                'productid': id
            },
                // {itemid,userid},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // add your token here
                        // 'X-CSRFToken': token
                    }
                })
                .then(response => { console.log(response.data); setquantity(response.data.quantity);console.log("status:success") })
                .catch(error => {
                    console.error(error);
                });
                
        }

        
// bhai issue clear nahi ho raha call pe aja 

    }

    

    return (
        <div>
            {/* {JSON.stringify(items)} */}
            <div className='row'>
                <div className='col-3 mt-4'>
                    {cat.map(item => (
                        <button type="button" class="btn btn-light">{item.name}</button>
                    ))}
                </div>
                <div className='col-9'>
                    <div className='container'>
                        <div className='row'>
                            {items.map(item => (

                                <div className='col-md-4 '>
                                    <div className="card mx-auto mb-3 h-100">
                                        {/* <img className="card-img-top" src="..." alt="Card image cap"> */}
                                        <div className="card-body">

                                            <img src={item.image} class="img-fluid " alt="" />
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.detail}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Price: {item.price}</li>
                                            <li className="list-group-item">{categoryNames[item.category]}</li>
                                            <li className="list-group-item">{subcategoryNames[item.subcategory]}</li>
                                        </ul>


                                        <div className='row'>
                                            <div className='col-6'>
                                                <div class="form-group">
                                                    <button type="submit" className="btn btn-outline-success mt-2" name="addtocart" onClick={(e) => { setitemid(item.id); console.log(itemid); addtocart(e, item.id); }}>Add to cart</button>
                                                </div>
                                            </div>

                                            
                                        </div>



                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>
            </div>




        </div>
    )
}

export default Store