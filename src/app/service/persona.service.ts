import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL = 'https://app-portfbackend.herokuapp.com/personas/'

  constructor(private http: HttpClient) { }

  public getPersona() : Observable<persona>{
    return this.http.get<persona>(this.URL+'traer/perfil');
  
  }

  // public updatePersona(persona: persona): Observable<persona>{
  //   return this.http.put<persona>(this.URL + 'update', persona);
  // }

  public updatePersona(persona: persona): Observable<persona>{
    return this.http.put<persona>(this.URL + `editar/${persona.id}`,persona);
  }
}
