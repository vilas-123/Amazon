import React, { useEffect, useState } from 'react'
import axios from "axios"

function Add_Product() {

    const [name, setname] = useState("")
    const [price, setprice] = useState(0)
    const [details, setdetails] = useState("")
    const [category, setcategory] = useState([])
    const [subcategory, setsubcategory] = useState([])
    const [cat, setcat] = useState("")
    const [subcat, setsubcat] = useState("")



    // useEffect(()=>{
    //     const getcategory = async () =>{
    //         // setLoading(true);
    //         const response = await fetch(`http://localhost:8000/api/category/`);
    //         setcategory(await response.json());
    //         // setLoading(false);
    //     }
    //     getcategory();


    //     const getsubcategory = async () =>{
    //         // setLoading(true);
    //         const response = await fetch(`http://localhost:8000/api/subcategory/`);
    //         setsubcategory(await response.json());
    //         // setLoading(false);
    //     }
    //     getsubcategory();
    // },[])




    // const getcategory=async ()=>{
    //    await axios.get('http://127.0.0.1:8000/api/category/')
    //     // .then(response => response.json())
    //     .then(response=>{
    //         // let a  = response.data.map(e=>({
    //         //     "name":e.name,
    //         //     "url": e.url
    //         // }))
    //         // a= Array.from(a)
    //         // setcategory(a)
    //         setcategory([])
    //         category.push(...response.data)
    //         console.log(category);setcat("")
            
    //     })
    //     .catch(error => console.log(error));

    // }
    // const getsubcategory = async () =>{
    //     // setLoading(true);
    //     await axios.get('http://127.0.0.1:8000/api/subcategory/')
    //     // .then(response => response.json())
    //     .then(response=>{
    //         console.log(response.data)
    //         setsubcategory(response.data)
            
    //     })
    //     .catch(error => console.log(error));
    // }
    //     useEffect(()=>{

    //     getcategory();
    //     getsubcategory();
    // },[])




    useEffect(() => {
         fetch('http://127.0.0.1:8000/api/category/')
            .then(response => response.json())
                .then(response=>{
                    console.log(response.data)
                    setcategory(response.data)
                    
                })
                .catch(error => console.log(error));

                fetch('http://127.0.0.1:8000/api/subcategory/')
                .then(response => response.json())
                    .then(response=>{
                        console.log(response.data)
                        setsubcategory(response.data)
                        
                    })
                    .catch(error => console.log(error));
        
    }, []);

    const submithandler = (e) => {
        e.preventDefault()

        axios.post('http://127.0.0.1:8000/api/Product/', {
            name,
            price,
            details,
            cat,
            subcat
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))


    }


    return (
        <div>
            {category}
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-4'>
                    <form onSubmit={(e) => submithandler(e)} method='post'>
                        <div className="form-group">
                            <label >Name: </label>
                            <input type="text" className="form-control" name='name' placeholder={name} onChange={(e) => { setname(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label >Price: </label>
                            <input type="number" className="form-control" name='price' placeholder={price} onChange={(e) => { setprice(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label >Details: </label>
                            <input type="textArea" className="form-control" name='details' placeholder={details} onChange={(e) => { setdetails(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label>Category: </label>
                            <select className="form-control" name='cat' onChange={(e) => { setcat(e.target.value) }}>
                                {category?.map(options => (
                                    <option  value={options.url}>{options.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Sub Category: </label>
                            <select className="form-control" name='subcat' onChange={(e) => { setsubcat(e.target.value) }}>
                                {subcategory.map(options => (
                                    <option  value={options.url}>{options.name}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-warning">Submit</button>
                    </form>
                </div>
                <div className='col-4'></div>
            </div>
        </div>
    )
}

export default Add_Product