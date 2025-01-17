import {
    UserType,
    ProductType,
    IDiscountProductUser,
    IUserTypeDiscount,
} from './Types'

export class AccountService {
    userTypeDiscount: IUserTypeDiscount[] = []
    discountProductUser: IDiscountProductUser[] = []

    ReturnUserAnddiscount(name: UserType, discount: number): IUserTypeDiscount {
        const row = this.userTypeDiscount.filter((c) => c.userType == name)[0]
        if (row != null)
            this.userTypeDiscount.filter(
                (c) => c.userType == name
            )[0].discount = discount
        else this.userTypeDiscount.push({ userType: name, discount: discount })
        return this.userTypeDiscount.filter((c) => c.userType == name)[0]
    }

    ReturnUserAndProductTypeDiscount(
        name: UserType,
        productType: ProductType,
        discount: number
    ): IDiscountProductUser {
        const row = this.discountProductUser.filter(
            (c) => c.userType_id == name && c.productType_id == productType
        )[0]
        if (row != null)
            this.discountProductUser.filter(
                (c) => c.userType_id == name && c.productType_id == productType
            )[0].discount = discount
        else
            this.discountProductUser.push({
                userType_id: name,
                productType_id: productType,
                discount: discount,
            })
        return this.discountProductUser.filter(
            (c) => c.userType_id == name && c.productType_id == productType
        )[0]
    }

    getSumDiscount(user: UserType, productType: ProductType): number {
        return (
            this.userTypeDiscount.filter((c) => c.userType == user)[0]
                .discount ??
            0 +
                this.discountProductUser.filter(
                    (c) =>
                        c.userType_id == user && c.productType_id == productType
                )[0].discount ??
            0
        )
    }
}
