// import student css

import axios from "axios";
import { useEffect, useState } from "react";
import { cloudImgUpload } from "../utils/cloudinary";

const Student = () => {
  // form show and hide state
  const [update, setUpdate] = useState(false);

  // input form state
  const [input, setInput] = useState({
    name: "",
    roll: "",
    phone: "",
    email: "",
    location: "",
  });

  // Data show state
  const [data, setData] = useState([]);

  // Img upload state
  const [file, setFile] = useState();

  console.log(file);

  // handle value change
  const handleValueChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form data submit
  const handleFormDataSubmit = async (e) => {
    e.preventDefault();

    const fileData = await cloudImgUpload({
      file: file,
      preset: "devzons",
      cloudName: "dahckkgrc",
    });
    const response = await axios.post("http://localhost:5050/dev/", {
      ...input,
      photo: fileData.secure_url,
    });
    handleGetData();
    setInput({
      name: "",
      roll: "",
      phone: "",
      email: "",
      location: "",
    });
  };

  // Data get process
  const handleGetData = async () => {
    const response = await axios.get("http://localhost:5050/dev/");
    setData(response.data);
  };

  // Data delete process
  const handleDataDelete = async (id) => {
    const response = await axios.delete(`http://localhost:5050/dev/${id}`);
    handleGetData();
  };

  // Data edit process
  const handleDataEdit = async (id) => {
    setUpdate(true);
    const response = await axios.get(`http://localhost:5050/dev/${id}`);
    setInput(response.data);
  };

  // Update form data submit
  const handleUpdateFormDataSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`http://localhost:5050/dev/${input.id}`, {
      name: input.name,
      roll: input.roll,
      phone: input.phone,
      email: input.email,
      location: input.location,
    });
    handleGetData();
    setInput({
      name: "",
      roll: "",
      phone: "",
      email: "",
      location: "",
    });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-[100px]">
        {/* student form  */}
        <div className="student__area">
          {/* Student create form */}
          {!update && (
            <>
              <h1 className="font-bold text-black text-3xl pb-3 italic">
                Student Create Form
              </h1>
              <div className="student__form">
                <form
                  action=""
                  className="flex items-center gap-3"
                  onSubmit={handleFormDataSubmit}
                >
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded italic"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={input.name}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded italic"
                    type="text"
                    name="roll"
                    placeholder="Roll"
                    value={input.roll}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-900 py-2 px-1 outline-none rounded italic"
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={input.phone}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded italic"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={input.email}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded italic"
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={input.location}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-5 rounded font-bold"
                  >
                    Create
                  </button>
                </form>
              </div>
            </>
          )}

          {/*Student update form */}
          {update && (
            <>
              <h1 className="font-bold text-black text-3xl pb-3 italic">
                Student Update Form
              </h1>
              <button
                className="bg-blue-600 text-white py-2 px-5 rounded font-bold mb-5"
                onClick={() => setUpdate(false)}
              >
                Create Student Form
              </button>
              <div className="student__form">
                <form
                  action=""
                  className="flex items-center gap-3"
                  onSubmit={handleUpdateFormDataSubmit}
                >
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded italic"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={input.name}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded italic"
                    type="text"
                    name="roll"
                    placeholder="Roll"
                    value={input.roll}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-900 py-2 px-1 outline-none rounded italic"
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={input.phone}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded italic"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={input.email}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded italic"
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={input.location}
                    onChange={handleValueChange}
                  />
                  <input
                    className="border border-gray-700 py-2 px-1 outline-none rounded"
                    type="file"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-5 rounded font-bold"
                  >
                    Update
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
        {/* Student data */}
        <div className="mt-[100px]">
          <table className="mx-auto w-[90rem]">
            <thead className="text-2xl border rounded">
              <tr>
                <th>Index Number</th>
                <th>Name</th>
                <th>Roll</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="py-4">{index + 1}</td>
                    <td className="py-4">{item.name}</td>
                    <td className="py-4">{item.roll}</td>
                    <td className="py-4">{item.phone}</td>
                    <td className="py-4">{item.email}</td>
                    <td className="py-4">{item.location}</td>
                    <td className="py-4">
                      <img
                        src={item.photo}
                        style={{
                          height: "70px",
                          width: "70px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                        alt=""
                      />
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleDataEdit(item.id)}
                        className="bg-green-800 text-white py-2 px-5 mr-2 rounded font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDataDelete(item.id)}
                        className="bg-red-600 text-white py-2 px-5 rounded font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Student;
