import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEventHandler, ReactElement, ReactNode } from 'react'
import Styles from './operation-short.module.css'
import { compareAsc, format } from 'date-fns'

export interface OperationShortProps {
    sum: number | null
    name: string | null
    category_name: string | null
    description: string | null
}

export const OperationShort: React.FC<OperationShortProps> = ({
    sum,
    name,
    category_name,
    description,
}) => {
    return (
        <div className={Styles.wrap}>
            <label htmlFor="sum">Сумма</label>
            <input
                type="number"
                id="sum"
                min="10"
                max="10000000000"
                value={sum}
            />
            <label htmlFor="name">Наименование</label>
            <input type="text" id="name" value={name} />
            <label htmlFor="category">Категория</label>
            <input type="text" id="category" value={category_name} />
            <label htmlFor="descr">Описание</label>
            <textarea id="descr">
                {description.length > 250
                    ? `${description.substring(0, 250)}...`
                    : description}
            </textarea>
            <button type="button">Edit</button>
        </div>
    )
}
