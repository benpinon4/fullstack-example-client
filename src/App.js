import "./App.css";
import { useState, useEffect } from "react";

const urlEndpoint = "http://localhost:4000";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [oneBlog, setOneBlog] = useState({});
  const [oneBlogByID, setOneBlogByID] = useState({});
  const [oneBlogByIDDD, setOneBlogByIDDD] = useState({});
  const [id, setId] = useState("e39a30b5-4507-4d6f-b9cf-72e4c7d3c779");
  const [idDrop, setIdDrop] = useState("35a04237-507c-45f5-b770-3ce2c2fd088b");

  useEffect(() => {
    const fetchBlogs = async () => {
      const result2 = await fetch(`${urlEndpoint}/blogs/fromDB`);

      const fetchedDBblogs = await result2.json();

      setBlogs(fetchedDBblogs.allblogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchOne = async () => {
      const resultOne = await fetch(`${urlEndpoint}/blogs/getone`);
      const fetchedOneBlog = await resultOne.json();

      setOneBlog(fetchedOneBlog.oneBlog);
    };
    fetchOne();
  }, []);

  useEffect(() => {
    const fetchOneByID = async () => {
      const resultOneByID = await fetch(`${urlEndpoint}/blogs/getByID/${id}`);
      const fetchedOneByID = await resultOneByID.json();
      setOneBlogByID(fetchedOneByID.oneBlogByID);
    };
    fetchOneByID();
  }, [id]);

  useEffect(() => {
    const fetchOneFromDropDown = async () => {
      const resultOneDD = await fetch(`${urlEndpoint}/blogs/getByID/${idDrop}`);
      const fetchedOneDD = await resultOneDD.json();
      console.log(fetchedOneDD)
      setOneBlogByIDDD(fetchedOneDD.oneBlogByID);
    };
    fetchOneFromDropDown();
  }, [idDrop]);

  return (
    <div className="App">
      <header className="App-header">
        {blogs.map((blog, index) => {
          return <div key={index}>{blog.title}</div>;
        })}
        <br></br>
        SingleBlog:
        <br></br>
        {oneBlog.title}
        <br></br>
        <br></br>
        Blog By ID Text Input:
        <input
          type="text"
          onChange={(e) => {
            setId(e.target.value);
          }}
        ></input>
        {oneBlogByID.author}
        <br></br>
        <br></br>
        Select By Dropdown
        <select onChange={(e) => {
                  console.log(e.target.value)
                  setIdDrop(e.target.value);
                }}>
          <option></option>
          {blogs.map((blog, index) => {
            return (
              <option
                value={blog.id}
                key={index}
                
              >
                {blog.id}
              </option>
            );
          })}
        </select>
        {oneBlogByIDDD.title}
      </header>
    </div>
  );
}

export default App;
