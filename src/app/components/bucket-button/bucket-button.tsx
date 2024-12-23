import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEventHandler, ReactElement, ReactNode } from 'react'
import Styles from './bucket-button.module.css'
import { decrease, increase, ItemCount } from 'src/app/store/count';
import { useDispatch } from 'react-redux';

export interface BucketButtonProps {
    countNumber: number;
    id: number;
    
}

export const BucketButton: React.FC<BucketButtonProps> = ({ countNumber,id }) => {
    const [count, setCount] = useState(countNumber)
    const [id_item, setId_item] = useState(id)
    const dispatch = useDispatch();
    function handleIncrease(payload: ItemCount, e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault;
          dispatch(increase({id: payload.id,count:payload.count}))
      }
      function handleDecrease(payload: ItemCount, e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault;
          dispatch(decrease({id: payload.id,count:payload.count}))
      }

     useEffect(()=>{ 
        setCount(countNumber)
     })

     
    if (count === 0) {
        return (
            <div className={Styles.button_container}>
                <button type="button">buttonLabel</button>
            </div>
        )
    } else if (count > 0) {
        return (
            <div className={Styles.button_container}>
                <button type="button" onClick={(e) => handleDecrease({id:id_item, count: count},e) }>-</button>
                <label htmlFor="count">Количество товаров</label>
                <input
                    type="number"
                    id="count"
                    min="0"
                    max="10000000000"
                    value={count}
                />
                <button type="button" onClick={(e) => handleIncrease({id:id_item, count: count},e) }>+</button>
            </div>
        )
    }
}
// function dispatch(arg0: any) {
//     throw new Error('Function not implemented.');
// }

