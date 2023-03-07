import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { FileUpload } from '../model/file-upload';
import { Item } from '../model/item';
import { User } from '../model/user';

const baseUrl = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private basePath = '/uploadQr';
  private basePath2 = '/uploadInvitation';

  constructor(private angularFirestore: AngularFirestore,private storage: AngularFireStorage,private db: AngularFireDatabase,public httpClient:HttpClient) { }


  addUser(user:User):Observable<any>{

    let token=localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.post(baseUrl+'users',user,requestOptions);
  }

  getAllUserApi():Observable<any>{

    let token=localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'users',requestOptions);
  }

  getUserById(id:any):Observable<any>{

    let token=localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'users/'+id,requestOptions);
  }

  updateUserById(id:any,user:User):Observable<any>{

    let token=localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
 
    const requestOptions = { headers: headers };

    return this.httpClient.put(baseUrl+'users/'+id,user,requestOptions);
  }

  deleteUserById(id:any){
    let token=localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
 
    const requestOptions = { headers: headers };

    return this.httpClient.delete(baseUrl+'users/'+id,requestOptions);
  }

  countUser():Observable<any>{

    let token=localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'usersCount',requestOptions);
  }

  countUserActive():Observable<any>{

    let token=localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'usersCountActive',requestOptions);
  }

  countUserDesactive():Observable<any>{

    let token=localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const requestOptions = { headers: headers };

    return this.httpClient.get(baseUrl+'usersCountDesactive',requestOptions);
  }

  addInvitationApi():Observable<any>{
    return null;
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
      localStorage.setItem('urlInvitation',downloadURL);
      //item.email_user=localStorage.getItem('email_user')?.toString();
      this.addItem(item);
      //alert('success');
      
      });
        })
      ).subscribe();
     
  }

  private addItem(item:Item){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore.collection('item-invitation')
      .add(item)
      .then(response => { }, error => reject(error))
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

  
}
