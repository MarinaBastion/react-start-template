//register user
export type SignUpBody = {
    email: string;
    password: string;
    commandId: string;
  }; 
//response register user
export type AuthResult = {
    token: string;
  };

  //response get products
export type ProductsResult = {
    data: Product[];
    pagination: {
      pageSize: number;
      pageNumber: number;
      total: number;
    };
    sorting: {
      type: 'ASC' | 'DESC';
      field: 'id' | 'createdAt' | 'updatedAt' | 'name';
    }
  }

export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};
export type Product = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  oldPrice?: number;
  price: number;
  commandId: string;
  category: Category;
};
export type ProductFilterQuery =
{
    pageSize: number;
    pageNumber: number;
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
}
export type ProductBody = {
  name: string;
  photo?: string;
  desc?: string;
  oldPrice?: number;
  price: number;
  categoryId: string;
};