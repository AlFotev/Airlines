import { Component, OnInit,Input,Output, EventEmitter, OnChanges} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import{PlatformLocation} from '@angular/common';
let itemsPerPage = 6;

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input("length") length:number;
  @Input("page") page:number;
  @Output() onReacted = new EventEmitter<number>();
  public currentPage:number;
  public allPages:number;
  constructor(
    private location:PlatformLocation,
    private route: ActivatedRoute,
    private router:Router
  ) { 
    location.onPopState(()=>{
      this.page = Number(location.search.substr(-1));
      if(this.page == 0){
        this.page = 1;
      }
      this.currentPage = this.page;
      this.onReacted.emit(this.page)
    })
  }

  ngOnInit() {
    this.currentPage = this.page;
  }
  prevPage() {
    this.length = Number(this.length);
    this.allPages = Math.ceil(this.length / itemsPerPage);
    if(this.page == 1){
      return;
    }
    if(this.page >this.allPages || this.page < 1){
      return;
    }
    this.page--;
    this.onReacted.emit(this.page)
    this.router.navigate(["/flights"],{
      queryParams:{
        page:this.page
      }
    })
    this.currentPage = this.page;

  }
  nextPage() {
    this.length = Number(this.length);
    this.allPages = Math.ceil(this.length / itemsPerPage);
    if(this.allPages > this.page ){
      this.page++;
      this.onReacted.emit(this.page)
      this.router.navigate(["/flights"],{
        queryParams:{
          page:this.page
        }
      })
      this.currentPage = this.page;
    }
    else{
      return
    }
  }

}
