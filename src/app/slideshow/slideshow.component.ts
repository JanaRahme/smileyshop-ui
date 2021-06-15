import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';
import {slideshowAnimation} from "./slideshow.animations";

const images: string[] = [
  'assets/img/pexels-karolina-grabowska-5632379.jpg',
  'assets/img/pexels-nataliya-vaitkevich-6214476.jpg',
  'assets/img/pexels-nataliya-vaitkevich-6214456.jpg',
  'assets/img/pexels-nataliya-vaitkevich-6214371.jpg',
  'assets/img/pexels-nataliya-vaitkevich-6214471.jpg'


];


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  animations: [slideshowAnimation]
})
export class SlideshowComponent implements AfterViewInit {

  @ViewChild('previous') previous: any;
  @ViewChild('next') next: any;
  position: any;
  images: any[] = images;
  currentIndex = 0;
  currentDirection = 'left';

  constructor() {}

   ngAfterViewInit() {
    //alert('parent - ngAfterViewInit');
     const previous$ = fromEvent(this.getNativeElement(this.previous), 'click')
       .pipe(map(event => ({shift: -1, direction: 'right'})));

     const next$ = fromEvent(this.getNativeElement(this.next), 'click')
       .pipe(map(event => ({shift: +1, direction: 'left'})));

     merge(previous$, next$)
       .pipe(
         startWith({index: 0} as any),
         scan((acc, curr) => {
           const projectedIndex = acc.index + curr.shift;

           const adjustedIndex = projectedIndex < 0 ? this.images.length - 1
             : projectedIndex >= this.images.length ? 0
               : projectedIndex;

           return {index: adjustedIndex, direction: curr.direction};
         })
       )
       .subscribe(event => {
         this.currentIndex = event.index;
         this.currentDirection = event.direction;
       });
  }

  ngOnInit() {

  }

  getNativeElement(element:any) {
    // setTimeout(() => {
    //   console.log(element._elementRef.nativeElement);
    // }, 1000);
    return element._elementRef.nativeElement;
  }

}
