import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import service from '../../appwrite/config'
import { Input, Button, Select, RTE } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostForm({ post }) {
  const navigate = useNavigate();

  // this part is updated
  const userData = useSelector((state) => state.auth.userData);

 

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('status:', status, 'userData:', userData);
  //   }, 1000); // every 1 second

  //   return () => clearInterval(interval); // cleanup on unmount
  // }, [status, userData]);

  

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },

  });

  const submit = async (data) => {

      if (!userData?.$id) {
    alert("User not loaded yet. Please reload this page once that the bug im currently working on.");
    return;
  }

    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null

      if (file) {
        service.deleteFile(post.image)
      }

      const dbPost = await service.updatePost(
        post.$id, {
        ...data,
        image: file ? file.$id : undefined,
      }
      )
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    }
    else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.image = fileId;
        const dbPost = await service.createPost({
          ...data,
          userid: userData.$id
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
         .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")   // remove invalid chars
    .replace(/\s+/g, "-")           // spaces → hyphen
    .replace(/-+/g, "-")            // collapse hyphens
    .replace(/^-|-$/g, "");         // trim hyphens
    return ''
  }, []);

  useEffect(() => {

    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))
      }
    })

    return () => {
      subscription.unsubscribe();
    }

  }, [watch, slugTransform, setValue])
  return (
   <form
  onSubmit={handleSubmit(submit)}
  className="mx-auto max-w-3xl bg-white rounded-xl shadow-md p-6 space-y-6"
>
  {/* Title */}
  <Input
    label="Title"
    placeholder="Enter title"
    {...register("title", { required: true })}
  />

  {/* Slug */}
  <Input
    label="Slug"
    readOnly
    placeholder="Auto-generated slug"
    {...register("slug", { required: true })}
    onInput={(e) => {
      setValue(
        "slug",
        slugTransform(e.currentTarget.value),
        { shouldValidate: true }
      );
    }}
  />

  {/* Content */}
  <RTE
    label="Content"
    name="content"
    control={control}
    defaultValue={getValues("content")}
  />

  {/* Image upload */}
  <Input
    label="Featured Image"
    type="file"
    accept="image/png, image/jpg, image/jpeg, image/gif"
    {...register("image", { required: !post })}
  />

  {/* Preview */}
  {post && (
    <div className="w-full">
      <img
        src={service.getFileView(post.image)}
        alt={post.title}
        className="rounded-lg max-h-64 object-cover"
      />
    </div>
  )}

  {/* Status */}
  <Select
    label="Status"
    options={["active", "inactive"]}
    {...register("status", { required: true })}
  />

  {/* Submit */}
  <Button
    type="submit"
    bgColor={post ? "bg-green-500" : undefined}
    className="w-full py-3 text-base hover:bg-purple-500 cursor-pointer transition duration-200"
  >
    {post ? "Update Post" : "Publish Post"}
  </Button>
 
</form>
  );
}

export default PostForm