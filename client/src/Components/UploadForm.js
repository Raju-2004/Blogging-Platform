import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorContext } from "../pages/Editor.page";
import { toast } from "react-toastify";
import Tag from "./Tag";
const UploadForm = () => {
  const notify = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const { blog : {title, banner, content, tags, des}, setBlog, setEditorState } =
    useContext(EditorContext);

  const HandleCloseEvent = () => {
    setEditorState("editor");
  };

  let charcterLimit = 200;
  let tagsLimit = 10;

  let { blog_id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();

  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    let value = input.value;
    setBlog((prev) => ({ ...prev, title: value }));
  };

  const handleBlogDesChange = (e) => {
    let input = e.target;
    let value = input.value;
    setBlog((prev) => ({ ...prev, des: value }));
  };

  const handleEnterKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const publishBlog = (e) => {
    if (e.target.classList.contains("disable")) return;

    if (!title.length) {
      return toast.error("Write blog title before publishing");
    }

    if (!des.length || des.length > charcterLimit) {
      return toast.error(
        `Write blog description within ${charcterLimit} characters`
      );
    }

    if (!tags.length) {
      return toast.error(
        "Add at least one tag to help in searching and ranking your blog post"
      );
    }

    let loadingToast = toast.loading("Publishing...");
    e.target.classList.add("disable");

    let blogObj = {
      title,
      banner,
      des,
      content,
      tags,
      draft: false,
    };

    fetch(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...blogObj, id: blog_id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.success("Published 👍🏻");
        setTimeout(() => {
          // dashboard
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.error(error.message);
      });
  };

  const handleKeyDown = (e) => {
    // if enter or comma
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let input = e.target;
      let tag = input.value;
      if (tags.length < tagsLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
          input.value = "";
        }
      } else {
        toast.error(`You can add only ${tagsLimit} tags`);
      }
    }
  };

  return (
    <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12 right-[5vw] x-10 top-[5%] lg::top-[10%]"
        onClick={HandleCloseEvent}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <div className="max-w-[550px] center">
        <p className="text-dark-grey mb-1">Preview</p>
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
          <img src={banner} alt="Banner" />
        </div>
        <h1 className="text-4xl font-medium t-2 leading-tight line-clamp-2">
          {title}
        </h1>
        <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
          {des}
        </p>
      </div>

      <div className="border-grey lg:border-1 lh:pl-8">
        <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
        <input
          type="text"
          placeholder="Blog Title"
          defaultValue={title}
          className="input-boc pl-4"
          onChange={handleBlogTitleChange}
        />

        <p className="text-dark-grey mb-2 mt-9">
          Short description about your blog
        </p>

        <textarea
          maxLength={charcterLimit}
          defaultValue={des}
          className="h-40 resize-none leading-7 input-box pl-4"
          onChange={handleBlogDesChange}
          onKeyDown={handleEnterKeyDown}
        ></textarea>

        <p className="mt-1 text-dark-grey text-sm text-right">
          {charcterLimit - des.length} characters left
        </p>

        <p className="text-dark-grey mb-2 mt-9">
          Topics - ( Helps in searching and ranking your blog post ){" "}
        </p>

        <div className="relative input-box pl-2 py-2 pb-4">
          <input
            type="text"
            placeholder="Topic"
            className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
            onKeyDown={handleKeyDown}
          />

          {tags.map((tag, index) => (
            <Tag key={index} tagIndex={index} tag={tag} />
          ))}

          <p className="mt-1 mb-4 text-dark-grey text-right">
            {tagsLimit - tags.length} Tags left
          </p>

          <button className="btn-dark px-8" onClick={publishBlog}>
            Publish
          </button>
        </div>
      </div>
    </section>
  );
};

export default UploadForm;
