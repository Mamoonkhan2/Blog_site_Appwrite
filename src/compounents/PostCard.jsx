import React from 'react'
import { Link } from 'react-router-dom'
import appConfig from '../appWrite/config'

function PostCard({$id,title,featureImage}) { // featureImage it is the name of the field in the database that contains the URL of the image
  const [featureImages,setfeatueImages] = React.useState([]);
  React.useEffect(() => {
    if(featureImage) {
        const a = appConfig.getFilePreview(featureImage)
        setfeatueImages(a) 
        console.log(a)
    }
  },[])
  return (
    <Link to={`/post/${$id}`} className='border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
      <img src={featureImages} alt={title} className='w-full h-48 object-cover' />
      <div className='p-4'>
        <h3 className='text-xl font-bold mb-2'>{title}</h3>
      </div>
    </Link>
  )
}

export default PostCard