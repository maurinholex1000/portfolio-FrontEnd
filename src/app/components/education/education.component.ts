import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  public educaciones:Educacion[]= [];
  public editEducacion:Educacion | undefined;
  public deleteEducacion:Educacion | undefined;


  constructor(private educacionService:EducacionService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.getEducations();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getEducations(): void{
  this.educacionService.getEducation().subscribe({
    next:(Response: Educacion[]) =>{
      this.educaciones=Response;
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
  }

  public onOpenModal(mode:String, educacion?:Educacion):void{
    console.log('ENTRA AL MODAL')
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display="none";
    button.setAttribute('data-toggle','modal')
    if(mode==='add'){
      console.log('ENTRA AL ADD')
      button.setAttribute('data-target','#addEducationModal');
    }else if(mode==='delete'){
      this.deleteEducacion=educacion;
      button.setAttribute('data-target','#deleteEducationModal');
    }else if(mode==='edit'){
      this.editEducacion=educacion;
      button.setAttribute('data-target','#editEducationModal');
    }
    container?.appendChild(button);
    button.click();

  }

  public onAddEducation(addForm : NgForm){
    document.getElementById('add-education-form')?.click();
    this.educacionService.addEducation(addForm.value).subscribe({
      next:(response:Educacion) =>{
        console.log(response);
        this.getEducations();
        addForm.reset();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateEducation(educacion: Educacion){
    this.editEducacion =educacion;
    document.getElementById('add-education-form')?.click();
    this.educacionService.updateEducation(educacion).subscribe({
      next:(response:Educacion) =>{
        console.log(response);
        this.getEducations();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  public onDeleteEducation(idEdu: number):void{

    this.educacionService.deleteEducation(idEdu).subscribe({
      next:(response:void) =>{
        console.log(response);
        this.getEducations();
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }





}
