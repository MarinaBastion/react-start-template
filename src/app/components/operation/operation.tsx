import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEventHandler, ReactElement, ReactNode } from 'react'
import Styles from './operation.module.css'
import { compareAsc, format } from 'date-fns'

export interface OperationProps {
    sum: number | null
    date_dt: string
    name: string | null
    category_name: string | null
    description: string | null
}

export const Operation: React.FC<OperationProps> = ({
    sum,
    date_dt,
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
            <label htmlFor="date">Дата</label>
            <input
                type="date"
                id="date"
                value={date_dt}
                min="2024-07-01"
                max="2100-01-01"
            />
            <label htmlFor="name">Наименование</label>
            <input type="text" id="name" value={name} />
            <label htmlFor="category">Категория</label>
            <input type="text" id="category" value={category_name} />
            <label htmlFor="descr">Описание</label>
            <textarea id="descr">{description}</textarea>
            <button type="button">Edit</button>
        </div>
    )
}
