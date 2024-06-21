import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2'

const AddAnnouncement = () => {

    const handleAddRequirement = event => {
        event.preventDefault();

        const form = event.target;
        const image = form.authorImage.value;
        const name = form.authorName.value;
        const title = form.title.value;
        const description = form.description.value;

        const newAnnouncement = { image, name, title, description };
        console.log(newAnnouncement);

        fetch('https://online-forum-server-coral.vercel.app/announcement', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(newAnnouncement)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedID){
                    Swal.fire({
                        title: "Success!",
                        text: "Announcement Added Successfully.",
                        icon: "success",
                        confirmButtonText: 'Cool'
                      });
                }
            })
        }

    return (
        <div className="pt-6">
            <Helmet>
                <title>Nexora | Announcement</title>
            </Helmet>
            <div className="shadow-lg p-5 container mx-auto border dark:bg-[#1a2641d5]">
                <div className="mt-5 mb-8">
                    <p className="text-center text-3xl font-semibold">
                        <span className="dark:text-white text-[#9ACD32]">
                            Add Announcement
                        </span>
                    </p>
                </div>
                <form onSubmit={handleAddRequirement}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-2 dark:text-white" htmlFor="authorImage">
                                Author Image URL
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                type="text"
                                placeholder="Enter Author Image URL"
                                id="authorImage"
                                name="authorImage"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mt-4 mb-2 dark:text-white" htmlFor="authorName">
                                Author Name
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                type="text"
                                placeholder="Enter Author Name"
                                id="authorName"
                                name="authorName"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 dark:text-white" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                type="text"
                                placeholder="Enter Title"
                                id="title"
                                name="title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mt-4 mb-2 dark:text-white" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="w-full p-2 border rounded-md focus:outline-[#274675]"
                                placeholder="Enter Description"
                                id="description"
                                name="description"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                    </div>
                    <input
                        className="px-4 w-full py-2 mt-4 rounded bg-[#9ACD32] duration-200 text-white cursor-pointer font-semibold"
                        type="submit"
                        value="Add Announcement"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddAnnouncement;
