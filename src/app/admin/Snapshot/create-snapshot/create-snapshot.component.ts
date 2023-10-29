import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SnapshotReq } from 'src/models/bookModels/snapshot-req';
import { SnapshotService } from 'src/service/Book/snapshot.service';

@Component({
  selector: 'app-create-snapshot',
  templateUrl: './create-snapshot.component.html',
  styleUrls: ['./create-snapshot.component.css']
})
 export class CreateSnapshotComponent implements OnInit {
  fileForm: FormGroup;
 snapshot: SnapshotReq = new SnapshotReq(0, null);
 err :string
  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private apiService: SnapshotService, private router:Router) { }

  ngOnInit(): void {
    this.fileForm = this.formBuilder.group({
      filesArray: this.formBuilder.array([], Validators.required)
    });

     this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
       console.log(+params.get('id')!);
       this.snapshot.bookId = +params.get('id')!
     });
  }

  get filesArray(): FormArray {
    return this.fileForm.get('filesArray') as FormArray;
  }

  addFile(): void {
    this.filesArray.push(this.formBuilder.control(null));
  }

  removeFile(index: number): void {
    this.filesArray.removeAt(index);
  }
  snap: SnapshotReq = new SnapshotReq(this.snapshot.bookId,null);
errors:string
  submitForm(): void {
this.snap.bookId = this.snapshot.bookId
      this.apiService.addSnapshot(this.snap)
        .subscribe(
          (response) => {
            console.log('Data sent successfully', response);
            alert("Added succesfully")
            this.router.navigate(['/allBooks'])
          },
          (error) => {
            console.error('Error sending data', error);
            this.errors=error.error.message
            this.err= error.error.message
          }
        );
    }

    onFileChange(event: any) {
      const files = event.target.files;
      if (files && files.length > 0) {
        const fileControls = this.fileForm.get('filesArray') as FormArray;
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          fileControls.push(new FormControl(file)); // Add each file as a new form control
        }
        event.target.value = ''; // Reset the value of the file input element
        // console.log(fileControls)
        this.snap.Snapshot = fileControls.getRawValue();
        // console.log(this.snap)
      }
  }
}




