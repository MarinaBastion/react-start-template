import React, { useCallback, useEffect, useRef, useState,useLayoutEffect }  from 'react';
import logo from './logo.svg';
import Styles from './App.css';
import {ThemeContext,ThemeProvider,Theme} from "./components/theme-provider/theme.provider";
import {LangContext,LangProvider,Lang} from "./components/lang-provider /lang.provider";
import {ButtonGroup} from "./components/theme-toggler/group-buttons"
import {ShowModal} from "./components/show-modal-from/show.modal.from"
import { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { ItemList} from "./components/product-list/product-list";
import { Product,CreateRandomProduct } from "src/homeworks/ts1/3_write";
import { OperationShop ,OperationShopShortProps} from './components/operation.shop.short/operation-shop-short';
import { RegisterForm } from './components/registration_login/register';
import { NewProductForm } from './components/createNewProduct/NewProduct';
import Router from "./routes/Routes"


 
function App() {
  
   const themeFromC = useContext(ThemeContext);
   const [theme, setTheme] = useState<Theme>(themeFromC.themeName ) ;
   const  langFromC = useContext(LangContext);
   const [lang, setLang] = useState<Lang>(langFromC.langName ) ;
   const [prod, setProd] = useState<Product>() ;
   const { t } = useTranslation('translation', { lng: lang });
   let ps: Product[] ;
   ps = [CreateRandomProduct(new Date().toDateString())];

   const getThemeName = (event:React.MouseEvent<HTMLButtonElement>) => {
    let v = event.target as HTMLButtonElement;   
    console.log(v.name);
    setTheme(v.name as Theme);
  };
  const getLangName = (event:React.MouseEvent<HTMLButtonElement>) => {
    let v = event.target as HTMLButtonElement;   
    console.log(v.name);
    setLang(v.name as Lang);
  };

  const addNewItem =(date_dt: string) => {
    let newprod =CreateRandomProduct(date_dt);
    setProd(newprod);
    return CreateRandomProduct(date_dt)}

  return (
    <><Router/></>
    // <>< NewProductForm /><LangProvider langName={lang} children={<div className={Styles.App}>
    //   <ShowModal modalContainerId="modal_container_id" child={""}></ShowModal>
    //   <ItemList returnNewItem={addNewItem} children={({ price = prod.price, photo = prod.photo, name = prod.name, category_name = prod.category.name, description = prod.desc }) => <OperationShop photo={photo} price={price} name={name} category_name={category_name} description={description} />} />
    //   <ThemeProvider themeName={theme} children={<header className={Styles.Appheader}>
    //     <div className={Styles.buttonGroup}>
    //       <ButtonGroup buttons={["light", "dark"]} doSomethingAfterClick={getThemeName} />
    //     </div>
    //     <div className={Styles.buttonGroup}>
    //       <ButtonGroup buttons={["en", "ru"]} doSomethingAfterClick={getLangName} />
    //     </div>
    //     <img src={logo} className={Styles.App_logo} alt="logo" />
    //     <p>{t('title')}
    //       <ul>
    //         <li>{t('description.part1')}</li>
    //         <li>{t('description.part2')}</li>
    //         <li>{t('description.part3')}</li>
    //         <li>{t('description.part4')}</li>
    //       </ul>
    //     </p>
    //   </header>} />
    // </div>} /></>
  );
}

export default App;
