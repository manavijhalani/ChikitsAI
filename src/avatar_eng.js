import React, { useState, useEffect } from "react";
import image1 from "./img1.png";
import image2 from "./img2.png";
import image3 from "./img3.png";
import './avatar.css';
const Avatar1 = () => {
  const images = [image1, image2, image3];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1000); // Adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="photos">
      <img src={images[currentImage]} alt="Talking Doctor"  />
    </div>
  );
};



export default Avatar1;
