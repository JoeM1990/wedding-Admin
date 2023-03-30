import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { ConfirmationComponent } from 'src/app/dialog/confirmation/confirmation.component';
import { AuthService } from 'src/app/utils/auth/auth.service';
import { CrudService } from 'src/app/utils/crud/crud.service';
import { User } from 'src/app/utils/model/user';

import { MatTableDataSource } from '@angular/material/table';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-comple-client',
  templateUrl: './comple-client.component.html',
  styleUrls: ['./comple-client.component.css']
})
export class CompleClientComponent implements OnInit {

  //@ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;    

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  // dtOptions: DataTables.Settings={};
  // dtTrigger: Subject<any> = new Subject<any>();

  // dataParams: any = {  
  //   page_num: '',  
  //   page_size: ''  
  // };  

  
  user:any;
  user2:[]=[];
  clientForm:FormGroup;
  updateForm:FormGroup;

  idUpdate:any;

  checkingRole=true;

  // options = {}
  // data = [];
  // columns: any = {};
  // rows={};

  pgIndex= 2;
  firstLastButtons= true;
  pnDisabled= true;
  hdPageSize= true;

  displayedColumns: string[] = ['username', 'email', 'role', 'status'];
  dataSource = new MatTableDataSource<User> ();

  //dataSource;

  constructor(public auth:AuthService, public formBuilder:FormBuilder, 
    public crud:CrudService, public router:Router, public dialog:MatDialog, private cookieService: CookieService) {
    this.clientForm = this.formBuilder.group({
      username: ['',{validators: [Validators.required, ],}],
      email: ['',{validators: [Validators.required, Validators.email],}],
      password: ['',{validators: [Validators.required, Validators.maxLength(10) ], }],
      role: ['',{validators: [ Validators.required, ], }],
      isApproved: ['',{validators: [ Validators.required, ], }]
    })

    this.updateForm = this.formBuilder.group({
      username: ['',{validators: [Validators.required, ],}],
      email: ['',{validators: [Validators.required, Validators.email],}],
      password: ['',{validators: [Validators.required, Validators.maxLength(10) ], }],
      role: ['',{validators: [ Validators.required, ], }],
      isApproved: ['',{validators: [ Validators.required, ], }]
    })
   }

  ngOnInit(): void {

    // this.dataParams.page_num = 1;  
    // this.dataParams.page_size = 5;  

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength:5,
    // }

    //this.initDataTable();
    
    this.checkRole();


    this.crud.getAllUserApi()
    .subscribe(
      response => {
        this.user=response;

        // $('#dataExampleTable').DataTable( {
        //       pagingType: 'full_numbers',
        //       pageLength: 5,
        //       processing: true,
        //       lengthMenu: [5,10,20],
        //       data:response
        //   } );

        // setTimeout(()=>{
        //   $('#dataExampleTable').DataTable( {
        //     pagingType: 'full_numbers',
        //     pageLength: 5,
        //     processing: true,
        //     lengthMenu: [5,10,20],
        // } );
        // })

        

        //this.initDataTable(response);

        

        this.dataSource=new MatTableDataSource<User>(response);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        //console.log(error)
      });

      this.initDataTable2();
  }

  // ngAfterViewInit() {
  //   //this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.dtTrigger.next()
  // }   

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next(null);
  // }

  addUser(){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous ajouter cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
            this.crud.addUser(this.clientForm.value)
        .subscribe(
          response =>{
            if(response){
              //window.location.reload();
              
            }
          },
          error =>{
            //alert(error['message']);
          }
        );
      }
    })
    
  }

  getUserById(id:any){
    this.crud.getUserById(id)
    .subscribe(
      response => {
        this.idUpdate=response['id']

        this.updateForm = this.formBuilder.group({
          username: response['username'],
          email: response['email'],
          password: response['password'],
          role: response['password'],
          isApproved: response['isApproved']
        })
      },
      error => {
        //console.log(error)
      });
  }

  updateUserById(id:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous modifier cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
        this.crud.updateUserById(id,this.updateForm.value)
        .subscribe(
            response => {
              if(response){
                //window.location.reload();
              }
        
            },
              error => {
            //    console.log(error)
              });
      }
    })
      
  }

  deleteUserById(id:any){

    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous supprimer cet utilisateur ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
          this.crud.deleteUserById(id)
      .subscribe(
        response => {
          if(response){
            //window.location.reload();
          }
          
        },
        error => {
          //console.log(error)
        });
      }
    })

  }

  onConfirmation(){
    
    let refDialog=this.dialog.open(ConfirmationComponent,{data:'Voulez-vous vous Deconnecter ?'});


    refDialog.afterClosed().subscribe(res=>{
      if(res == 'true'){
        this.auth.logoutApi();
      }
    })
  }

  checkRole(){
    if(this.cookieService.get('role')=='Client'){
      this.checkingRole=false;
    }
  }

  onChangePage(pe:PageEvent) {
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next(null);
  //   });
  // }

  initDataTable(){
    $(document).ready(function() {
      var table = $('#dataExampleTable').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu: [5],
      } );
  } );
  }

  initDataTable2(){
    $(document).ready(function(){
      $("#dataExampleTable #checkall").click(function () {
              if ($("#dataExampleTable #checkall").is(':checked')) {
                  $("#dataExampleTable input[type=checkbox]").each(function () {
                      $(this).prop("checked", true);
                  });
      
              } else {
                  $("#mytable input[type=checkbox]").each(function () {
                      $(this).prop("checked", false);
                  });
              }
          });
          
          //$("[data-toggle=tooltip]").tooltip();
      });
      
  }
}
