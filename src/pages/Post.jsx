import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import service from "../appwrite/config";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

   

    useEffect(() => {
        if (slug) {
           
            service.getPost(slug).then((post) => {
                if (post) {setPost(post); 
                    
                   
                }
                else {navigate("/");}
            });
        } else navigate("/");
    }, [slug, navigate]);

    

    return post ? (
  <section className="py-10">
    <Container>
      <article className="mx-auto max-w-3xl">

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={service.getFileView(post.image)}
            alt={post.title}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold leading-tight mb-6">
          {post.title}
        </h1>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {parse(post.content)}
        </div>

      </article>
    </Container>
  </section>
) : null;

 }