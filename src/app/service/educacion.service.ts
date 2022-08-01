import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  eduURL = 'https://app-portfbackend.herokuapp.com/educacion/';

  constructor(private httpClient: HttpClient) { }

  public getEducation():Observable<Educacion[]>{
    return this.httpClient.get<Educacion[]>(this.eduURL+'all');
  }

  public addEducation(educacion: Educacion): Observable<Educacion>{
    return this.httpClient.post<Educacion>(this.eduURL + 'add', educacion);
  }

  public updateEducation(educacion: Educacion): Observable<Educacion>{
    return this.httpClient.put<Educacion>(this.eduURL + 'update', educacion);
  }

  public deleteEducation(educacionId: number): Observable<void>{
    return this.httpClient.delete<void>(this.eduURL + `delete/${educacionId}`);
  }



}
