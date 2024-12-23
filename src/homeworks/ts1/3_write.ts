/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 * */

export type Category = {
    id: string
    name: string
    photo: string
}
export type ProductPart = {
    desc?: string
    createdAt: string
    oldPrice?: number
    price: number
    category: Category
}
export type Product = Category & ProductPart

export type Operation = {
    id: string
    name: string
    desc?: string
    createdAt: string
    amount: number
    category: Category
    type: 'Cost' | 'Profit'
}

const GetRandomImage = (): string => {
    const images = [
        'agustin-diaz-gargiulo-7F65HDP0-E0-unsplash',
        'business-people-shaking-hands-together',
        'graphic-node-qOTyvyjVyoY-unsplash',
        'urban-vintage-VfUN94cUy4o-unsplash',
    ]
    const randomPick = images[(Math.random() * images.length) | 0]
    return randomPick + '.jpg'
}
const GetRandomName = (): string => {
    const names = [
        'стройматериалы',
        'косметика',
        'продукты',
        'сфера услуг',
        'канцелярия',
        'мебель',
    ]
    const randomPick = names[(Math.random() * names.length) | 0]
    return randomPick
}
export class GuidGenerator {
    static standard(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r: number = (Math.random() * 16) | 0
            const v: number = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    }
    static short(): string {
        return 'xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r: number = (Math.random() * 16) | 0
            const v: number = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    }
}

export const CreateRandomProduct = (CreatedAt: string): Product => {
    const category1: Category = {
        id: GuidGenerator.standard(),
        name: GetRandomName(),
        photo: GetRandomImage(),
    }
    const product: Product = {
        id: GuidGenerator.standard(),
        photo: GetRandomImage(),
        name: GetRandomName(),
        desc: 'bfjkenvklelkvnlek',
        createdAt: CreatedAt,
        oldPrice: Math.random() * 100,
        price: Math.random() * 100,
        category: category1,
    }
    return product
}
export const createRandomOperation = (createdAt: string) => {
    const category1: Category = {
        id: GuidGenerator.standard(),
        name: GetRandomName(),
        photo: GetRandomImage(),
    }
    const operation: Operation = {
        id: GuidGenerator.standard(),
        name: GetRandomName(),
        desc: '1',
        createdAt: createdAt,
        amount: Math.random() * 100,
        category: category1,
        type: Math.ceil(Math.random() * 2) == 1 ? 'Cost' : 'Profit',
    }
    return operation
}

/*
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 *
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
// export const createRandomProduct = (createdAt: string) => {};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
// export const createRandomOperation = (createdAt: string) => {};
