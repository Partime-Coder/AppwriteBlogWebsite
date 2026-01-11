import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import authService from '../appwrite/auth'
import { Container, PostCard, Button } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { Query } from 'appwrite'
useSelector
function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData?.$id) return;

    service
      .getPosts([Query.equal("userid", userData.$id)])
      .then(res => setPosts(res?.documents || []))
      .finally(() => setLoading(false));

  }, [userData]);


  useEffect(() => {
    const interval = setInterval(() => {
      console.log('status:', status, 'userData:', userData);
    }, 1000); // every 1 second

    return () => clearInterval(interval); // cleanup on unmount
  }, [status, userData]);


  const deletePost = (postId, postImage) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return

    service.deletePost(postId).then(status => {
      if (status) {
        if (postImage) service.deleteFile(postImage)
        // remove post from state instead of refetching
        setPosts(prev => prev.filter(p => p.$id !== postId))
      }
    })
  }

  if (loading) return <h1 className="text-center py-8">Loading...</h1>
  if (posts.length === 0) return <h1 className="text-center py-8">No posts yet</h1>
  return (
    <div className="w-full py-8">
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map(post => (
          <div key={post.$id} className="relative group">
            <PostCard {...post} />

            {/* Edit & Delete buttons */}
            <div className="mt-3 flex justify-around gap-4">
              <Link to={`/edit-post/${post.$id}`} className="w-28">
                <Button
                  bgColor="bg-green-500"
                  className="w-full text-white font-semibold py-2 rounded-lg shadow hover:bg-green-600 cursor-pointer transition duration-200"
                >
                  Edit
                </Button>
              </Link>

              <Button
                bgColor="bg-red-500"
                className="w-28 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-600 cursor-pointer transition duration-200"
                onClick={() => deletePost(post.$id, post.image)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </div>
  );

}

export default AllPosts
