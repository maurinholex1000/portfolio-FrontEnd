import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {

  public proyectos:Proyectos[]= [];
  public editProyecto:Proyectos | undefined;
  public deleteProyecto:Proyectos | undefined;

  constructor(private proyectosService:ProyectosService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.getProyectos();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getProyectos(): void{
    this.proyectosService.getProyectos().subscribe({
      next:(Response: Proyectos[]) =>{
        this.proyectos=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
    }
  
    public onOpenModal(mode:String, proyecto?:Proyectos):void{
      console.log('ENTRA AL MODAL')
      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      button.style.display="none";
      button.setAttribute('data-toggle','modal')
      if(mode==='add'){
        console.log('ENTRA AL ADD')
        button.setAttribute('data-target','#addProyectoModal');
      }else if(mode==='delete'){
        this.deleteProyecto=proyecto;
        button.setAttribute('data-target','#deleteProyectoModal');
      }else if(mode==='edit'){
        this.editProyecto=proyecto;
        button.setAttribute('data-target','#editProyectoModal');
      }
      container?.appendChild(button);
      button.click();
  
    }
  
    public onAddProyecto(addForm : NgForm){
      document.getElementById('add-proyecto-form')?.click();
      this.proyectosService.addProyecto(addForm.value).subscribe({
        next:(response:Proyectos) =>{
          console.log(response);
          this.getProyectos();
          addForm.reset();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
    public onUpdateProyecto(proyecto: Proyectos){
      this.editProyecto =proyecto;
      document.getElementById('add-proyecto-form')?.click();
      this.proyectosService.updateProyecto(proyecto).subscribe({
        next:(response:Proyectos) =>{
          console.log(response);
          this.getProyectos();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
  
    public onDeleteProyecto(idProy: number):void{
  
      this.proyectosService.deleteProyecto(idProy).subscribe({
        next:(response:void) =>{
          console.log(response);
          this.getProyectos();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
  
  

}
