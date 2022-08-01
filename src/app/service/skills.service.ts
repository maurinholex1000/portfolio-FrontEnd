import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skills } from '../model/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  eduURL = 'https://app-portfbackend.herokuapp.com/skills/';

  constructor(private httpClient: HttpClient) { }

  public getSkills():Observable<Skills[]>{
    return this.httpClient.get<Skills[]>(this.eduURL+'all');
  }

  public addSkill(skill: Skills): Observable<Skills>{
    return this.httpClient.post<Skills>(this.eduURL + 'add', skill);
  }

  public updateSkill(skill: Skills): Observable<Skills>{
    return this.httpClient.put<Skills>(this.eduURL + 'update', skill);
  }

  public deleteSkill(skillId: number): Observable<void>{
    return this.httpClient.delete<void>(this.eduURL + `delete/${skillId}`);
  }

}
