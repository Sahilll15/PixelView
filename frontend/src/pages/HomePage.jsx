import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useEffect } from 'react';

const ImageGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [imageFile, setImageFile] = useState(null); 
  const [imageName, setImageName] = useState(''); 
  const fileInputRef = useRef(null); 

  const getImages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/images/getimages`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      setImages(response.data.images);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getImages();
  }, []);

  const filteredImages = Array.isArray(images) && images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddButtonClick = () => {
    setShowModal(true); 
  };

  const handleImageInputChange = (e) => {
    setImageFile(e.target.files[0]); 
  };

  const handleImageNameChange = (e) => {
    setImageName(e.target.value); 
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('name', imageName);

      await axios.post(`${process.env.REACT_APP_API_URL}/api/images/addimage`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      
      getImages();
      
      setShowModal(false);
      
      fileInputRef.current.value = '';
      setImageName('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/images/deleteimage/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      getImages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-full">
        <div className="mb-4 flex flex-row gap-10 mt-10">
          <input
            type="text"
            placeholder="Search images..."
            className="border mt-10 border-gray-400 rounded py-2 px-4 w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm w-20 h-10 mt-10"
            onClick={handleAddButtonClick} 
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
            {
                filteredImages.length ? null : <p className="text-center font-bold uppercase mx-auto">No images found</p>
            }
        {filteredImages.map(image => (
  <div key={image.id} className='border-4 rounded-2xl mt-2 p-10 relative'>
     <button   className="bg-red-500 text-white px-4 py-2 rounded mt-2  absolute top-0 right-0 mr-1" onClick={() => handleImageDelete(image._id)}>Delete</button>
    <img src={`${process.env.REACT_APP_API_URL}/${image.imageUrl}`} alt={image.alt} className="w-full h-auto p-10" />
    <p className="text-center font-bold uppercase ">{image.name}</p>
   
  </div>
))}
        </div>
      </div>

   
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg ">
          
            <input
              type="text"
              placeholder="Image Name"
              className="border border-gray-400 rounded py-2 px-4 w-full mb-4"
              value={imageName}
              onChange={handleImageNameChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageInputChange}
              ref={fileInputRef}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleImageUpload}
              disabled={!imageFile || !imageName}
            >
              Upload Image
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
