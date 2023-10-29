import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { CreateNewCategoryComponent } from './category/create-new-category/create-new-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from 'src/service/service.module';
import { ModelsModule } from 'src/models/models.module';
import { RouterModule } from '@angular/router';
import { FormatMainComponent } from './Format/format-main/format-main.component';
import { AddFormatComponent } from './Format/createFormat/add-format/add-format.component';
import { AllFormatsComponent } from './Format/AllFormats/all-formats/all-formats.component';
import { AllCategoriesComponent } from './category/all-categories/all-categories.component';
import { EditCategoryComponent } from './category/editcategory/edit-category/edit-category.component';
import { CategoryDetailsComponent } from './category/categoryDetails/category-details/category-details.component';
import { BookMainComponent } from './Book/book-main/book-main.component';
import { AllBooksComponent } from './Book/all-books/all-books.component';
import { AddBookInfoComponent } from './Book/add-book-info/add-book-info.component';
import { AddBookComponent } from './Book/add-book/add-book.component';
import { DeleteBookComponent } from './Book/delete-book/delete-book.component';
import { EditBookInfoComponent } from './Book/edit-book-info/edit-book-info.component';
import { EditBookComponent } from './Book/edit-book/edit-book.component';
import { BookDetailsComponent } from './Book/book-details/book-details.component';
import { CreateSnapshotComponent } from './Snapshot/create-snapshot/create-snapshot.component';
import { AddTranslatorComponent } from './Translator/add-translator/add-translator.component';
import { DeleteTranslatorComponent } from './Translator/delete-translator/delete-translator.component';
import { EditTranslatorComponent } from './Translator/edit-translator/edit-translator.component';
import { AllTranslatorsComponent } from './Translator/all-translators/all-translators.component';
import { TranslatorDetailsComponent } from './Translator/translator-details/translator-details.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { DeleteFormatComponent } from './Format/delete-format/delete-format.component';
import { EditFormatComponent } from './Format/edit-format/edit-format.component';
import { MainDashboardComponent } from './Dashboard/mainDashboard/main-dashboard/main-dashboard.component';
import { DeleteBookFileComponent } from './Book/delete-book-file/delete-book-file.component';
import { PaginatorModule } from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import { AllCouponsComponent } from './Coupon/all-coupons/all-coupons.component';
import { AddCouponComponent } from './Coupon/add-coupon/add-coupon.component';
import { DeleteCouponComponent } from './Coupon/delete-coupon/delete-coupon.component';
import { UpdateCouponComponent } from './Coupon/update-coupon/update-coupon.component';
import { AllAuthorsComponent } from './Useres/Authors/all-authors/all-authors.component';
import { AllUsersComponent } from './Useres/all-users/all-users.component';
import { ApprovePendingAuthorComponent } from './Useres/Authors/approve-pending-author/approve-pending-author.component';
import { DeleteAuthorComponent } from './Useres/Authors/delete-author/delete-author.component';
import { AddBookToAUserComponent } from './Useres/Readers/add-book-to-auser/add-book-to-auser.component';
import { AllReadersComponent } from './Useres/Readers/all-readers/all-readers.component'
import {ToastModule} from 'primeng/toast';
import { UserBooksComponent } from './Useres/Readers/user-books/user-books.component';






@NgModule({
  declarations: [
    CategoryComponent,
    CreateNewCategoryComponent,
    FormatMainComponent,
    AddFormatComponent,
    AllFormatsComponent,
    AllCategoriesComponent,
    EditCategoryComponent,
    CategoryDetailsComponent,
    BookMainComponent,
    AllBooksComponent,
    AddBookInfoComponent,
    AddBookComponent,
    DeleteBookComponent,
    EditBookInfoComponent,
    EditBookComponent,
    BookDetailsComponent,
    CreateSnapshotComponent,
    AddTranslatorComponent,
    DeleteTranslatorComponent,
    EditTranslatorComponent,
    AllTranslatorsComponent,
    TranslatorDetailsComponent,
    DeleteCategoryComponent,
    DeleteFormatComponent,
    EditFormatComponent,
    MainDashboardComponent,
    DeleteBookFileComponent,
    AllCouponsComponent,
    AddCouponComponent,
    DeleteCouponComponent,
    UpdateCouponComponent,
    AllAuthorsComponent,
    AllUsersComponent,
    ApprovePendingAuthorComponent,
    DeleteAuthorComponent,
    AddBookToAUserComponent,
    AllReadersComponent,
    UserBooksComponent,



  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceModule,
    ModelsModule,
    RouterModule,
    PaginatorModule,
    TableModule,
    ToastModule
  ],
  exports:[CategoryComponent,CreateNewCategoryComponent]

})
export class AdminModule { }
