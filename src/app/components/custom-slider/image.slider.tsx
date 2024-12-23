import React, { useState } from 'react'
import Styles from './image-slider.module.css'
import { request } from 'https'

export interface Image {
    url: string
    id: number
}
interface ImageProps {
    images: Image[]
}

export const ImageSlider: React.FC<ImageProps> = ({ images }) => {
    const [selectedId, setSelectdId] = useState<number>(0)
    const prevImage = () => {
        setSelectdId((prev) => (prev <= 0 ? images.length - 1 : prev - 1))
    }
    const nextImage = () => {
        setSelectdId((prev) => (prev >= images.length - 1 ? 0 : prev + 1))
    }
    return (
        <div className={Styles.image}>
            <div className={Styles.image_slider}>
                <div className={Styles.images}>
                    {images
                        .filter((image) => image.id === selectedId)
                        .map((image) => {
                            return <img key={image.id} src={image.url} />
                            // return <img key={image.id} src={require("../../assets/" + image.url)}  />;
                        })}
                </div>
                <button className={Styles.button_prev} onClick={prevImage}>
                    {' '}
                    Prev{' '}
                </button>
                <button className={Styles.button_next} onClick={nextImage}>
                    {' '}
                    Next{' '}
                </button>
            </div>
        </div>
    )
}
