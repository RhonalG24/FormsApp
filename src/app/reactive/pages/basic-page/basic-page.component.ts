import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validator.service';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 2,
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl( '', [], [] ), //(<valor por defecto>, [validaciones síncronas], [validaciones asíncronas])
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required , Validators.minLength(3)]],
    price: [0, [ Validators.required, Validators.min(0)]],
    inStorage: [0, [ Validators.required, Validators.min(0)]],
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}
  ngOnInit(): void {
    this.myForm.reset( rtx5090 );
  }

  isValidField( field: string): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  getFieldError( field:string): string | null {
    if ( !this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {} ;

    for (const key of Object.keys(errors)) {
     switch ( key ){
      case 'required':
        return 'Este campo es requerido';
      case 'minlength':
        return `Mínimo ${ errors['minlength'].requiredLength } caractéres`;
     }
    }

    return null;
  }

  onSave():void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched()
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({
      price: 0,
      inStorage: 0
    });
  }
}
