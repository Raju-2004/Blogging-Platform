import Embed from "@editorjs/embed"
import List from "@editorjs/list"
import Image from "@editorjs/image"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker"
import InlineCode from "@editorjs/inline-code"

const uploadImageByUrl = (e)=>{
    let link = new Promise((resolve,reject)=>{
        try{
            resolve(e)
        }
        catch(err){
            reject(err)
        }
    })
    return link.then(url => {
        return {
            success: 1,
            file : {url}
        }
    })
}

const uploadImageByFile = async (e) => {
    console.log(e)
    return await handleUpload(e);
};
  

const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData, // Just pass the file directly as the request body
      });
      const data = await response.json();
      console.log("File uploaded:", data.fileUrl);
  
      // Return the response data in the format expected by Editor.js
      return {
        success: 1,
        file: {
          url: data.fileUrl,
        },
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      // Return an error response if upload fails
      return {
        success: 0,
        message: "Failed to upload image",
      };
    }
  };

export const tools = {
    embed : Embed,
    list : {
        class : List,
        inlineToolbar : true
    },
    image : {
        class : Image,
        config : {
            uploader : {
                uploadByUrl : uploadImageByUrl,
                uploadByFile : uploadImageByFile,
            }
        }
    },
    header : {
        class : Header,
        config : {
            placeholder : 'Type Heading...',
            levels:[2,3],
            defaultLevel : 2
        }
    },
    quote : {
        class : Quote,
        inlineToolbar : true
    },
    marker : Marker,
    inlineCode : InlineCode
}