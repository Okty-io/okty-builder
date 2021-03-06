import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContainerConfigField } from '../../../../models/container-config-field';
import { EnvironmentsValidator } from '../../../../validators/environments.validator';

@Component({
  selector: 'app-builder-config-popin-destination-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() field: ContainerConfigField;

  ngOnInit() {
    this.addBaseField();
    this.addValueField();

    this.addStaticFields();
  }

  private addBaseField(): void {
    const validators = [];
    validators.push(Validators.required);
    validators.push(EnvironmentsValidator.isBaseValid);

    this.form.addControl('base', new FormControl(this.field ? this.field.base : '', validators));
  }

  private addValueField(): void {
    const validators = [];
    validators.push(Validators.required);

    this.form.addControl('value', new FormControl(this.field ? this.field.value : '', validators));
  }

  private addStaticFields(): void {
    this.form.addControl('type', new FormControl('input'));
  }

  get baseControl() {
    return this.form.get('base') as FormControl;
  }

  get valueControl() {
    return this.form.get('value') as FormControl;
  }
}
