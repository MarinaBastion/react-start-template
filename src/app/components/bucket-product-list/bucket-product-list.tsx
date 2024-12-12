import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import Styles from './bucket-products.list.module.css'
import {
    OperationShop,
    OperationShopShortProps,
} from '../operation.shop.short/operation-shop-short'
import { Product, CreateRandomProduct } from 'src/homeworks/ts1/3_write'
import useIntersectionObserver from 'src/app/hooks/useIntersectionObserver'
import { OperationShopProps } from '../operation.shop/operation-shop'
import { ModalForm } from '../modal-form.module'
import { EditProductForm } from '../editNewProduct/EditProduct'
import { Image } from '../custom-slider/image.slider'
import { BucketButton } from '../bucket-button/bucket-button'
import { connect, useDispatch, useSelector } from 'react-redux';
import { addToBucket,deleteFromBucket,bucketListSelectors, ProductBucket } from '../../store/bucket';
import { increase ,decrease, ItemCount , countSelectors} from 'src/app/store/count'
import { select } from 'redux-saga/effects'
import { use } from 'storybook-static/984.cbbc5609.iframe.bundle'

export interface IItemContent {
    returnNewItem?: (arg: string) => any
    children?: (props: any) => ReactNode
}
export interface IProductCart{
  id: number
  price: number
  photo: string
  name: string
  category_name: string
  description: string
  caption?: string
  count: number
}

const modalContainerId = 'modal_product_id'

export const BucketList: FC<IItemContent> = ({ returnNewItem, children }) => {
    const countItems: ItemCount[] = useSelector(countSelectors.get).counts;
    const [items, setItems] = useState([])
    const [next, setNext] = useState(1)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [cart_items,setCart_items] = useState<IProductCart[]>([])
    const dispatch = useDispatch();
    

    let productCart =  useSelector(bucketListSelectors.get);
    let countItem   =  useSelector(countSelectors.get);
    
    useEffect(()=>{
      let res_array: IProductCart[] = []
      if (productCart.products){
      productCart.products.forEach(element => { 
      let i = countItem.counts.find(c => c.id == element.id)
      debugger;
      if (i == undefined)
      {
        let payload: ProductBucket = element;
        dispatch(deleteFromBucket(payload))
      }
      if (!(i == undefined))
      {
        res_array.push({id: element.id, price:element.price, photo:element.photo,name: element.name, category_name: element.category_name,
        description: element.description, caption:element.caption, count:i.count  } )
      }
      });
        setCart_items(res_array)}
    },[productCart,countItem])

    const loadMoreProducts = useCallback(async () => {
        setLoading(true)
        
        setLoading(false)
    }, [next])

    useEffect(() => {
        loadMoreProducts()
    }, [loadMoreProducts])

    const lastProductElementRef = useIntersectionObserver<HTMLLIElement>(
        () => setNext((prev) => prev + 1),
        [loading]
    )

 

    return (
        <div>
            <ul>
                {cart_items.map((item, index) =>
               
                (
                    <li
                        key={item.id}
                        // ref={
                        //     items.length === index + 1
                        //         ? lastProductElementRef
                        //         : null
                        // }
                    >
                        {children && children(item)}
                        <OperationShop
                            photo={item.photo}
                            price={item.price}
                            name={item.name}
                            category_name={item.name}
                            description={item.description}
                            caption="Delete"
                        />
                        <BucketButton countNumber={item.count} id ={item.id} />
                    </li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
        </div>
    )
}


