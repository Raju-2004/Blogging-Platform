import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import defaultImg from "../assets/blogbanner.png";
import { EditorContext } from "../pages/Editor.page";
import { tools } from "./tools";
import { toast } from "react-toastify";
const BlogEditor = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const {blog,  blog : {title,banner,content,tags,des},setBlog,textEditor ,setEditorState, setTextEditor} = useContext(EditorContext)
  console.log(blog)
  const [selectedFile, setSelectedFile] = useState(null);
//   console.log(userAuth);

const notify = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  useEffect(()=>{
    setTextEditor(new EditorJS({
        holderId : "textEditor",
        data : content,
        tools : tools,
        placeholder:"Let's write an awesome story",

    }))
  },[])

  const handleFileChange = async (e) => {
    // setSelectedFile(e.target.files[0]);
     console.log(e.target.files[0])
    await handleUpload(e.target.files[0]);
    
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file)
    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("File uploaded:", data.fileUrl);
      
      
      setBlog({ ...blog, banner: data.fileUrl });
  
     setSelectedFile(data.fileUrl)
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleTitleChange = (e)=>{
    let input = e.target;
    input.style.height = 'auto'
    input.style.height = input.scrollHeight+"px"
    setBlog({...blog,title : input.value})
  }

 const handletitleKeydown = (e) =>{
     if(e.keyCode === 13)
     {
        e.preventDefault();
     }
 }

 const HandlePublish = ()=>{
    console.log(banner.length);
    console.log(title.length);
    if(!banner.length)
    {
        return toast.error('Upload a blog banner a to publish it')
    }
    if(!title.length)
    {
        return toast.error('Write blog title to publish it')
    }
    if(textEditor.isReady)
    {
        textEditor.save().then(data => {
            console.log(data)
            if(data.blocks.length){
                setBlog({...blog,content:data})
                setEditorState("publish")
            }
            else{
                return toast.error("Write something to publish it")
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    console.log("hii")
 }
  
  return (
    <>
      <nav>
        <Link to="/">
          <img
            src="path_to_your_logo_image"
            alt="Logo"
            className="h-8 w-auto mr-8"
          />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">{title.length ? title : 'New Blog'}</p>
        {/* <div className="flex gap-4 ml-auto "> */}
          <button type="button" onClick={HandlePublish} className=" bg-slate-300 btn-dark p-3 rounded-lg">publish</button>
        {/* </div> */}
      </nav>
      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-gray-100">
            <label htmlFor="uploadBanner">
              {selectedFile ? (
                <img
                  src={selectedFile}
                  alt=""
                  className="z-20"
                />
              ) : (
                <img src={defaultImg} alt="" className="z-20" />
              )}
              <input
                id="uploadBanner"
                type="file"
                accept=".png,.jpg,.jpeg"
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>
          <textarea  className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40' defaultValue={title} onKeyDown={handletitleKeydown} onChange={handleTitleChange} placeholder="Blog title">

          </textarea>
          <div id="textEditor" className="font-serif">

          </div>
        </div>
      </section>
    </>
  );
};

export default BlogEditor;
