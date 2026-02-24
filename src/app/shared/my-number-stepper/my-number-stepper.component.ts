import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Component({
    selector: "my-number-stepper",
    imports:[],
    standalone: true,
    template: `
        <div
    class="inline-flex items-center bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden select-none
           transition focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400">

    <!-- MINUS -->
    <button
      
      (click)="stepDown()"
      class="w-10 h-10 flex items-center justify-center text-lg font-semibold
             transition active:scale-90 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent">
      −
    </button>

    <!-- INPUT -->
    <input
      type="number"
      [value]="value"
      (input)="onInput($event)"
      class="w-12 text-center outline-none border-x border-gray-200 h-10 text-sm font-semibold bg-transparent" />

    <!-- PLUS -->
    <button
      
      (click)="stepUp()"
      class="w-10 h-10 flex items-center justify-center text-lg font-semibold
             transition active:scale-90 hover:bg-gray-100">
      +
    </button>

  </div>
  
    `,
    styles: ``
})
export class MyNumberStepperComponent {
  @Input() value: number = 1;
  @Input() min: number = 1;
  @Input() step: number = 1;

  @Output() valueChange = new EventEmitter<number>();

  private holdInterval: any;

  /* ------------------ CLICK ACTIONS ------------------ */

  stepUp() {
    this.value += this.step;
    console.log(this.value);
    this.emit();
  }

  stepDown() {
    if (this.value > this.min) {
      this.value -= this.step;
      this.emit();
    }
  }

  /* ------------------ HOLD ACTION ------------------ */

  // startHold(direction: number) {
  //   this.holdInterval = setInterval(() => {
  //     if (direction === 1) this.stepUp();
  //     else this.stepDown();
  //   }, 120);
  // }

  // stopHold() {
  //   clearInterval(this.holdInterval);
  // }

  /* ------------------ INPUT ------------------ */

  onInput(event: any) {
    let val = Number(event.target.value);

    if (isNaN(val) || val < this.min) val = this.min;

    this.value = val;
    this.emit();
  }

  /* ------------------ KEYBOARD SUPPORT ------------------ */

  @HostListener('keydown.arrowUp', ['$event'])
  up(e: Event) {
    (e as KeyboardEvent).preventDefault();
    this.stepUp();
  }

  @HostListener('keydown.arrowDown', ['$event'])
  down(e: Event) {
    (e as KeyboardEvent).preventDefault();
    this.stepDown();
  }

  /* ------------------ EMIT ------------------ */

  private emit() {
    this.valueChange.emit(this.value);
  }

}