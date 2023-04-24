import React, { useEffect, useState } from 'react'



function Store() {
    const [items, setItem] = useState([])
    const [cat, setcat] = useState([])
    const [subcategoryNames, setsubCategoryNames] = useState({});
    const [categoryNames, setCategoryNames] = useState({});
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
    return (
        <div>
            {/* {JSON.stringify(items)} */}
            <div className='row'>
                <div className='col-3 mt-4'>
                    {cat.map(item => (
                        <button type="button" class="btn btn-light">{item.name}</button>
                    ))}
                </div>
                <div className='col-8'>
                    <div className='container'>
                    <div className='row'>
                        {items.map(item => (
                            <div className='col-3 mt-4 mx-1 d-flex align-items-stretch'>
                                <div className="card">
                                    {/* <img className="card-img-top" src="..." alt="Card image cap"> */}
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.detail}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Price: {item.price}</li>
                                        <li className="list-group-item">{categoryNames[item.category]}</li>
                                        <li className="list-group-item">{subcategoryNames[item.subcategory]}</li>
                                    </ul>

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