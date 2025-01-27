export type CategoryFilters = {
    pagination?: {
      pageSize?: number;
      pageNumber?: number;
    };    
    sorting?: {
      type: 'ASC' | 'DESC';
      field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
    };
  };
  export type Category = {
    id: string;
    name: string;
    photo?: string;
    createdAt: Date;
    updatedAt: Date;
    commandId: string;
  };
  export type CategoryResponse = 
  {
    data: Category[];
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