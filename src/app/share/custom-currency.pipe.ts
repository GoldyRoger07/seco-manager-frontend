import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe){}
 
  transform(value: number,currencySymbol:string ="HTG"): string {
      const formattedNumber = this.decimalPipe.transform(value,'1.2-2');

    return `${formattedNumber} ${currencySymbol}`;
  }

}
