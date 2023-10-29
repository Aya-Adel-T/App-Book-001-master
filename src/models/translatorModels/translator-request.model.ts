export interface TranslatorRequest {
  Name :string,
  Image?: File,
  Description? :string
}
export class Translator {
    constructor(
      public name: string,
      public image: File | null,
      public description : string
    ) {}
}
export class EditTranslator {
  constructor(
    public id: number,
    public name: string,
    public image: File | null,
    public description : string
  ) {}
}
