import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AddProduct() {

    const [categorylist, setcategorylist] = useState([])
    const [subcategorylist, setsubcategorylist] = useState([])
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [details, setdetails] = useState("")
    const [category, setcategory] = useState("")
    const [subcategory, setsubcategory] = useState("")
    const [image, setimage] = useState("")

    const [error, seterror] = useState("")
    // const [priceerror, setpriceerror] = useState("")
    // const [detailserror, setdetailserror] = useState("")
    // const [caterror, setcaterror] = useState("")
    // const [subcaterror, setsubcaterror] = useState("")


    const getcategory = () => {
        axios.get("http://127.0.0.1:8000/api/category/")
            .then(response => {
                setcategorylist(response.data)
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    const getsubcategory = () => {
        axios.get("http://127.0.0.1:8000/api/subcategory/")
            .then(response => {
                setsubcategorylist(response.data)
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getcategory();
        getsubcategory();
    }, [])


    const submithandler = (e) => {
        e.preventDefault()
        if (name === "") {
            console.log("error occured")
            seterror("Please fill name !!!")
        }
        else if (price === "") {
            console.log("error occured")
            seterror("Please fill price !!!")
        }
        else if (details === "") {
            console.log("error occured")
            seterror("Please fill details !!!")
        }
        else if (image === "") {
            console.log("error occured")
            seterror("Please fill image !!!")
        }
        else if (category === "") {
            console.log("error occured")
            seterror("Please fill category !!!")
        }
        else if (subcategory === "") {
            console.log("error occured")
            seterror("Please fill subcategory !!!")
        }
        else {
            // const token = "0971ec5ae480ee59aee0a0f7ff6da785ef7b27cd"
            console.log("i am in post method")
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('details', details);
            formData.append('image', image);
            formData.append('category', category);
            formData.append('subcategory', subcategory);

            axios.post("http://127.0.0.1:8000/api/Product/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log("post data is:- " + response.data)
                    seterror("")
                })
                .catch(err => {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    seterror("Error occurred while adding product!");
                })
        }

    }

    return (
        <div>
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <form onSubmit={(e) => submithandler(e)} encType="multipart/form-data">
                        {error !== "" && <div class="alert alert-danger" role="alert">{error}</div>}
                        <div className="form-group">
                            <label >Name: </label>
                            <input type="text" name="name" className="form-control" onChange={(e) => { setname(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label >Price: </label>
                            <input type="text" name="price" className="form-control" onChange={(e) => { setprice(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label >Details: </label>
                            <input type="text" name="details" className="form-control" onChange={(e) => { setdetails(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label >Image: </label>
                            <input type="file" name="image" className="form-control" onChange={(e) => { setimage(e.target.files[0]) }} />
                        </div>

                        <div class="form-group">
                            <label for="">Category: </label>
                            <select class="form-control" name="category" onChange={(e) => { setcategory(e.target.value);; console.log(category) }}>
                                {categorylist.map(cat => (
                                    <option value={cat.url}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="">SubCategory: </label>
                            <select class="form-control" name="subcategory" onChange={(e) => { setsubcategory(e.target.value); console.log(subcategory) }}>
                                {subcategorylist.map(subcat => (
                                    <option value={subcat.url}>{subcat.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" class="btn btn-outline-success">Add Product</button>
                    </form>
                </div>
                <div className='col-4'></div>
            </div>
        </div>
    )
}

export default AddProduct