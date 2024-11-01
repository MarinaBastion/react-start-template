import React, { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEventHandler, ReactElement, ReactNode } from "react";
import Styles from './operation-shop-short.module.css';
import { compareAsc, format } from "date-fns";

export interface OperationShopShortProps {
    price: number ;
    photo: string ;
    name: string ;
    category_name: string ;
    description: string ;
}

export const OperationShop: React.FC<OperationShopShortProps> = ({price,photo, name,category_name, description }) => {
   
    return (
        <div className={Styles.wrap}>
            <div className= {Styles.product}>
                <img src={require("../../assets/" + photo)}  />
            </div>
             <label htmlFor="price">Сумма</label>
             <input type="number" id="price"  min="10" max="10000000000" value={price} />
             <label htmlFor="name">Наименование</label>
             <input type="text"  id = "name" value={name} />
             <label htmlFor="category">Категория</label>
             <input type="text"  id = "category" value={category_name} />
             <label htmlFor="descr">Описание</label>
             <textarea  id = "descr" >
                {description.length > 250 ?
                `${description.substring(0, 250)}...` : description}
             </textarea>
             <button type="button">В корзину</button>
             
        </div>
      );
}
