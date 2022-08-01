import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  expURL = 'https://app-portfbackend.herokuapp.com/experiencia/';

  constructor(private httpClient: HttpClient) { }

  public getExperience():Observable<Experiencia[]>{
    return this.httpClient.get<Experiencia[]>(this.expURL+'all');
  }

  public addExperience(experiencia: Experiencia): Observable<Experiencia>{
    return this.httpClient.post<Experiencia>(this.expURL + 'add', experiencia);
  }

  public updateExperience(experiencia: Experiencia): Observable<Experiencia>{
    return this.httpClient.put<Experiencia>(this.expURL + 'update', experiencia);
  }

  public deleteExperience(experienciaId: number): Observable<void>{
    return this.httpClient.delete<void>(this.expURL + `delete/${experienciaId}`);
  }
}
