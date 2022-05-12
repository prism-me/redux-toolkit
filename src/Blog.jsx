import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogAdded, blogRemoved  ,addBlog} from "./state/feature/blog";
import { Form, Container, Button } from "react-bootstrap";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "./state/feature/actions";
import Navbar from "./Navbar";

function Blog() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog.blogs);
  const [blog, setBlog] = useState({
    title: "",
    body: "",
  });

  let handleAddBlog = () => {
    dispatch(addBlog({ title: blog.title, body: blog.body }));
  };
  let handleInput = (e) => {
    if (e.target.value !== "") {
      setBlog({ ...blog, [e.target.name]: e.target.value });
    }
    console.log(blog);
  };

  let handleRemove = (id) => {
      console.log(id);
    dispatch(blogRemoved({ id }));
  };




  return (
    <Container>
      <Navbar/>
      <Form className="mt-4">
        <h2>Add Blog</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            rows={3}
            onChange={handleInput}
          />
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={handleAddBlog}>
        Add Blog
      </Button>

      <h2 className="mt-5">Blog List </h2>
      {data?.map((x , index) => (
        <div key={x.id} className="my-4">
          <h3>{x.title}</h3>
          <div>{x.body}</div>
          <Button variant="danger" onClick={() => dispatch(blogRemoved({ index }))}>
            Remove Item
          </Button>
        </div>
      ))}
    </Container>
  );
}

export default Blog;
