import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from './context/ContextProvider';

function Store() {
    const { userId } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [cat, setCat] = useState([]);
    const [subcategoryNames, setSubCategoryNames] = useState({});
    const [categoryNames, setCategoryNames] = useState({});
    const [currentpage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;
    const [categorySelect, setCategorySelect] = useState('');

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/Product/');
            setItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addtocart = async (e, id) => {
        e.preventDefault();

        if (!userId) {
            alert('Please login to continue!');
            return;
        }

        const token = "0971ec5ae480ee59aee0a0f7ff6da785ef7b27cd";

        try {
            const response = await axios.get(`http://localhost:8000/api/cartex/carts/${userId}/`);
            const existingCartItem = response.data.find((cartitem) => cartitem.productid === id);

            if (existingCartItem) {
                // If item already exists in cart, update quantity
                const newQuantity = existingCartItem.quantity + 1;
                await axios.patch(
                    `http://localhost:8000/api/cartex/carts/${userId}/${existingCartItem.id}/`,
                    { quantity: newQuantity },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                alert('Item quantity updated in cart!');
            } else {
                // If item does not exist in cart, add new item
                await axios.post(
                    `http://localhost:8000/api/cartex/carts/${userId}/`,
                    { quantity: 1, userid: userId, productid: id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                alert('Item added to cart!');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again later.');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/category/');
            setCat(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);

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
        const getSubCategoryName = async () => {
            const subcategoryNames = {};
            for (const item of items) {
                const response = await fetch(item.subcategory);
                const json = await response.json();
                subcategoryNames[item.subcategory] = json.name;
            }

            setSubCategoryNames(subcategoryNames);
        };

        getSubCategoryName();
    }, [items]);

    const filterByCategory = (categoryId) => {
        if (categoryId === categorySelect) {
            setCategorySelect('');
            setCurrentPage(1);
        } else {
            setCategorySelect(categoryId);
            setCurrentPage(1);
        }
    };

    const filteredItems = items.filter((item) => {
        if (!categorySelect) {
            return true;
        }
        return item.category.toString() === categorySelect.toString();
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentpage * recordsPerPage;
    const indexOfFirstItem = indexOfLastItem - recordsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredItems.length / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='container-fluid mt-4'>
            <div className='row'>
                <div className='col-md-3 bg-light sidebar'>
                    <div className='sticky-top'>
                        <div className='list-group'>
                            <button
                                className={`list-group-item list-group-item-action ${categorySelect === '' ? 'active' : ''}`}
                                onClick={() => filterByCategory('')}
                            >
                                All Categories
                            </button>
                            {cat.map((category) => (
                                <button
                                    key={category.url}
                                    className={`list-group-item list-group-item-action ${categorySelect === category.url ? 'active' : ''}`}
                                    onClick={() => filterByCategory(category.url)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-md-9'>
                    <div className='row'>
                        {currentItems.map((item) => (
                            <div key={item.id} className='col-md-4 mb-3'>
                                <div className='card'>
                                    <img src={item.image} className='card-img-top' alt={item.name} />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{item.name}</h5>
                                        <p className='card-text'>{item.details}</p>
                                        <ul className='list-group list-group-flush'>
                                            <li className='list-group-item'>Price: {item.price}</li>
                                            <li className='list-group-item'>Category: {categoryNames[item.category]}</li>
                                            <li className='list-group-item'>Subcategory: {subcategoryNames[item.subcategory]}</li>
                                        </ul>
                                        <button
                                            className='btn btn-success mt-2'
                                            onClick={(e) => addtocart(e, item.id)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <nav aria-label='Page navigation'>
                        <ul className='pagination justify-content-center'>
                            {pageNumbers.map((number) => (
                                <li
                                    key={number}
                                    className={`page-item ${currentpage === number ? 'active' : ''}`}
                                >
                                    <button
                                        onClick={() => handlePageChange(number)}
                                        className='page-link'
                                    >
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Store;
