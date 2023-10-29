export interface uploadBookRequest {
  BookId : string,
  BookFile : File
}
export class uploadBook {
  constructor(
    public BookId : number,
    public BookFile : File | null
  ) {}
}
