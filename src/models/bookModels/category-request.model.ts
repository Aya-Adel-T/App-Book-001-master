export interface CategoryRequest {
  name : string,
  image : File
}
export class Category {
  constructor(
    public name: string,
    public categoryImage: File | null
  ) {}
}
  export class CategoryEdit {
    constructor(
      public id :number,
      public name: string,
      public categoryImage: File | null
    ) {}
}
