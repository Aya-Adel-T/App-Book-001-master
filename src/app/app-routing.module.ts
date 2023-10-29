import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { CategoryComponent } from './admin/category/category.component';
import { CreateNewCategoryComponent } from './admin/category/create-new-category/create-new-category.component';
import { FormatMainComponent } from './admin/Format/format-main/format-main.component';
import { AddFormatComponent } from './admin/Format/createFormat/add-format/add-format.component';
import { AllFormatsComponent } from './admin/Format/AllFormats/all-formats/all-formats.component';
import { DeleteFormatComponent } from './admin/Format/delete-format/delete-format.component';
import { EditFormatComponent } from './admin/Format/edit-format/edit-format.component';
import { AllCategoriesComponent } from './admin/category/all-categories/all-categories.component';
import { HomeComponent } from './home/home/home.component';
import { MainSpinnerComponent } from './shared/main-spinner/main-spinner.component';
import { EditCategoryComponent } from './admin/category/editcategory/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './admin/category/delete-category/delete-category.component';
import { CategoryDetailsComponent } from './admin/category/categoryDetails/category-details/category-details.component';
import { BookMainComponent } from './admin/Book/book-main/book-main.component';
import { AllBooksComponent } from './admin/Book/all-books/all-books.component';
import { BookDetailsComponent } from './admin/Book/book-details/book-details.component';
import { DeleteBookComponent } from './admin/Book/delete-book/delete-book.component';
import { AddBookInfoComponent } from './admin/Book/add-book-info/add-book-info.component';
import { AddBookComponent } from './admin/Book/add-book/add-book.component';
import { EditBookInfoComponent } from './admin/Book/edit-book-info/edit-book-info.component';
import { EditBookComponent } from './admin/Book/edit-book/edit-book.component';
import { HomeBookDetailComponent } from './home/home-book-detail/home-book-detail.component';
import { CartComponent } from './core/cart/cart.component';
import { WishListComponent } from './core/wish-list/wish-list.component';
import { CreateSnapshotComponent } from './admin/Snapshot/create-snapshot/create-snapshot.component';
import { AllTranslatorsComponent } from './admin/Translator/all-translators/all-translators.component';
import { TranslatorDetailsComponent } from './admin/Translator/translator-details/translator-details.component';
import { DeleteTranslatorComponent } from './admin/Translator/delete-translator/delete-translator.component';
import { AddTranslatorComponent } from './admin/Translator/add-translator/add-translator.component';
import { EditTranslatorComponent } from './admin/Translator/edit-translator/edit-translator.component';
import { MainDashboardComponent } from './admin/Dashboard/mainDashboard/main-dashboard/main-dashboard.component';
import { DeleteBookFileComponent } from './admin/Book/delete-book-file/delete-book-file.component';
import { AllCouponsComponent } from './admin/Coupon/all-coupons/all-coupons.component';
import { AddCouponComponent } from './admin/Coupon/add-coupon/add-coupon.component';
import { DeleteCouponComponent } from './admin/Coupon/delete-coupon/delete-coupon.component';
import { AllUsersComponent } from './admin/Useres/all-users/all-users.component';
import { ApprovePendingAuthorComponent } from './admin/Useres/Authors/approve-pending-author/approve-pending-author.component';
import { AllAuthorsComponent } from './admin/Useres/Authors/all-authors/all-authors.component';
import { DeleteAuthorComponent } from './admin/Useres/Authors/delete-author/delete-author.component';
import { AddBookToAUserComponent } from './admin/Useres/Readers/add-book-to-auser/add-book-to-auser.component';
import { AllReadersComponent } from './admin/Useres/Readers/all-readers/all-readers.component';
import { UserBooksComponent } from './admin/Useres/Readers/user-books/user-books.component';
import { UserProfileComponent } from './user/Profile/user-profile/user-profile.component';
import { ChangePasswordComponent } from './user/Profile/change-password/change-password.component';
import { SummaryComponent } from './home/summary/summary.component';
import { PaymentComponent } from './home/payment/payment.component';
import { SearchResultComponent } from './home/search-result/search-result.component';
import { ExploreComponent } from './home/explore/explore.component';


const routes: Routes = [
    {path:'',  redirectTo: '/home', pathMatch: 'full'},
    //{path: '**', component: PageNotFoundComponent}
    {path:'home', component :HomeComponent },
    {path:'home/explore', component :ExploreComponent },
    {path:'search', component :SearchResultComponent },
    //{path:'spin', component :MainSpinnerComponent },
    {path:'home/:id', component : HomeBookDetailComponent},
    {path:'register', component : RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'cart',component:CartComponent},
    {path:'wishlist',component:WishListComponent},
    {path:'cart/summary',component:SummaryComponent},
    {path:'success/:id',component:PaymentComponent},
    {path:'resetPassword/:email',component:ResetPasswordComponent},
    {path:'forgetPassword',component:ForgetPasswordComponent},
    {path:'category',component:CategoryComponent},
    {path:'createCategory',component:CreateNewCategoryComponent},
    {path:'allCategories',component:AllCategoriesComponent},
    {path:'formatMain',component:FormatMainComponent},
    {path:'addFormat',component:AddFormatComponent},
    {path:'allFormats',component:AllFormatsComponent},
    {path:'deleteFormat/:id',component:DeleteFormatComponent},
    {path:'editFormat/:id',component:EditFormatComponent},
    {path:'editCategory/:id',component:EditCategoryComponent},
    {path:'categoryDetails/:id',component:CategoryDetailsComponent},
    {path:'deleteCategory/:id',component:DeleteCategoryComponent},
    {path:'bookMain',component:BookMainComponent},
    {path:'allBooks',component:AllBooksComponent},
    {path:'bookDetails/:id',component:BookDetailsComponent},
    {path:'deleteBook/:id',component:DeleteBookComponent},
    {path:'addBookInfo',component:AddBookInfoComponent},
    {path:'addBook/:id',component:AddBookComponent},
    {path:'editBookInfo/:id',component:EditBookInfoComponent},
    {path:'editBook/:id',component:EditBookComponent},
    {path:'addSnapshots/:id',component:CreateSnapshotComponent},
    {path:'allTranslators',component:AllTranslatorsComponent},
    {path:'translatorDetails/:id',component:TranslatorDetailsComponent},
    {path:'deleteTranslator/:id',component:DeleteTranslatorComponent},
    {path:'addTranslator',component:AddTranslatorComponent},
    {path:'editTranslator/:id',component:EditTranslatorComponent},
    {path:'mainDashBoard',component:MainDashboardComponent},
    {path:'deleteBookFile/:id',component:DeleteBookFileComponent},
    {path:'AllCoupons',component:AllCouponsComponent},
    {path:'addCoupon',component:AddCouponComponent},
    {path:'deleteCoupon/:id',component:DeleteCouponComponent},
    {path:'allUsers',component:AllUsersComponent},
    {path:'approvePendingAuthor',component:ApprovePendingAuthorComponent},
    {path:'allAuthors',component:AllAuthorsComponent},
    {path:'deleteAuthor',component:AddBookToAUserComponent},
    {path:'addBookToAUser/:id',component:AddBookToAUserComponent},
    {path:'allReaders',component:AllReadersComponent},
    {path:'userBooks/:id',component:UserBooksComponent},
    {path:'userProfile/:id',component:UserProfileComponent},
    {path:'changePassword',component:ChangePasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






