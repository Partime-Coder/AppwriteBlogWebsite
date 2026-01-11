import React from 'react'
import { Container, PostForm } from '../components'


function AddPost() {
  return (
    <div className='w-full py-8'>
        <Container>
              <h1 className="text-3xl font-bold text-center mb-6 text-purple-500">Add New Post</h1>
      <p className="text-center text-gray-600 mb-6">
        Fill in the details below to publish your post.
      </p>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost