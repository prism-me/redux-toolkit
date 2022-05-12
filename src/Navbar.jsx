import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogAdded, blogRemoved } from "./state/feature/blog";
import { Form, Container, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link to="/">Blog</Link>
      <Link to="/bloglist">Blog List</Link>
    </>
  );
}

export default Navbar;
