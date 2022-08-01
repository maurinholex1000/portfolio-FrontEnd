import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skills } from 'src/app/model/skills';
import { SkillsService } from 'src/app/service/skills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-hard-and-skills',
  templateUrl: './hard-and-skills.component.html',
  styleUrls: ['./hard-and-skills.component.css']
})
export class HardAndSkillsComponent implements OnInit {

  public skills:Skills[]= [];
  public editSkill:Skills | undefined;
  public deleteSkill:Skills | undefined;

  constructor(private skillsService:SkillsService, private tokenService: TokenService) { }
  
  isLogged = false;

  ngOnInit(): void {
    this.getSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getSkills(): void{
    this.skillsService.getSkills().subscribe({
      next:(Response: Skills[]) =>{
        this.skills=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
    }
  
    public onOpenModal(mode:String, skill?:Skills):void{
      console.log('ENTRA AL MODAL')
      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      button.style.display="none";
      button.setAttribute('data-toggle','modal')
      if(mode==='add'){
        console.log('ENTRA AL ADD')
        button.setAttribute('data-target','#addSkillModal');
      }else if(mode==='delete'){
        console.log('ENTRA AL DELETE')
        this.deleteSkill=skill;
        button.setAttribute('data-target','#deleteSkillModal');
      }else if(mode==='edit'){
        console.log('ENTRA AL EDIT')
        this.editSkill=skill;
        button.setAttribute('data-target','#editSkillModal');
      }
      container?.appendChild(button);
      button.click();
  
    }
  
    public onAddSkill(addForm : NgForm){
      document.getElementById('add-skill-form')?.click();
      this.skillsService.addSkill(addForm.value).subscribe({
        next:(response:Skills) =>{
          console.log(response);
          this.getSkills();
          addForm.reset();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
    public onUpdateSkill(skill: Skills){
      console.log('objeto que llega',skill)
      this.editSkill =skill;
      document.getElementById('add-skill-form')?.click();
      this.skillsService.updateSkill(skill).subscribe({
        next:(response:Skills) =>{
          console.log(response);
          this.getSkills();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
  
    public onDeleteSkill(idSki: number):void{
      console.log('objeto que llega eliminar',idSki)
      this.skillsService.deleteSkill(idSki).subscribe({
        next:(response:void) =>{
          console.log(response);
          this.getSkills();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
  
  




}

