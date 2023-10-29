export interface BookRequest {
  Title:string ,
  ISBN?: string,
  OriginalTitle?: string,
  Description?: string,
  NumberOfPages?: number,
  Year?: number,
  Edition?: number,
  Publisher?: string,
  OriginalLanguage?: string,
  TranslatedToLanguage?: string,
  Price: number,
  AuthorId : string,
  CategoriesIds?: Array<Number>,
  TranslatorsIds?: Array<Number>,
  BookCoverFile?:File
}
export class Boook {
  constructor(
   public Title:string ,
   public ISBN: string,
   public  OriginalTitle: string,
   public Description: string,
   public NumberOfPages: number,
   public Year: number,
   public Edition: number,
   public Publisher: string,
   public OriginalLanguage: string,
   public TranslatedToLanguage: string,
   public Price: number,
   public AuthorId : string,
   public CategoriesIds: number[],
   public TranslatorsIds: number[],
   public BookCoverFile?:File | null
  ) {}
  }
  export interface BoookFitlerRequest {

    PageNumber :number,
    PageSize :number,
    SearchString? :string,
    CategoryId? : number,
   AuthorId? :number,
   OrderBy? :string

    }
