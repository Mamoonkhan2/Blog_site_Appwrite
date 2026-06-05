import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appConfig from "../appWrite/config";
import { Button, Container } from "../compounents";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const userData = useSelector((state) => state.auth.userData);
    const [image,setImage] = useState('')
    const isAuthor = post && userData ? String(post.UserId) === String(userData.$id) : false;
    useEffect(()=>{
        
        async function fetchData() {
            // You can await here
            try {
                if(slug){
                    const response = await appConfig.getPost(slug)
                    setPost(response)
                    setImage(appConfig.getFilePreview(response.featureImage ))
                    console.log('post is ',response)
                }else{
                  navigate('/');
              }
              
          } catch (error) {
              console.log(error)
          }
          // ...
        }
        fetchData();
    },[])
    const deletePost = () => {
        appConfig.deletePost(post.$id).then((status) => {
            if (status) {
                appConfig.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={image?image:null}
                        alt={post.title}
                        onClick={()=>{
                            window.location.href = image
                        }}
                        className="w-full h-full object-cover bg-amber-300 h-5"                           
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title || "Post"}</h1>
                </div>
                <div className="browser-css">
                    {/* {post.contant && parse(post.contant|| "jsljf") } */}
                    {parse(post.contant)}
                    </div>
            </Container>
        </div>
    ) : null;
}