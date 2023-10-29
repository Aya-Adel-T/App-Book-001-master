import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, elementAt, finalize } from 'rxjs';
import { bookUrl } from 'src/environment/environment.module';
import { SnapshotReq } from 'src/models/bookModels/snapshot-req';
import { Header } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {
  baseUrl = bookUrl;
    constructor(private http:HttpClient) { }
    addSnapshot(snapshot: SnapshotReq): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('bookId', snapshot.bookId.toString());
      const files: File[] | null = snapshot.Snapshot;
       if (files && files.length > 0) {

      for (let i = 0; i < files.length; i++) {
        formData.append("BookSnapshots", files[i],files[i].name);
      }
    }
      console.log(formData.getAll('BookSnapshots')); // Verify that the files are correctly appended to the formData object
      return this.http.post(`${this.baseUrl}snapshots`, formData).pipe(
        finalize(() => {
          // This code will execute after the request is complete
          console.log('Request completed');
        })
      );
    }
}
