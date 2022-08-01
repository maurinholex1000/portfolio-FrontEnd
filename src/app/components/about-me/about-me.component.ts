import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  persona: persona = new persona("","","","","","");
  public editPersona:persona | undefined;

  constructor(public personaService: PersonaService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => {this.persona=data})
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public onOpenModal(mode:String, persona?:persona):void{
    console.log('ENTRA AL MODAL')
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display="none";
    button.setAttribute('data-toggle','modal')
    if(mode==='edit'){
      this.editPersona=persona;
      button.setAttribute('data-target','#editPersonaModal');
    }
    container?.appendChild(button);
    button.click();

  }

  // public onUpdatePersona(persona: persona){
  //   this.editPersona =persona;
  //   document.getElementById('add-education-form')?.click();
  //   this.personaService.updatePersona(persona).subscribe({
  //     next:(response:persona) =>{
  //       console.log(response);
  //       this.personaService.getPersona().subscribe(data => {this.persona=data})
  //     },
  //     error:(error:HttpErrorResponse) =>{
  //       alert(error.message);
  //     }
  //   })
  // }

  public onUpdatePersona(persona:persona){
    this.editPersona =persona;
    document.getElementById('add-education-form')?.click();
    this.personaService.updatePersona(persona).subscribe({
      next:(response:persona) =>{
        console.log(response);
        this.personaService.getPersona().subscribe(data => {this.persona=data})
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

}
