import React, { useContext, useEffect, useState } from 'react'
import Cart from './Cart'
import axios from 'axios'
import AuthContext from './context/ContextProvider'

function Order() {

   


    const { userId } = useContext(AuthContext)
    const [cartitem, setcartitem] = useState([])
    const [products, setproducts] = useState([])
    const [userid, setuserid] = useState("")
    

    const getproduct = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/Product/")
            setproducts(result.data)

          

        } catch (error) {
            console.log(error);
        }
    }
    // const getuser = async () => {
    //     try {
    //         const response = await axios.get('http://127.0.0.1:8000/api/signup/');
    //         console.log(response.data);
    //         // setusers(response.data);
    //         const loggedInUser = response.data.find(user => user.logged === true);
    //         if (loggedInUser) {
    //             setuserid(loggedInUser.id);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const getcart = async () => {

        try {
            console.log("userid:" + userId)
            await axios.get(`http://localhost:8000/api/order/order/${userId}/`)
                .then(response => {
                    let arr = []
                    // console.log("cartitems:-")
                    // console.log(response.data)
                    // console.log("products:-")
                    // console.log(products)
                    console.log("response: ", response.data)
                    let sum = 0
                    console.log("products:", products)
                    for (const product of products) {
                        for (const citm of response.data) {
                            if (product.id === citm.productid) {
                                console.log("citem: ", citm)
                                const obj = {
                                    'name': product.name,
                                    'price': product.price,
                                    'status': citm.status,
                                    'productid': product.id,
                                    'date': citm.date_created,
                                    'quantity': citm.quantity,

                                }
                                arr.push(obj)

                            }
                        }
                    }
                    console.log("arr", arr)
                    return arr                // setcartitems(response.data)
                })
                .then(response => {
                    console.log(response)
                    setcartitem(response);


                })

        }
        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getproduct()
    }, [userId]);

    useEffect(() => {
        getcart()
    }, [products, userId])



   

    return (
        <div>
            {cartitem?.length && <div>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Item name</th>
                                <th>Status</th>
                                <th>Quantity</th>
                                <th>Paid</th>
                                <th>Order Date</th>


                            </tr>
                        </thead>
                        <tbody>
                            {cartitem.map(i => (
                                <tr>
                                    <td scope="row">{i.name}</td>
                                    {i.status === true ? <td>completed</td> : <td>pending</td>}
                                    <td>{i.quantity}</td>
                                    <td>{(i.price)*(i.quantity)}</td>
                                    <td>{i.date}</td>


                                </tr>)
                            )}


                        </tbody>
                        

                    </table>
                </div>


            </div>}
            {!cartitem?.length && <div className='alert alert-danger'>Order Khali hai anna !!!</div>}


        </div>
    )
}

export default Order