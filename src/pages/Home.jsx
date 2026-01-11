import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/authSlice'


function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
    authService.getCurrentUser().then(user => {
        if (user) {
            dispatch(login(user))
        }
        else{
            navigate('/login')
        }
    })
}, [])


    useEffect(() => {
        service.getPosts()
            .then((res) => {
                if (res?.documents) {
                    setPosts(res.documents)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <h1 className="text-center py-8">Loading...</h1>
    }

    if (posts.length === 0) {
        return <h1 className="text-center py-8">No posts found</h1>
    }

    return (
        <div className="w-full py-8">
  <Container>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map(post => (
        <PostCard key={post.$id} {...post} />
      ))}
    </div>
  </Container>
</div>

    )
}


export default Home