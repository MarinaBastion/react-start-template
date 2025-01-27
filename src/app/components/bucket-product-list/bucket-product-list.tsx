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
} from '../Operation.shop.short/operation-shop-short'
import { Product, CreateRandomProduct } from 'src/homeworks/ts1/3_write'
import useIntersectionObserver from 'src/app/hooks/useIntersectionObserver'
import { OperationShopProps } from '../Operation.shop/operation-shop'
import { ModalForm } from '../Modal/modal-form.module'
import { EditProductForm } from '../EditNewProduct/EditProduct'
import { Image } from '../Custom-slider/image.slider'
import { BucketButton } from '../Bucket-button/bucket-button'
import { connect, useDispatch, useSelector } from 'react-redux';
import { addToBucket,deleteFromBucket,bucketListSelectors, ProductBucket } from '../../store/bucket';
import { increase ,decrease, ItemCount, countSelectors} from 'src/app/store/count'
import { select } from 'redux-saga/effects'
import { use } from 'storybook-static/984.cbbc5609.iframe.bundle'
import { Order, OrderPostRequest } from 'src/app/types/Orders'
import { useAddOrderMutation } from 'src/app/features/api/ServerApi'

export interface IItemContent {
    returnNewItem?: (arg: string) => any
    children?: (props: any) => ReactNode
}
export interface IProductCart{
  id: string
  price: number
  photo: string
  name: string
  category_name: string
  description: string
  caption?: string
  count: number
  checked?: boolean
}

const modalContainerId = 'modal_product_id'

export const BucketList: FC<IItemContent> = ({ returnNewItem, children }) => {
    const countItems: ItemCount[] = useSelector(countSelectors.get).counts;
    const [items, setItems] = useState<OrderPostRequest>()

    const [next, setNext] = useState(1)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [cart_items,setCart_items] = useState<IProductCart[]>([])
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(true);
    const [addOrder, { data: addOrderResult,isLoading: isLoadingAddingProd, error: addProdError, isError,isSuccess }] = useAddOrderMutation()
           
    let productCart =  useSelector(bucketListSelectors.get);
    let countItem   =  useSelector(countSelectors.get);
    
    useEffect(()=>{
      let res_array: IProductCart[] = []
      if (productCart.products){
      productCart.products.forEach(element => { 
      let i = countItem.counts.find(c => c.id == element.id)
      if (i == undefined)
      {
        let payload: ProductBucket = element;
        dispatch(deleteFromBucket(payload))
      }
      if (!(i == undefined))
      {
        res_array.push({id: element.id, price:element.price, photo:element.photo,name: element.name, category_name: element.category_name,
        description: element.description, caption:element.caption, count:i.count} )
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
   
    useEffect(() => {
        console.log(addOrderResult);
        let order: Order 
        (isSuccess) ? order = addOrderResult : {}
        if ( order && "id" in order)
        {
            setCart_items(cart_items.filter(c => c.checked != true ));
        }
      //  setCart_items(cart_items.filter(c => c.checked != true ));
    }, [addOrderResult])
   

    const lastProductElementRef = useIntersectionObserver<HTMLLIElement>(
        () => setNext((prev) => prev + 1),
        [loading]
    )

    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>,index:number) => {
        const checked = e.target.checked;
        setCart_items(items => {
  
          return [
  
            ...items.slice(0, index),
  
            {...items[index], checked},
  
            ...items.slice(index + 1),
          ]
        })
    }

     const createOrderHandle = () => {
        let body:OrderPostRequest = {
            products: []
        };
        let products = cart_items.filter(c => c.checked == true );
        products.map(c => body.products.push({id:c.id,quantity: c.count}))
        addOrder(body);
    }
    
    return (
        <div >
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
                        <input type="checkbox"   onChange={(e) => handleCheckBox(e, index)} />
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
            <button type="button" onClick={createOrderHandle}> Create Order</button>
            {loading && <p>Loading...</p>}
        </div>
    )
}


