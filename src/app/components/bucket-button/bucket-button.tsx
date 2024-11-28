import React, { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEventHandler, ReactElement, ReactNode } from "react";
import Styles from './bucket-button.module.css';

export interface BucketButtonProps {
    countNumber: number;
}

export const BucketButton: React.FC<BucketButtonProps> = ({countNumber }) => {
   
    const [count, setCount] = useState(countNumber);

    
    if (count === 0)
        {
            return (
                <div className={Styles.button_container}>
                    <button type="button">buttonLabel</button>
                </div>
              );            
        }
    else if ( count > 0 ) 
    {
        return (
            <div className={Styles.button_container}>
                <button type="button">-</button>
                <label htmlFor="count">Количество товаров</label>
                <input type="number" id="count"  min="0" max="10000000000" value={count} />
                <button type="button">+</button> 
            </div>
          );
    }    
}
