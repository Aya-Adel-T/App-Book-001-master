export interface SnapshotRequest {
  BookId : number,
  BookSnapshots: File[];
}
export class SnapshotReq {
  constructor(
    public bookId : number,
    public Snapshot : File[] |null
  ) {}
}

