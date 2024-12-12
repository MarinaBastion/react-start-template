import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    useLayoutEffect,
    useContext,
} from 'react'
import logo from './logo.svg'
import Styles from './App.css'
import {
    ThemeContext,
    ThemeProvider,
    Theme,
} from './components/theme-provider/theme.provider'
import {
    LangContext,
    LangProvider,
    Lang,
} from './components/lang-provider /lang.provider'
import { ButtonGroup } from './components/theme-toggler/group-buttons'
import { ShowModal } from './components/show-modal-from/show.modal.from'
import { useTranslation } from 'react-i18next'
import { ItemList } from './components/product-list/product-list'
import { Product, CreateRandomProduct } from 'src/homeworks/ts1/3_write'
import {
    OperationShop,
    OperationShopShortProps,
} from './components/operation.shop.short/operation-shop-short'
import { RegisterForm } from './components/registration_login/register'
import { NewProductForm } from './components/createNewProduct/NewProduct'
import Router from './routes/Routes'

function App() {
    const themeFromC = useContext(ThemeContext)
    const [theme, setTheme] = useState<Theme>(themeFromC.themeName)
    const langFromC = useContext(LangContext)
    const [lang, setLang] = useState<Lang>(langFromC.langName)
    const [prod, setProd] = useState<Product>()
    const { t } = useTranslation('translation', { lng: lang })

    //  const getThemeName = (event:React.MouseEvent<HTMLButtonElement>) => {
    //   let v = event.target as HTMLButtonElement;
    //   console.log(v.name);
    //   setTheme(v.name as Theme);
    // };
    // const getLangName = (event:React.MouseEvent<HTMLButtonElement>) => {
    //   let v = event.target as HTMLButtonElement;
    //   console.log(v.name);
    //   setLang(v.name as Lang);
    // };

    return <Router />
}

export default App
