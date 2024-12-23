import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEventHandler, ReactElement, ReactNode } from 'react'
import Styles from './operation-shop.module.css'
import { compareAsc, format } from 'date-fns'
import { ImageSlider, Image } from '../Custom-slider/image.slider'

export interface OperationShopProps {
    price: number
    images: Image[]
    name: string
    category_name: string
    description: string
}

export const OperationShop: React.FC<OperationShopProps> = ({
    price,
    images,
    name,
    category_name,
    description,
}) => {
    return (
        <li>
            <div className={Styles.wrap}>
                <ImageSlider images={images} />
                <label htmlFor="price">Сумма</label>
                <input
                    type="number"
                    id="price"
                    min="10"
                    max="10000000000"
                    value={price}
                />
                <label htmlFor="name">Наименование</label>
                <input type="text" id="name" value={name} />
                <label htmlFor="category">Категория</label>
                <input type="text" id="category" value={category_name} />
                <label htmlFor="descr">Описание</label>
                <textarea id="descr">{description}</textarea>
                <button type="button">В корзину</button>
            </div>
        </li>
    )
}
