import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienciaComponent implements OnInit {
  public experiencias: Experiencia[] = [];
  public editExperiencia:Experiencia | undefined;
  public deleteExperiencia:Experiencia | undefined;



  constructor(private experienciaService: ExperienciaService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.getExperiences();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getExperiences(): void{
    this.experienciaService.getExperience().subscribe({
      next:(Response: Experiencia[]) =>{
        this.experiencias=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
    }
  
    public onOpenModal(mode:String, experiencia?:Experiencia):void{
      console.log('ENTRA AL MODAL')
      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      button.style.display="none";
      button.setAttribute('data-toggle','modal')
      if(mode==='add'){
        console.log('ENTRA AL ADD')
        button.setAttribute('data-target','#addExperienceModal');
      }else if(mode==='delete'){
        this.deleteExperiencia=experiencia;
        button.setAttribute('data-target','#deleteExperienceModal');
      }else if(mode==='edit'){
        this.editExperiencia=experiencia;
        button.setAttribute('data-target','#editExperienceModal');
      }
      container?.appendChild(button);
      button.click();
  
    }
  
    public onAddExperience(addForm : NgForm){
      document.getElementById('add-experience-form')?.click();
      this.experienciaService.addExperience(addForm.value).subscribe({
        next:(response:Experiencia) =>{
          console.log(response);
          this.getExperiences();
          addForm.reset();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
    public onUpdateExperience(experiencia: Experiencia){
      this.editExperiencia =experiencia;
      document.getElementById('add-experience-form')?.click();
      this.experienciaService.updateExperience(experiencia).subscribe({
        next:(response:Experiencia) =>{
          console.log(response);
          this.getExperiences();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
  
    public onDeleteExperience(idExp: number):void{
  
      this.experienciaService.deleteExperience(idExp).subscribe({
        next:(response:void) =>{
          console.log(response);
          this.getExperiences();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
}