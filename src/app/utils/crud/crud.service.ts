import { HttpClient, HttpHeaders, HttpParams , HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { finalize, Observable } from 'rxjs';
import { SuccessComponent } from 'src/app/dialog/success/success.component';
import { FileUpload } from '../model/file-upload';
import { Item } from '../model/item';
import { Transaction } from '../model/transaction';
import { User } from '../model/user';


const baseUrl = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private basePath = '/uploadQr';
  private basePath2 = '/uploadInvitation';

  private baseApi='http://localhost:8080/api/';

  constructor(private angularFirestore: AngularFirestore,private storage: AngularFireStorage,
    private db: AngularFireDatabase,public httpClient:HttpClient, public dialog:MatDialog
    ,private cookieService: CookieService) { }


  addUser(user:User):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.post(baseUrl+'users',user,requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess("L'utilisateur a été ajouter avec success");
      //window.location.reload();
    })
    )
  }

  addTransaction(transaction:Transaction):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.post(baseUrl+'transactions',transaction,requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess("La reference a été ajouter avec success");
      //window.location.reload();
    })
    )
  }

  addPaiement(email:any,forfait:any):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.post(baseUrl+'paiements',{'email':email,'forfait':forfait},requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess("Le forfait a été ajouter avec success");
      //window.location.reload();
    })
    )
  }

  desapprouvePaiement(email:any,forfait:any):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.post(baseUrl+'paiementss',{'email':email,'forfait':forfait},requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess("Le forfait a été retirer avec success");
      //window.location.reload();
    })
    )
  }

  getAllUserApi():Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'users',requestOptions);
  }

  getAllPaiementApi():Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'paiements',requestOptions);
  }

  getAllTransactionApi():Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'transactions',requestOptions);
  }

  getAllUplaodApi():Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'upload',requestOptions);
  }

  getAllUplaodByEmailApi(email:any):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'upload/'+email,requestOptions);
  }

  getUserById(id:any):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'users/'+id,requestOptions);
  }

  getTransactionById(id:any):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'transactions/'+id,requestOptions);
  }


  updateUserById(id:any,user:User):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
 
    const requestOptions = { headers: headers };

    return this.httpClient.put(baseUrl+'users/'+id,user,requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess("L'utilisateur a été modifier avec success");
      //window.location.reload();
    })
    );
    
  }

  updateTransactionById(id:any,transaction:Transaction):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
 
    const requestOptions = { headers: headers };

    return this.httpClient.put(baseUrl+'transactions/'+id,transaction,requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess("La transaction a été modifier avec success");
      //window.location.reload();
    })
    );
    
  }

  deleteUserById(id:any){
    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
 
    const requestOptions = { headers: headers };

    return this.httpClient.delete(baseUrl+'users/'+id,requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess("L'utilisateur a été supprimer avec success");
      //window.location.reload();
    })
    )
  }

  deletePaiementById(id:any){
    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
 
    const requestOptions = { headers: headers };

    return this.httpClient.delete(baseUrl+'paiements/'+id,requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess("Le credit a été supprimer avec success");
      //window.location.reload();
    })
    )
  }

  deleteTransactionById(id:any){
    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
 
    const requestOptions = { headers: headers };

    return this.httpClient.delete(baseUrl+'transactions/'+id,requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess("La transaction a été supprimer avec success");
      //window.location.reload();
    })
    )
  }

  countUser():Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'usersCount',requestOptions);
  }

  countUserActive():Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'usersCountActive',requestOptions);
  }

  countTransactionActive():Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'transactionsValide',requestOptions);
  }

  countTransactionDesactive():Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'transactionsNonValide',requestOptions);
  }

  countUserDesactive():Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'usersCountDesactive',requestOptions);
  }

  addInvitationApi(file:File,email:any,type:any,name:any):Observable<any>{

    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    const formData = new FormData();

    formData.append('name', name);
    formData.append('file', file);
    formData.append('email', email);
    formData.append('type', type);
    
    
    const req = new HttpRequest('POST', `${this.baseApi}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req)
    .pipe( finalize(()=>{
      this.dialogSuccess("L'invitation a été generer avec success");
      //window.location.reload();
    })
    );

    //return this.httpClient.post(baseUrl+'upload',formData,requestOptions);
  }

  verifyForfait(email:any):Observable<any>{
    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'paiementsMail/'+email,requestOptions);
  }

  countUpload(email:any):Observable<any>{
    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'/upload/'+email,requestOptions);
  }

  updateCredit(email:any,credit:any):Observable<any>{
    let token=this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
 
    const requestOptions = { headers: headers };

    return this.httpClient.put(baseUrl+'paiements/'+email,{'creditt':credit},requestOptions)
    .pipe( finalize(()=>{
      this.dialogSuccess3("Success");
      //window.location.reload();
    })
    );
  }


  addInvitation(fileUpload: FileUpload,item:Item){
    const filePath = `${this.basePath2}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
      fileUpload.url = downloadURL;
      fileUpload.name = fileUpload.file.name;

      item.description=downloadURL;
      item.name=localStorage.getItem('nomForm')?.toString();

      //localStorage.removeItem('urlInvitation');
      //localStorage.setItem('urlInvitation',downloadURL);
      //item.email_user=localStorage.getItem('email_user')?.toString();
      this.addItem(item);

      //this.dialogSuccess("L'invitation a été generer avec success");
      //alert('success');
      
      });
        })
      )
  }

  private addItem(item:Item){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore.collection('item-invitation')
      .add(item)
      .then((result) => { 
        this.dialogSuccess('Success');
      }, error => reject(error))
      ;
      })
  }

  deleteItem(item: { id: string | undefined; }){
    return this.angularFirestore.collection('item-invitation')
    .doc(item.id)
    .delete();
  }

  getAllItem(){
    return this.angularFirestore.collection('item-invitation')
    .snapshotChanges();
  }

  getItemByDesc(desc:any){
    return this.angularFirestore.collection('item-invitation')
    .ref.where('description','==',desc)
    .get()
  }

  getItemByEmail(email:any){
    return this.angularFirestore.collection('item-invitation')
    .ref.where('email','==',email)
    .get()
  }

  

  //Qr code Crud

  addQrCode(fileUpload: FileUpload,item:Item){
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
      fileUpload.url = downloadURL;
      fileUpload.name = fileUpload.file.name;

      item.description=downloadURL;
      item.name=localStorage.getItem('nomForm')?.toString();
      
      //localStorage.removeItem('urlQr');
      localStorage.setItem('urlQr',downloadURL);
      //item.email_user=localStorage.getItem('email_user')?.toString();
      this.addQr(item);
      //alert('success');
      
      });
        })
      ).subscribe();
     
  }

  private addQr(item:Item){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore.collection('item-qr')
      .add(item)
      .then(response => { }, error => reject(error))
      ;
      })
  }

  deleteQr(item: { id: string | undefined; }){
    return this.angularFirestore.collection('item-qr')
    .doc(item.id)
    .delete();
  }

  getAllQr(){
    return this.angularFirestore.collection('item-qr')
    .snapshotChanges();
  }

  deleteFile(url:any){
    return this.storage.storage.refFromURL(url).delete()
    .then(
      (result)=>{
        this.dialogSuccess2("L'invitation a été supprimer avec success");
      }
    );
  }

  // downloadFile(): Observable<HttpResponse<Blob>>{		
	// 	return this.httpClient.get('http://localhost:8080/employees/download', { responseType: ResponseContentType.Blob });
  //  }

  dialogSuccess(message:any){
    const timeout=1400;

      let dialogRef=this.dialog.open(SuccessComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
             window.location.reload();
          }, timeout)
        })
  }

  dialogSuccess3(message:any){
    const timeout=1400;

      let dialogRef=this.dialog.open(SuccessComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
             //window.location.reload();
          }, timeout)
        })
  }

  dialogSuccess2(message:any){
    const timeout=1400;

      let dialogRef=this.dialog.open(SuccessComponent,{data:message});

        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
             dialogRef.close();
             //window.location.reload();
          }, timeout)
        })
  }

  
}
