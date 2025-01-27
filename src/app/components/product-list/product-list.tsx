import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import Styles from './products.list.module.css'
import {
    OperationShop,
    OperationShopShortProps,
} from '../Operation.shop.short/operation-shop-short'
//import { Product, CreateRandomProduct } from 'src/homeworks/ts1/3_write'
import useIntersectionObserver from 'src/app/hooks/useIntersectionObserver'
import { OperationShopProps } from '../Operation.shop/operation-shop'
import { ModalForm } from '../Modal/modal-form.module'
import { EditProductForm } from '../EditNewProduct/EditProduct'
import { Image } from '../Custom-slider/image.slider'
import { BucketButton } from '../Bucket-button/bucket-button'
import { useDispatch, useSelector } from 'react-redux';
import { addToBucket,ProductBucket } from '../../store/bucket';
import { ProductType } from 'src/app/services/Types'
import { authSelectors } from 'src/app/store/auth'
import { useIsAdmin } from 'src/app/hooks/isAdmin'
import { useGetProductsQuery, useGetProfileQuery} from 'src/app/features/api/ServerApi'
import { ProductFilterQuery,ProductsResult,Product } from 'src/app/types/RegisterTypes'
import { data } from 'react-router-dom'

export interface IItemContent {
    returnNewItem?: (arg: string) => any
    children?: (props: any) => ReactNode
}

const modalContainerId = 'modal_product_id'
/* eslint-disable react/no-children-prop */
export const ItemList: FC<IItemContent> = ({ returnNewItem, children }) => {
    const dispatch = useDispatch();
    const [items, setItems] = useState<Product[]>([])
    const [next, setNext] = useState(1)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const isAdmin =  useIsAdmin();
    const [page, setPage] = useState<ProductFilterQuery>({pageSize: 6, pageNumber: 1, type: 'ASC' , field: 'id'})
    const {data: dataPage, error, isLoading, isFetching} = useGetProductsQuery(page);
    const [hasNextPage, setHasNextPage] = useState(true)


    console.log("data: ")
    console.log( dataPage)
    
      
    const handleAddToCart = (payload: ProductBucket, e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault;
      dispatch(addToBucket(payload))
    }
    const handleAddNewProduct = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault;
      }
    //const handleClose = () => { setModalVisible(false)};
    const handleModalOpen = () => {
        setModalVisible(true)
    }
    const handleModalClose = () => {
        setModalVisible(false)
    }

   useEffect(() => {
    if (dataPage){
        if ( "data" in dataPage) {
            console.log("data contains: ")
            console.log(dataPage["data"])
            setItems(products => [...products, ...dataPage["data"]])
            if (items.length < dataPage["pagination"]["total"])
            {
                setHasNextPage(true)
            }
        }
    }
    }, [dataPage])
    //const observer = useRef<IntersectionObserver | null>(null);

    // const loadMoreProducts = useCallback(async () => {
    //     setLoading(true)
    //     //const newProduct = CreateRandomProduct(new Date().toDateString());
    //     if (returnNewItem == null || returnNewItem == undefined) {
    //         returnNewItem = (date_dt: string) => {
    //             return CreateRandomProduct(date_dt)
    //         }
    //     }
    //     const newItem = returnNewItem(new Date().toDateString())
    //     setItems((prevItem) => [...prevItem, newItem])
    //     setLoading(false)
    // }, [next])

    // useEffect(() => {
    //     loadMoreProducts()
    // }, [loadMoreProducts])

    const lastProductElementRef = useIntersectionObserver<HTMLLIElement>(
        () => setPage((prev) => ({pageSize: page.pageSize,pageNumber :prev.pageNumber + 1, type: page.type , field: page.field} )),
        [hasNextPage,!isLoading,!isFetching]
    )  

    return (
        <div>
             
            <ul>
                {items && items.map((item, index) => (
                    <li
                        key={item.id}
                        ref={
                            items.length === index + 1
                                ? lastProductElementRef
                                : null
                        }
                    >
                        {children && children(item)}
                        <OperationShop
                            photo={item.photo ?? null }
                            price={item.price}
                            name={item.name ?? ""}
                            category_name={item.category.name ?? ""}
                            description={item.desc}
                            
                        />
                        <button type="button" onClick={handleModalOpen}>
                            <span>Edit product</span>
                        </button>
                        <button type="button" onClick={(e) => handleAddToCart({id:item.id, price:item.price ,photo: item.photo, name: item.name,
                        category_name: item.category.name,description: item.desc, caption : "dfjgg"},e)}>
                            <span>Add to cart</span>
                        </button>
                        {modalVisible && (
                            <ModalForm
                                isVisible={true}
                                modalContainerId={modalContainerId}
                                onClose={handleModalClose}
                                children={
                                    <EditProductForm
                                        price={item.price}
                                        photos={[
                                            {
                                                id: 0,
                                                url: 'images/' + item.photo,
                                            },
                                        ]}
                                        name={item.name?? ""}
                                        category_name={item.category.name}
                                        description={item.desc}
                                    />
                                }
                            />
                        )}
                    </li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
        </div>
    )
}
