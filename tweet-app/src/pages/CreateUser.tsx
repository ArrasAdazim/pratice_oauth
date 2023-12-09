import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tweets_api_base_url = "http://localhost:8082";

const CreateUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Membuat URL objek untuk file gambar yang dipilih
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", file);

    try {
      const response = await fetch(tweets_api_base_url + "/api/users", {
        method: "post",
        body: formData,
      });

      const responseJson = await response.json();

      if (response.status !== 201) {
        alert("error: " + responseJson.message);
      } else {
        alert("User successfully created");
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user.");
    }
  };

  return (
    <div className="bg-gray-400">
      <h1>Create New User!</h1>

      <form>
        <input
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          placeholder="Masukkan Nama"
        />

        <input
          className="mx-5"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          placeholder="Masukkan Email"
        />

        <input
          id="image"
          type="file"
          name="image"
          onChange={handleImageChange}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 max-w-full max-h-40"
          />
        )}

        <button className="bg-green-400 w-40 h-12" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
