import * as React from "react"
import { FC ,MouseEventHandler,useEffect,useCallback,useState} from "react"
import { useForm } from "react-hook-form"
import {ImageSlider, Image as photo}  from '../custom-slider/image.slider'
import Styles from "../registration_login/register.module.css"
import useFilePreview  from "../../hooks/useFilePreview"
import { watchFile } from "fs"
import { useParams } from "react-router"
import _ from "lodash"

enum Category {
    Food= "FOOD",
    Clothes = "CLOTHES",
    Furniture = "FURNITURE",
    Sport = "SPORT",
  }

export interface IProductData {
    price: number 
    images: File[]
    photos: photo[]
    name: string 
    category_name: string 
    description: string 
}
export interface IProductProps {
    price: number 
    photos: photo[]
    name: string 
    category_name: string 
    description: string 
}



export const EditProductForm: FC<IProductProps> = ({ price,photos, name, category_name, description}) =>{
    const {register,handleSubmit,formState,watch,getValues} = useForm<IProductData>({
    defaultValues:{
        price: price,
        images: null,
        photos: photos,
        name:name,
        category_name: category_name,
        description: description              
        },
        mode: 'onChange',        
    })
    const [fileList, setFileList] = useState<File[]>();
    const [fileUrl, setFileUrl] = useState<string[]>()
    const [images, setImages] = useState<photo[]>(photos);
    let params = useParams()
  
    const  filesWatch = watch("images");
    const onSubmit = (data : IProductData) =>{
        const [price , images,name,category_name,description ] = getValues(["price", "images","name","category_name","description"]);
       
    }

    useEffect(() => {
        setFileList(filesWatch)
        var fw :File[] = filesWatch;
        var ip: photo[]= [] ;
        var urls: string[] = [];
       
        if ( fw != null || fw != undefined)
        for (var i = 0; i < fw.length; i++) {
            var im: photo = {id : 0, url: "" };
            im.id = i;
            im.url = URL.createObjectURL(fw[i])
            ip.push(im)
            urls.push(im.url);
            setImages(ip);
        }
        setFileUrl(urls);

    },[filesWatch]);
    
  return (
    <section className={Styles.container}>
    <form onSubmit={e => e.preventDefault()}>
        <div className={Styles.input_box}>
            <label>Name</label>
            <input type="text" placeholder='Name' {...register('name',{
                required : 'Name is required',
                maxLength:55})}></input>
        </div>     
        <div className={Styles.gender_box}>
            <label>Category Selection</label>
            <select {...register("category_name")}>
            {_.map(Category, (value, key) => (
                <option value={key} key={key}>{value}</option> ))}
            </select>
        </div>
        <div className={Styles.input_box}>   
            <label>Files</label>
            <input type="file" accept="image/*" multiple {...register("images")} />
           {(images) &&  <ImageSlider images = {images}/> }
           
        </div>
        <div className={Styles.input_box}>
            <label>Price</label>        
            <input type="number" {...register("price", { min: 0 })} />
        </div>
        <div className={Styles.input_box}>
            <label>Description</label>
            <textarea placeholder='Description' {...register('description',{
                required : false,
                maxLength:255})}/>
        </div>  

       
        <button type='submit' onClick={handleSubmit(onSubmit)}>Send</button>
    </form>
    </section>
  )
}