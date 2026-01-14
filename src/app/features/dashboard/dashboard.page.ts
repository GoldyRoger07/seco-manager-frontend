import { Component, inject, OnInit } from '@angular/core';
import { CustomDate } from '../../share/custom-date.interface';
import { CommonModule } from '@angular/common';
import { StatisticService } from '../statistic/statistic.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
})
export class DashboardPage extends CustomDate implements OnInit{
  statisticService = inject(StatisticService)
  
  statistic$ = this.statisticService.statistic$
  
  ngOnInit(): void {
    this.statisticService.getStatistic()
  }

}
