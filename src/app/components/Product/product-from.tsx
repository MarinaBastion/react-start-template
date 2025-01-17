import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Style from './product-from.module.css'
import { measureMemory } from 'vm'
import { useSelector } from 'react-redux';
import { authSelectors } from '../../store/auth';
import { CategoryFilters } from 'src/app/types/Category';
import { useAddProductMutation, useGetCategoriesQuery } from 'src/app/features/api/ServerApi';
import { Category, ProductBody } from 'src/app/types/RegisterTypes';
import useIntersectionObserver from 'src/app/hooks/useIntersectionObserver';

export interface IProductForm {
    name?: string;
    photo?: string;
    desc?: string;
    oldPrice?: number;
    price?: number;
    categoryId?: string;

}

export const ProductForm: FC = () => {
    const user = localStorage.getItem("user");
    const { register, handleSubmit, formState } = useForm<IProductForm>({
        defaultValues: {
            name:  '',
            photo:  null,
            desc:'',
            oldPrice: 0,
            price: 0,
            categoryId: null

        },
        mode: 'onChange',
    })

    const nameError = formState.errors.name;
    const priceError = formState.errors.price;
    const categoryError = formState.errors.categoryId;
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [page, setPage] = useState<CategoryFilters>( { pagination:{pageSize: 200, pageNumber: 1},sorting:{ type: 'ASC' , field: 'id'}})
    const { data: dataPage, error, isLoading, isFetching} = useGetCategoriesQuery(page);
    const [hasNextPage, setHasNextPage] = useState(true)
    const [addProduct, { data: addProdResult,isLoading: isLoadingAddingProd, error: addProdError, isError,isSuccess }] = useAddProductMutation()
    const [categoryId, setCategoryId] = useState("")
    

    useEffect(() => {
        if (dataPage){
            if ( "data" in dataPage) {
                console.log("data contains: ")
                console.log(dataPage["data"])
                 setCategoryList(products => [...products, ...dataPage["data"]])
                 if ( categoryList )
                    if (categoryList.length < dataPage["pagination"]["total"])
                {
                    setHasNextPage(true)
                }
            }
        }
        }, [dataPage])
     
    const getValue = (e: React.ChangeEvent<HTMLSelectElement>) =>{
     console.log(e.target)
    }
    const handleOnChange = (e: any) => {
        console.log(e)
      };
    const onSubmit = (data: any) => {
        console.log(data)
        let body:ProductBody  = { name: data.name, photo: data.photo,desc: data.desc, oldPrice: data.oldPrice, price: data.oldPrice,categoryId: data.categoryId}
        addProduct(body);
    }
    const lastProductElementRef = useIntersectionObserver<HTMLElement>(
            () => setPage((prev) => ({ pagination:{pageSize: page.pagination.pageSize,pageNumber :prev.pagination.pageNumber + 1},sorting:{ type: page.sorting.type , field: page.sorting.field}} )),
            [hasNextPage,!isLoading,!isFetching]
        )  

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Name"
                {...register('name', {
                    required: 'Name is required',
                    maxLength: 255,
                })}
            />
            {nameError && <p style={{ color: 'red' }}>{nameError.message}</p>}
            <textarea
                placeholder="Photo"
                {...register('photo', {
                    maxLength: 500,
                } )}
            ></textarea>
            <textarea
                placeholder="Description"
                {...register('desc')}
            ></textarea>
             <input
                type="number"
                placeholder="Old price"
                {...register('oldPrice')}
            />
             <input
                type="number"
                placeholder="price"
                {...register('price', {
                    required: 'Price is required'
                })}
            />
            {priceError && <p style={{ color: 'red' }}>{priceError.message}</p>}
            
            <div className={Style.wrapper}>
            <label htmlFor="cat-select">Choose category:</label>
            <select onChange={e => getValue(e)} id="cat-select"  size={4}
                         {...register('categoryId')} >
            {categoryList && categoryList.map((value,index) => (
                <option 
                // ref={
                //     categoryList.length === index + 1
                //         ? lastProductElementRef
                //         : null
                // }
                key={value.id} value={value.name}>
                {value.name}
                </option>
            ))}
            </select>
            </div>
            <button type="submit">Save</button>
        </form>
    )
}
export default ProductForm
