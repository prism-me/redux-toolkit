import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blogAdded,
  blogRemoved,
  blogsReceived,
  loadBlogs,
} from "./state/feature/blog";
import { Form, Container, Button, Spinner } from "react-bootstrap";
import Navbar from "./Navbar";

function BlogList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog);
  const [blog, setBlog] = useState([]);

  const fetchData = () => {
    dispatch(loadBlogs());
  };

  useEffect(() => {
    fetchData();
    console.log("hello");
  }, []);

  setTimeout(() =>{
    fetchData();
  } , 3000);

  return (
    <Container>
        <Navbar />
      <h2 className="mt-5">Blog List </h2>

      {data.isLoaded ? (
        <div className="flex flex-center"><Spinner animation="grow" /></div>
      ) : (
        data?.blogs?.map((x, index) => (
          <div key={x.id} className="my-4 shadow-sm p-5 bg-body rounded">
            <h3>{x.title}</h3>
            <div>{x.body}</div>
            <Button
              variant="danger"
              onClick={() => dispatch(blogRemoved({ index }))}
            >
              Remove Item
            </Button>
          </div>
        ))
      )}
    </Container>
  );
}

export default BlogList;
