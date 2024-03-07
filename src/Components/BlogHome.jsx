import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Story from "./Story";
import { GetAllStoryApi } from "../Utils/api";
import { BounceLoader } from "react-spinners";

const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    

const fetchData=async()=>{
  try {
    const response=await GetAllStoryApi();
    console.log(response.data.data);
    setPosts(response.data.data);
        setLoading(false);
  } catch (error) {
    
    console.error("An error occurred while fetching blog posts:", error);
        setLoading(false);
  }
}
 fetchData();   
  
  }, []);

  return (
    <Container className="">
      <h1>All Blog</h1>
      {loading ? (
       
    <div sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'fixed', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 9999 }}>
      <BounceLoader color="#36d7b7" loading={loading} size={200} />
    </div>
      ) : (
        <div>
          {Array.isArray(posts) && posts.length > 0 ? (
            
            posts.map((post) => <Story key={post._id} {...post} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      )}
    </Container>
  );
};

export default BlogHome;
