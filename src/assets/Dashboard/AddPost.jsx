
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const AddPost = () => {
  

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = event.target;
    const image = formData.authorImage.value;
    const name = formData.authorName.value;
    const email = formData.authorEmail.value;
    const title = formData.postTitle.value;
    const description = formData.postDescription.value;
    const tag = formData.tag.value;
    const upVote = parseInt(formData.upVote.value);
    const downVote = parseInt(formData.downVote.value);
  
    const newPost = { image, name, email, tag, upVote, downVote, title, description };
    console.log(newPost);
  
    fetch('https://online-forum-server-coral.vercel.app/posts', {
        method : 'POST',
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(newPost)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedID){
                Swal.fire({
                    title: "Success!",
                    text: "Post Added Successfully.",
                    icon: "success",
                    confirmButtonText: 'Cool'
                  });
            }
        })
        .catch(error => {
            console.error('Error creating post:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to add post.",
                icon: "error",
                confirmButtonText: 'Ok'
            });
        });
  };

  return (
    <div className="dark:bg-[#120505] dark:text-white px-10">
     <Helmet>
            <title>Nexora | Add Post</title>
           </Helmet>
      <div className="pt-10">
        <div className="shadow-lg p-5 border dark:bg-[#1a2641d5]">  
            <div>
              <div className="mt-5 mb-8">
                <p className="text-center text-3xl font-semibold">Add Post</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-8">
                  <div className="flex-1">
                    <label className="block mb-2 dark:text-white" htmlFor="authorName">Author Name</label>
                    <input
                      className="w-full p-2 border rounded-md focus:outline-[#274675]"
                      type="text"
                      placeholder="Author Name"
                      id="authorName"
                      name="authorName"
                      disabled
                    />

                    <label className="block mt-4 mb-2 dark:text-white" htmlFor="tag">Tag</label>
                    <select
                      name="tag"
                      id="tag"
                      className="w-full p-2 border rounded-md focus:outline-[#274675]"
                    >
                      <option value="Category">Select Tag</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Game Development">Game Development</option>
                      <option value="Networking">Networking</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                    </select>

                    <label className="block mt-4 mb-2 dark:text-white" htmlFor="postTitle">Post Title</label>
                    <input
                      className="w-full p-2 border rounded-md focus:outline-[#274675]"
                      type="text"
                      placeholder="Enter Post Title"
                      id="postTitle"
                      name="postTitle"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 dark:text-white" htmlFor="authorImage">Author Image</label>
                    <input
                      className="w-full p-2 border rounded-md focus:outline-[#274675]"
                      type="text"
                      placeholder="Enter Image URL"
                      id="authorImage"
                      name="authorImage"
                    />

                    <label className="block mb-2 mt-4 dark:text-white" htmlFor="upVote">UpVote</label>
                    <input
                      className="w-full p-2 border rounded-md focus:outline-[#274675]"
                      type="number"
                      placeholder="0"
                      id="upVote"
                      name="upVote"
                    />

                    <label className="block mb-2 mt-4 dark:text-white" htmlFor="downVote">DownVote</label>
                    <input
                      className="w-full p-2 border rounded-md focus:outline-[#274675]"
                      type="number"
                      placeholder="0"
                      id="downVote"
                      name="downVote"
                    />
                  </div>
                </div>
                <label className="block mb-2 dark:text-white" htmlFor="postDescription">Post Description</label>
                <textarea
                  className="w-full p-2 border rounded-md focus:outline-[#274675]"
                  placeholder="Post Description"
                  id="postDescription"
                  name="postDescription"
                />

                <input
                  className="px-4 w-full py-2 mt-4 rounded bg-[#9ACD32] duration-200 text-white cursor-pointer font-semibold"
                  type="submit"
                  value="Add Post"
                />
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
