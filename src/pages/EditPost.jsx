import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appConfig from '../appWrite/config';
import {Container, PostForm} from '../compounents'
function EditPost() {
    const [posts, setPost] = useState({});
    
    const navigate = useNavigate();
    
    // i will get the current post id idk
    const {slug} = useParams();
    useEffect(()=>{
      
        async function fecth() {
            try {
                
                if(slug) {
                  const response = await  appConfig.getPost(String(slug),"from inside edit post")
                    setPost(response);
                }
                else{
                    navigate("/");
                }
            } catch (error) {
                console.log(error)
            }
            
        }
        fecth();

    },[slug,navigate])
    return posts ? (
        <div className='py-8'>
            <Container>            
                <PostForm
                    post={posts}
                    />
            </Container>
        </div>
    ) : null ;
}

export default EditPost