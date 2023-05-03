import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import cart from './Cart'
import AuthContext from './context/ContextProvider'



function Store() {
    const { userId } = useContext(AuthContext)
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
    const [categoryselect, setcategoryselect] = useState("")


    const [currentpage, setcurrentpage] = useState(1)
    const recordsperpage = 3;
    const lastindex = currentpage * recordsperpage
    const firstindex = lastindex - recordsperpage
    let records = items.slice(firstindex, lastindex);
    let npage = Math.ceil(items.length / recordsperpage);
    let numbers =  [...Array(npage + 1).keys()].slice(1);

    // console.log("records:", records);


    // const getuser = async () => {
    //     try {
    //         const response = await axios.get('http://127.0.0.1:8000/api/signup/');
    //         console.log(response.data);
    //         setusers(response.data);

    //         // find the logged-in user and set the userid state based on their id
    //         const loggedInUser = response.data.find(user => user.logged === true);
    //         if (loggedInUser) {
    //             setuserid(loggedInUser.id);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getuser()
    // }, []);



    console.log("userid:" + userid)
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/Product/")
            .then(response => response.json())
            .then(json => {
                setItem(json)

            })

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


    const addtocart = async (e, id) => {

        e.preventDefault()
        let qty = 0;

        if (userId) {


            try {

                await axios.get(`http://localhost:8000/api/cartex/carts/${userId}/`)
                    .then(response => {
                        // console.log(cartitems)
                        for (const cartitem of response.data) {
                            if (cartitem.productid === id) {
                                qty = cartitem.quantity
                                console.log("qty: " + qty)
                            }
                        }
                        // setcartitems(response.data)
                    })

            }
            catch (error) {
                console.log(error)
            }




            if (qty > 0) {
                qty = qty + 1
                console.log("qty>0: " + qty)
                const token = "0971ec5ae480ee59aee0a0f7ff6da785ef7b27cd"
                await axios.patch(`http://localhost:8000/api/cartex/carts/${userId}/`, {
                    'quantity': qty,
                    'userid': userId,
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
                    .then(response => { console.log(response.data); setquantity(response.data.quantity); console.log("status:success") })
                    .catch(error => {
                        console.error(error);
                    });

            }
            else {
                qty = 1
                console.log("qty=0: " + qty)
                const token = "0971ec5ae480ee59aee0a0f7ff6da785ef7b27cd"
                await axios.post(`http://localhost:8000/api/cartex/carts/${userId}/`, {
                    'quantity': qty,
                    'userid': userId,
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
                    .then(response => { console.log(response.data); setquantity(response.data.quantity); console.log("status:success") })
                    .catch(error => {
                        console.error(error);
                    });

            }
        }
        else {
            alert("Please login to continue !!")

        }


        // bhai issue clear nahi ho raha call pe aja 

    }


    const filteritem = (e, val) => {
        setItem(items.filter(i => (i.name.toString()).toLowerCase().includes((e.target.value.toString()).toLowerCase())));
    }


    const nextpage = () => {
        if (currentpage !== npage) {
            setcurrentpage(currentpage + 1)
        }
    }
    const prepage = () => {
        if (currentpage !== 1) {
            setcurrentpage(currentpage - 1)
        }
    }
    const changepage = (id) => {
        setcurrentpage(id)
    }

    return (
        <div>
            {/* {JSON.stringify(items)} */}
            <div className="container mb-2 mt-2">
                <div className="d-flex justify-content-end">
                    <input className="form-control w-25 " type="search" placeholder="Search" aria-label="Search" onChange={(e) => filteritem(e, e.target.value)} />
                    <button className="btn btn-outline-success my-2 my-sm-0 ml-2" type="submit">Search</button>
                </div>
            </div>


            <div className='row'>
                <div className='col-3 mt-4'>
                    <div className='row'>
                        {cat.map(item => (
                            <button type="button" class="btn btn-secondary col-6 ml-4" value={item.url} onClick={(e) => {
                                setItem(items.filter(i => i.category.toString() === e.target.value.toString()));
                            }}>{item.name}</button>
                        ))}
                    </div>
                </div>
                <div className='col-9'>


                    <div className='container'>
                        <div className='row'>

                            {records.map(item => (

                                <div className='col-md-4 '>
                                    <div class="modal fade" id={`myModal${item.id}`} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="myModalLabel">{item.name}</h5>

                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div className='row'>
                                                        <div className='col'><img src={item.image} class="img-fluid " alt="" /></div>
                                                        <div className='col'>
                                                            <p>{item.detail}</p>
                                                            <ul className="list-group list-group-flush">
                                                                <li className="list-group-item">{item.details}</li>
                                                                <li className="list-group-item">Price: {item.price}</li>

                                                                <li className="list-group-item">{categoryNames[item.category]}</li>
                                                                <li className="list-group-item">{subcategoryNames[item.subcategory]}</li>
                                                            </ul>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mx-auto mb-3 h-100">
                                        {/* <img className="card-img-top" src="..." alt="Card image cap"> */}
                                        <div className="card-body">

                                            <img src={item.image} class="img-fluid " alt="" />
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.details}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Price: {item.price}</li>
                                            <li className="list-group-item">{categoryNames[item.category]}</li>
                                            <li className="list-group-item">{subcategoryNames[item.subcategory]}</li>
                                        </ul>


                                        <div className='row'>
                                            <div className='col-6'>
                                                <div class="form-group">
                                                    <button type="submit" className="btn btn-outline-success mt-2" name="addtocart" onClick={(e) => { setitemid(item.id); console.log(itemid); addtocart(e, item.id); }}><span className='danger'>{item.quantity}</span>Add to cart</button>

                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <button type="button" class="btn btn-outline-success mt-2" data-toggle="modal" data-target={`#myModal${item.id}`}>
                                                    view
                                                </button>
                                            </div>




                                        </div>



                                    </div>
                                </div>

                            ))}
                            <nav>
                                <ul className='pagination'>
                                    <li className='page-item'>
                                        <a href='#' className='page-link' onClick={prepage}>Prev </a>
                                    </li>
                                    {
                                        numbers.map((n, i) => {
                                            <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={i}>
                                                <a href='#' className='page-item' onClick={() => changepage(n)}>{n} </a>
                                            </li>
                                        })
                                    }
                                    <li className='page-item'>
                                        <a href='#' className='page-link' onClick={nextpage}>next </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>




        </div>
    )
}

export default Store