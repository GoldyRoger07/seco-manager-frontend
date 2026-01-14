import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlService } from '../../share/url.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Statistic } from './statistic.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  http = inject(HttpClient)
  url = inject(UrlService)

  statistic:Statistic = {
    departements: 0,
    banques: 0,
    positions: 0,
    etatCivils: 0,
    typeConges: 0,
    employees: 0
  }

  private statisticSubject$ = new BehaviorSubject<Statistic>(this.statistic)
  
  statistic$ = this.statisticSubject$.asObservable()


  getStatistic(){
    this.http.get<Statistic>(this.url.serverUrl+"/stats")
    .subscribe((data)=>{
      this.statisticSubject$.next(data)
    })
  }
}
