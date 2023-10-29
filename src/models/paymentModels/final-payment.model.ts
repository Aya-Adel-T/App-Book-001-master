export interface FinalPayment {
  totalAmount:number
}
export class AddBookToUser {
  constructor(
    public CustomerId:string,
    public BookId:number
  ) {}

}
