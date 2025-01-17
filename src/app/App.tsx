import React, {
    
} from 'react'
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { authSelectors } from './store/auth';
import { tokenSelectors } from './store/token';
import { LoginForm } from './components/registration_login/login'
import { HookForm } from './components/Profile/HookForm'
import  { s} from  './App.css'
import { store } from './store/store';
import { use } from 'storybook-static/984.cbbc5609.iframe.bundle';
import Router from './routes/Routes';

function App() {
    //localStorage.clear();
    
    return   (
   <Provider store={store}>
   <Router/>

   </Provider>
);

}

export default App
