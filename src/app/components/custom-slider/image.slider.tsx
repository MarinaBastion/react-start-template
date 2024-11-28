import React from "react";
import Styles from  "./image-slider.module.css";
import { useState } from "react";
import { request } from "https";

export interface Image{
  url: string;
  id: number;
}
interface ImageProps{
 images: Image[];
}

export const ImageSlider: React.FC<ImageProps> = ({images}) => {
  debugger;
  const [selectedId, setSelectdId] = useState<number>(0);
  const prevImage = () => {
    setSelectdId((prev) => (prev <= 0? images.length-1 : prev - 1));
  };
  const nextImage = () => {
    setSelectdId((prev) => (prev >= images.length-1 ? 0 : prev + 1));
  };
  return (
      <div className={Styles.image}>
        <div className={Styles.image_slider}>
          <div className={Styles.images}>
            {images
              .filter((image) => image.id === selectedId)
              .map((image) => {
                return <img key={image.id} src= {image.url}  />;
                // return <img key={image.id} src={require("../../assets/" + image.url)}  />;
                
              })}
          </div>
          <button className={Styles.button_prev} onClick={prevImage}>
            {" "}
            Prev{" "}
          </button>
          <button className={Styles.button_next} onClick={nextImage}>
            {" "}
            Next{" "}
          </button>
          </div>
           {/* <div className={Styles.thumbnails}>
            {images.map((image: Image) => {
              return (
                <img
                  key={image.id}
                  src={image.url}
                  // src={require("../../assets/" + image.url)}
                  onClick={() => setSelectdId(image.id)}
                />
              );
            })}
          </div> */}
        
      </div>
  );
}



// import SimpleImageSlider from "react-simple-image-slider";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import type { MouseEventHandler, ReactElement, ReactNode } from "react";
// import Styles from './image-slider.module.css';
// import { isDataView } from "util/types";
// import im1 from "../../assets/flow.svg"
// import im2 from "./images/1.jpg"

// export interface ImageSliderProps {
//     images: string[];
// }

// export interface IDataImage
// {
//   url: string;
// }
// let datas = [{url:'../assets/assets.png'}//,
//   //{url:'../../assets/flow.svg'}
// ]

// export const ImageSlider: React.FC<ImageSliderProps> = ({images }) => {
// const items : IDataImage[] = images.map( c =>{ let i = { url : c };
// return i})
// const IMAGES:  IDataImage[] = [{ url: im1 },{ url: im2}];

// return (
//   <div>
//     <img src={require('../../assets/flow.svg')}  />

//     <SimpleImageSlider
//       width={300}
//       height={300}
//       images= { IMAGES}
//       showBullets={true}
//       showNavs={true}
//     />
//   </div>)
// }
