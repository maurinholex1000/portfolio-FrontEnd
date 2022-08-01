import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from '../model/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  proyURL = 'https://app-portfbackend.herokuapp.com/proyectos/';

  constructor(private httpClient: HttpClient) { }

  public getProyectos():Observable<Proyectos[]>{
    return this.httpClient.get<Proyectos[]>(this.proyURL+'all');
  }

  public addProyecto(proyecto: Proyectos): Observable<Proyectos>{
    return this.httpClient.post<Proyectos>(this.proyURL + 'add', proyecto);
  }

  public updateProyecto(proyecto: Proyectos): Observable<Proyectos>{
    return this.httpClient.put<Proyectos>(this.proyURL + 'update', proyecto);
  }

  public deleteProyecto(proyectoId: number): Observable<void>{
    return this.httpClient.delete<void>(this.proyURL + `delete/${proyectoId}`);
  }


}
