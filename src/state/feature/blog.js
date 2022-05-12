import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions";
import moment from "moment";
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    totalCount: 0,
    blogs: [],
    isLoaded: false,
    lastFetch: null,
  },
  reducers: {
    blogsLoadStarted: (state, action) => {
      state.isLoaded = true;
    },
    blogsReceived: (state, action) => {
      state.blogs = action.payload;
      state.isLoaded = false;
      state.totalCount = action.payload.length;
      state.lastFetch = Date.now();
    },
    blogAdded: (state, action) => {
      state.blogs.push({
        userId: 1,
        id: ++state.totalCount,
        title: action.payload.title,
        body: action.payload.body,
      });
    },
    blogRemoved: (state, action) => {
      state.blogs.splice(action.payload.index, 1);
      state.totalCount = state.totalCount - 1;
    },
    blogsLoadFailed: (state, action) => {
      state.isLoaded = false;
    },
  },
});

export const {
  blogAdded,
  blogRemoved,
  blogsReceived,
  blogsLoadStarted,
  blogsLoadFailed,
} = blogSlice.actions;
export default blogSlice.reducer;

export const loadBlogs = () => (dispatch, getState) => {
  const { lastFetch } = getState().blog;

  console.log(lastFetch);

  const diffInTime = moment().diff(moment(lastFetch), "minutes");

  if (diffInTime < 10) return;

  dispatch(
    apiCallBegan({
      url: "/posts",
      onStart: blogsLoadStarted.type,
      onSuccess: blogsReceived.type,
      onError: blogsLoadFailed.type,
    })
  );
};

export const addBlog = blog => apiCallBegan({
  url : '/posts',
  method : 'POST',
  data : blog ,
  onSuccess : blogAdded.type,
})

// export const loadBlogs = () =>
//   apiCallBegan({
//     url: "/posts",
//     onStart: blogsLoadStarted.type,
//     onSuccess: blogsReceived.type,
//     onError: blogsLoadFailed.type,
//   });
