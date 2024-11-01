import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Styles from './products.list.module.css';
import { OperationShop, OperationShopShortProps } from '../operation.shop.short/operation-shop-short';
import { Product,CreateRandomProduct } from "src/homeworks/ts1/3_write";
import useIntersectionObserver from "src/app/ hooks/useIntersectionObserver";
import { OperationShopProps } from "../operation.shop/operation-shop";

export interface IItemContent{
    returnNewItem: (arg:string) => any ;
    children: (props:(any ) ) => ReactNode;
}


export const ItemList: FC<IItemContent> = ({returnNewItem,children}) => {
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(1);
  const [loading, setLoading] = useState(false);
  //const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreProducts = useCallback(async () => {
    debugger;
    setLoading(true);
   //const newProduct = CreateRandomProduct(new Date().toDateString());
   const newItem = returnNewItem(new Date().toDateString());
    setItems((prevItem) => [...prevItem, newItem]);    
    setLoading(false);
  }, [next]);

  useEffect(() => {
    debugger;
      loadMoreProducts();
    
  }, [loadMoreProducts]);

  const lastProductElementRef =  useIntersectionObserver<HTMLLIElement>(() => setNext((prev) => prev + 1),[loading])

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li
            key={item.id} 
            ref={items.length === index + 1 ? lastProductElementRef : null}
          >
            {children(item)}
           {/* <OperationShop   image ={item.photo} price={item.price} name= {item.name} category_name= {item.category.name} description= {item.desc} />
      */}
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};
