import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);   // store the post object
                } else {
                    navigate('/');  // fallback if post not found
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div>
            <Container>
                <PostForm post={post} />  {/* pass post as single prop */}
            </Container>
        </div>
    ) : (
        <h1 className="text-center py-8">Loading...</h1>  // optional loading state
    );
}

export default EditPost;
