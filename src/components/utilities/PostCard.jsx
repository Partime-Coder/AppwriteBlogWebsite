import React from 'react'
import service from '../../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({$id , title , image }) {
   return (
   <Link to={`/post/${$id}`} className="w-full  p-4">
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
    
    {/* Image */}
    <div className="w-full h-40 overflow-hidden">
      <img
        src={service.getFileView(image)}
        alt={title}
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* Content */}
    <div className="p-4 flex-1 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      
      <span className="mt-4 text-blue-500 text-sm font-medium hover:underline">Read more →</span>
    </div>
  </div>
</Link>
  )
}

export default PostCard