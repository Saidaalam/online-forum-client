import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newTopic, setNewTopic] = useState("");

  useEffect(() => {
    const adminData = {
      name: "Saiful Islam",
      image: "https://i.postimg.cc/K8Nk8Cb4/author.png",
      email: "admin999@gmail.com",
      password: "admin999",
      numPosts: 20,
      numComments: 40,
      numUsers: 5,
    };

    setAdminData(adminData);
  }, []);

  const handleAddTag = async (event) => {
    event.preventDefault();
    if (newTag.trim() && newImage.trim() && newTopic.trim()) {
      const newTagData = {
        tag: newTag,
        image: newImage,
        topic: newTopic,
      };

      try {
        const response = await axios.post("https://online-forum-server-coral.vercel.app/tags", newTagData);
        if (response.status === 201) {
          setTags([...tags, newTag]);
          setNewTag("");
          setNewImage("");
          setNewTopic("");
        }
      } catch (error) {
        console.error("Error adding tag:", error);
      }
    }
  };

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <Helmet>
        <title>Admin Profile</title>
      </Helmet>
      <h2 className="text-4xl text-center font-bold">Admin Profile</h2>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center bg-white shadow-lg rounded-lg overflow-hidden p-4">
        <div className="lg:w-1/2 ml-28 flex gap-10">
            <div>
            <img
              src={adminData.image}
              alt="Admin Profile"
              className="w-48 h-48 rounded-full mx-auto lg:mx-0"
            />
            </div>
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-semibold">{adminData.name}</h2>
            <p className="text-lg font-medium mt-4">Email: {adminData.email}</p>
            <p className="text-lg font-medium">Number of Posts: {adminData.numPosts}</p>
            <p className="text-lg font-medium">Number of Comments: {adminData.numComments}</p>
            <p className="text-lg font-medium">Number of Users: {adminData.numUsers}</p>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg">
          <PieChart
              data={[
                { title: "Posts", value: adminData.numPosts || 0, color: "#2D7A8A" },
                { title: "Comments", value: adminData.numComments || 0, color: "#0D3C4F" },
                { title: "Users", value: adminData.numUsers || 0, color: "#155B6F" },
              ]}
              radius={42}
              animate
              label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
              labelStyle={{
                fontSize: "4px",
                fontFamily: "sans-serif",
                fill: "#fff",
                fontWeight: "bold",
              }}
              labelPosition={70}
              style={{ height: "420px" }}
              segmentsStyle={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Add Tag</h3>
        <form onSubmit={handleAddTag} className="bg-white shadow-lg rounded-lg p-4">
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter image URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Topic</label>
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter topic"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Add Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
