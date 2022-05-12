import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./Blog";
import BlogList from "./BlogList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route index element={<Blog />} />
            <Route path="bloglist" element={<BlogList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
