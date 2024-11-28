import {describe, expect, test} from '@jest/globals';
import { userEvent } from '@storybook/test';
import {UserType,ProductType,IDiscountProductUser,IUserTypeDiscount} from "./Types"

const mockReturnUserAnddiscount = jest.fn((name:UserType, discount: number) => { 
    let res: IUserTypeDiscount = {userType: name, discount: discount}
    return res });


const mockReturnUserAndProductTypeDiscount = jest.fn((name:UserType,productType:ProductType, discount: number) => { 
    let res: IDiscountProductUser = {userType_id: name,productType_id: productType, discount: discount}
    return res });

    const mockReturnSumDiscount = jest.fn((user:UserType, productType: ProductType) => { 
        switch (user) {
            case 1:
                if (productType == ProductType.Toy)
                    return 40
                else return 20
            case 2:
                if (productType == ProductType.Car)
                    return 45
                else return 30
            case 0: 
                return 10
            case 3: 
                return 50
            default:
                 break;
        }
     });
       

describe('setup correct discount for user', () => {
  test('adds 20% for Premium', () => {
    //let res10: IUserTypeDiscount = {userType:UserType.Standard,discount: 10};
    let res20: IUserTypeDiscount = mockReturnUserAnddiscount(UserType.Premium,20)
    expect(res20.discount).toBe(20);
    expect(res20.userType).toBe(UserType.Premium);
  });
  test('adds 10% for Standard', () => {
    let res10: IUserTypeDiscount = mockReturnUserAnddiscount(UserType.Standard,10)
    expect(res10.discount).toBe(10);
    expect(res10.userType).toBe(UserType.Standard);
  });
  test('adds 30% for Gold', () => {
    let res30: IUserTypeDiscount = mockReturnUserAnddiscount(UserType.Gold,30)
    expect(res30.discount).toBe(30);
    expect(res30.userType).toBe(UserType.Gold);
  });
  test('adds 50% for Free', () => {
    let res50: IUserTypeDiscount = mockReturnUserAnddiscount(UserType.Free,50)
    expect(res50.discount).toBe(50);
    expect(res50.userType).toBe(UserType.Free);
  });
});

describe('setup correct discount for user and product type', () => {
    test('adds 20% for Premium and Toy', () => {
      let res20: IDiscountProductUser = mockReturnUserAndProductTypeDiscount(UserType.Premium,ProductType.Toy, 20)
      expect(res20.discount).toBe(20);
      expect(res20.userType_id).toBe(UserType.Premium);
      expect(res20.productType_id).toBe(ProductType.Toy);
    });
    test('adds 15% for Gold and Car', () => {
        let res15: IDiscountProductUser = mockReturnUserAndProductTypeDiscount(UserType.Gold,ProductType.Car, 15)
        expect(res15.discount).toBe(15);
        expect(res15.userType_id).toBe(UserType.Gold);
        expect(res15.productType_id).toBe(ProductType.Car);
      });
});
describe('get correct sum discount ', () => {
    test('get discount for Premium and Toy', () => {
      expect(mockReturnSumDiscount(UserType.Premium,ProductType.Toy)).toBe(40);
    });
    test('get discount for Gold and Car', () => {
        expect(mockReturnSumDiscount(UserType.Gold,ProductType.Car)).toBe(45);
      });
    test('get discount for Standart and Food', () => {
    expect(mockReturnSumDiscount(UserType.Standard,ProductType.Food)).toBe(10);
    });
});