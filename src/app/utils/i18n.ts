import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import entranslation from '../public/locales/en/translation.json'
import rutranslation from '../public/locales/ru/translation.json'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const resources = {
    en: {
        translation: {
            title: 'Yavkina Marina Alexandrovna',
            description: {
                part1: 'To be able to create react web application  and deploy its on server.',
                part2: 'Pldnning to get or improve khoweledge of react, to learn figma , alse to get skills of web styling.',
                part3: 'Skills of asp.net core 6/8, postgresql ,java script , typescript, angular.',
                part4: 'Work experiemce with delphi ,postgresql(medical database development), asp.net 5, asp.net core 6, 8, angular.',
            },
        },
    },
    ru: {
        translation: {
            title: 'Явкина Марина Александровна',
            description: {
                part1: 'Самостоятельно уметь создавать веб приложения с использованием react и разворачивать на сервере.Освоить современые технологии разработки',
                part2: 'Планирую освоить разрабротку фронта на react, работу с figma , а также навыки верстки и стилизации  приложений.',
                part3: 'Владею навыками работы asp.net core 6/8, postgresql ,java script , typescript, angular.',
                part4: 'Опыт работы с delphi ,postgresql(разработка медицинских бд), asp.net 5, asp.net core 6, 8, angular.',
            },
        },
    },
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    })

export default i18n
