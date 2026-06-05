import React from 'react'
import appConfig from '../appWrite/config';
import {Container, PostCard, PostForm} from '../compounents'
import {useEffect} from 'react';
import { Link } from 'react-router-dom';
function AllPost() {
    const [post, setPosts] = React.useState([]);
    
        // 2. Fetch data inside useEffect to prevent infinite loops
        useEffect(() => {
            
            appConfig.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents); // 3. Update state with the documents array
                }
            });
        },[])
    return (
        <div className='w-full h-screen py-8'>
            <Container>

                    <div className='flex flex-wrap '>

        {                post.map(({$id,title,featureImage})=>
                                <div key={$id} className='p2 w-1/4 m-2'>
                                <PostCard $id={$id} title={title} featureImage={featureImage} />

                                </div>
                        )            
        }            </div>
                
            </Container>
        </div>
    )
}

export default AllPost