import React, { useState, useEffect } from "react";
import image1 from "./imag1.jpg";
import image2 from "./imag2.jpg";
import image3 from "./imag3.jpg";

import './avatar.css';
const Avatar2 = () => {
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



export default Avatar2;
