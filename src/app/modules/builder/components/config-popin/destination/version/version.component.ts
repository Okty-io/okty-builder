import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ContainerConfigField } from '../../../../models/container-config-field';

@Component({
  selector: 'app-builder-config-popin-destination-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() field: ContainerConfigField;

  public data: string[];
  public faPlus;
  public faTrash;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form.addControl('type', new FormControl('select-single'));
    this.form.addControl('base', new FormControl('')); // Always empty for version

    this.form.addControl('source', this.formBuilder.array(this.getDefaultSourceValues())); // Available values
    this.form.addControl('value', new FormControl(this.field && this.field.value ? this.field.value : 'latest')); // Default value

    this.faPlus = faPlus;
    this.faTrash = faTrash;
    this.data = [];
  }

  initVersion(): AbstractControl {
    return this.formBuilder.control('', Validators.required); // TODO Add tag validator (check from docker hub)
  }

  addVersion(): void {
    const control = this.form.controls.source as FormArray;
    control.push(this.initVersion());
  }

  removeVersion(index: number): void {
    const control = this.form.controls.source as FormArray;
    control.removeAt(index);
  }

  private getDefaultSourceValues(): AbstractControl[] {
    if (!this.field.source) {
      return [this.formBuilder.control('latest', Validators.required)];
    }

    const sources = [];
    this.field.source.forEach((element) => sources.push(this.formBuilder.control(element, Validators.required)));

    return sources;
  }

  get sourceControls() {
    return (this.form.controls.source as FormArray).controls;
  }

  get valueControl() {
    return this.form.get('value') as FormControl;
  }

  get versionOptions() {
    return Object.values(this.form.controls.source.value).map((value: string) => {
      if (!value || value.length <= 0) {
        return;
      }

      return {label: value, value};
    }).filter(Boolean);
  }

  sourceControl(i: number) {
    const source = this.form.get('source') as FormArray;

    return source.at(i) as FormControl;
  }
}
