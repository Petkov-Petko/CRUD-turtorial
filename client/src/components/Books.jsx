import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:3000/books")
                setBooks(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks();
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/books/${id}`)
            setBooks(books.filter((book) => book.id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Book Shop</h1>
            <div className='books'>
                {books.map((book) => (
                    <div className='book' key={book.id}>
                        {book.cover && <img src={book.cover} alt="book cover" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <button onClick={()=>handleDelete(book.id)} className='delete'>Delete</button>
                        <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                )
                )}
            </div>
            <div>
                <button><Link to="/add">Add new book</Link></button>
            </div>
        </div>
    )
}

export default Books