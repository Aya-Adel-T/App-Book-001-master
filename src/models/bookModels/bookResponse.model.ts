export interface bookResponse {
  id:number,
  title:string ,
  isbn: string,
  originalTitle: string,
  description: string,
  cover:string,
  numberOfPages?: number,
  year?: number,
  edition?: number,
  publisher?: string,
  originalLanguage?: string,
  translatedToLanguage?: string,
  creationDate:Date;
  price: number,
  updateDate?: Date,
  bookCategories : string[],
  author: string,
  bookFormats: string[],
  snapshots: string[],
  reviews?: string[],
  bookTranslators?: string[],
  userBooks:string[]
}
