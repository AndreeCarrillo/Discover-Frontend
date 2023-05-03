import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-make-opinion',
  templateUrl: './make-opinion.component.html',
  styleUrls: ['./make-opinion.component.scss']
})
export class MakeOpinionComponent {
  img: string = 'https://i.postimg.cc/nL8PsrZ9/hombre-foto.jpg' 
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false; 
  constructor(private _formBuilder: FormBuilder) {}

}
