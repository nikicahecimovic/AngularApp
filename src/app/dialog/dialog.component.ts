import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  stateList = ["Brand new", "Used", "Repaired damage"]
  vehicleForm !: FormGroup
  formName : string = "Add Vehicle Form"
  actionButton : string = "Save"
  constructor(private formBuilder: FormBuilder,
    private api : ApiService,
    @Inject (MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent >) { }

  ngOnInit(): void {
    this.vehicleForm = this.formBuilder.group({
      vehicleName : ['',Validators.required],
      category: ['',Validators.required],
      state: ['',Validators.required],
      price: ['',Validators.required],
      date: ['',Validators.required],
      comment: ['',Validators.required]
    })

    if(this.editData){
      this.formName = "Edit Vehicle Form";
      this.actionButton = "Update";
      this.vehicleForm.controls['vehicleName'].setValue(this.editData.vehicleName);
      this.vehicleForm.controls['category'].setValue(this.editData.category);
      this.vehicleForm.controls['state'].setValue(this.editData.state);
      this.vehicleForm.controls['price'].setValue(this.editData.price);
      this.vehicleForm.controls['date'].setValue(this.editData.date);
      this.vehicleForm.controls['comment'].setValue(this.editData.comment);
    }
  }


  addVehicle(){
    if(!this.editData){
      if(this.vehicleForm.valid){
        this.api.postVehicle(this.vehicleForm.value)
        .subscribe({
          next:(res)=>{
            console.log("Vehicle added successfully");
            this.vehicleForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the vehicle");
          }
        })
      }
    } else {
      this.updateProduct()

    }
  }

  updateProduct(){
    this.api.putVehicle(this.vehicleForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        console.log("Vehicle Updated Successfully!")
        this.vehicleForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the vehicle!")
      }
    })
  }
}
