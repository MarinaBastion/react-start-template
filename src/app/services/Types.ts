export enum UserType{
    Standard, 
    Premium,
    Gold, 
    Free
}

export enum ProductType{
    Car, 
    Toy, 
    Food
}

export interface IUserTypeDiscount{
    userType: UserType,
    discount: number
}

export interface IDiscountProductUser{
    userType_id: UserType,
    productType_id: ProductType,
    discount: number
}