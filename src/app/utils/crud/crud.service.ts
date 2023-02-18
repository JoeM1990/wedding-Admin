import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private basePath = '/uploadQr';
  private basePath2 = '/uploadInvitation';

  constructor(private angularFirestore: AngularFirestore,private storage: AngularFireStorage,private db: AngularFireDatabase) { }

}
