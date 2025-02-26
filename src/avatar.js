import React, { useState, useEffect } from "react";
import image1 from "./g1_listening.jpg";
import image2 from "./g1_talk1.jpg";
import image3 from "./g1_talk2.jpg";
import './avatar.css';
const TalkingDoctor = () => {
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



export default TalkingDoctor;
