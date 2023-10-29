export class ProfileEditRequest {
  constructor(
    public Id :string,
    public UserName : string,
    public Email : string,
    public PhoneNumber : string,
    public FirstName : string,
    public LastName : string,
    public BirthPlace : string,
    public Religion : string,
    public Nationality : string,
    public Gender : string,
    public BirthDate : string,
    public Image: File | null
    ) {}
}


