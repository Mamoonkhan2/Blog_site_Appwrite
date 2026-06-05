import React, { useEffect,useState } from 'react'
import appConfig from '../appWrite/config';
import {Container, PostCard} from '../compounents'
function HomePage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
       appConfig.getPosts([]).then((posts) => {
           if (posts) {
               setPosts(posts.documents); // 3. Update state with the documents array
           }
       }) 
    },[])
    if(!posts || posts.length === 0) return <>
        <h1>NOPosts...</h1>
    </>;
    return (
       <div className='w-full h-screen py-8'>
            <Container>

                    <div className='flex flex-wrap '>

        {                posts.map(({$id,title,featureImage})=>
                                <div key={$id} className='p2 w-1/4 m-2'>
                                <PostCard $id={$id} title={title} featureImage={featureImage} />

                                </div>
                        )            
        }            </div>
                
            </Container>
        </div>
    )
}

export default HomePage