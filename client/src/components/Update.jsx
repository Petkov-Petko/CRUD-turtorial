import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Update = () => {
  const [books, setBooks] = useState({
    title: "",
    desc: "",
    cover: ""
  })
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBooks(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.put("http://localhost:3000/books/" + bookId, books)
      navigate("/")
    } catch (error) {
      console.log(error);
    }

  }

  console.log(books);

  return (
    <div className="form">
      <h1>Update book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title" />
      <input type="text" placeholder="desc" onChange={handleChange} name="desc" />
      <input type="text" placeholder="cover" onChange={handleChange} name="cover" />
      <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update