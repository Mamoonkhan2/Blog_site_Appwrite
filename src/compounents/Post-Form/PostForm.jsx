import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import appConfig from '../../appWrite/config';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import Select from '../Select';
import { InputBtn as Input,RTC } from '..';

function PostForm({post}) {
    
    const navigate = useNavigate();
    const {register,reset,handleSubmit,setValue,getValues,control,watch} = useForm({
        defaultValues:{
            title:post?.title,
            contant:post?.contant,
            status:post?.status,
            featureImage:post?.featureImage||"",
            slug:post?.$id ||"",
        }
    });
    const userData = useSelector((state)=>state.auth.userData);
const submit = async (data) => {
  if (post) {
    // ... your existing update code
  } else {
    const imageUpload = await appConfig.uploadFile(data.image[0]);
    if (imageUpload) {
      const fileId = imageUpload.$id;
      data.featureImage = fileId;

      // SANITIZE SLUG: Lowercase, swap spaces for dashes, remove weird characters, trim to 36 chars
      const cleanSlug = data.slug
        ? data.slug
            .toLowerCase()
            .replace(/[^a-z0-9\s-_.]/g, '') // remove forbidden symbols
            .trim()
            .replace(/\s+/g, '-')           // replace spaces with dashes
            .slice(0, 20)                   // enforce 36-char limit
        : undefined;                        // fallback to ID.unique() if blank

      const createPost = await appConfig.createTable({
        ...data,
        slug: cleanSlug, // Pass the safely formatted slug here
        UserId: userData.$id,
        contant: data.contant
      });

      if (createPost) navigate(`/post/${createPost.$id}`);
    }
  }
}


     const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);
    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                slug: post.$id,
                contant: post.contant,
                status: post.status,
            });
        }
    }, [post, reset]);
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
 return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTC label="Content :" name="contant" control={control} defaultValue={getValues("contant")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appConfig.getFilePreview(post.featuredImage?post.featureImage:null)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm