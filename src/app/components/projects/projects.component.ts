import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import 'hammerjs';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Input() languageData:any
@Input() arabic:any
  filter: String = 'all';
  projects: any[] = [];
  project: any;
  imageNum: any = 0;
  constructor(private _common: CommonService,private renderer: Renderer2) {}
  ngOnInit(): void {
    this._common.getAllProjects().subscribe((data: any) => {
      this.projects = data.project.reverse();
      const arrayJSON = JSON.stringify(data.project);
      localStorage.setItem('allProjects', arrayJSON);
    });
  }
  active(data: any, name: any) {

    let lis: any = document.getElementById('ul')?.children;
    for (let i = 0; i < lis?.length; i++) {
      let element = lis[i];
      element.classList.remove('active');
    }
    data.target.classList.add('active');
    this.filter = name;

    const storedArrayJSON: any = localStorage.getItem('allProjects');
    const storedArray = JSON.parse(storedArrayJSON);
    if (name == 'all') {
this.projects = storedArray
    }else{
      for (let i = 0; i < storedArray.length; i++) {
        this.projects = storedArray.filter((item: any) =>
          item.types.includes(name)
        );
      }
    }

  }

  details(id: any) {
    let div: any = document.getElementById(`project${id}`);
    var translateXValue1 = '200%';
    var translateXValue2 = '0%';
    var translateXValue3 = '-200%';

    if (div.classList.contains('added')) {
      div.classList.remove('added');

      div.children[0].style.transform = 'translateX(' + translateXValue2 + ')';
      div.children[2].style.transform = 'translateX(' + translateXValue3 + ')';
    } else {
      div.classList.add('added');
      div.children[0].style.transform = 'translateX(' + translateXValue1 + ')';
      div.children[2].style.transform = 'translateX(' + translateXValue2 + ')';
    }
  }

  changeImg(i: any) {
    this.imageNum = i;
  }
  close() {
    this.project = '';
    this.imageNum = 0;
    let nav: HTMLElement | any = document.getElementById('nav');
    nav.style.setProperty('display', 'flex', 'important');
  }
  hideNav(){

    let nav: HTMLElement | any = document.getElementById('nav');
    nav.style.setProperty('display', 'none', 'important');
  }


  isDragging: boolean = false;
  initialX: number = 0;
  @ViewChild('slider') slider!: ElementRef;

  nextSlide(): void {
    this.imageNum = (this.imageNum + 1) % this.project.images.length;
  }

  prevSlide(): void {
    this.imageNum = (this.imageNum - 1 + this.project.images.length) % this.project.images.length;
  }

  startDrag(event: any): void {
    this.isDragging = true;
    this.initialX = event.touches ? event.touches[0].clientX : event.clientX;
  }

  onDrag(event: any): void {
    if (this.isDragging) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const deltaX = clientX - this.initialX;

      if (deltaX > 50) {
        this.prevSlide();
        this.isDragging = false;
      } else if (deltaX < -50) {
        this.nextSlide();
        this.isDragging = false;
      }
    }
  }

  stopDrag(): void {
    this.isDragging = false;
  }





}
