import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { FileUpload } from '../model/file-upload';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private basePath = '/uploadQr';
  private basePath2 = '/uploadInvitation';

  constructor(private angularFirestore: AngularFirestore,private storage: AngularFireStorage,private db: AngularFireDatabase) { }


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
      localStorage.setItem('urlInvitation',downloadURL);
      //item.email_user=localStorage.getItem('email_user')?.toString();
      this.addItem(item);
      alert('success');
      
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

  

  
}
