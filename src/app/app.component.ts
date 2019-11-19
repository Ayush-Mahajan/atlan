import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { max } from 'd3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }
  title = 'atlan';
  objs: [];
  width: number;
  height: number;
  d1 = [];
  l1 = [];
  i = 1;
  ngOnInit() {

    // tslint:disable-next-line: deprecation
    $('.timeline-item').hover(function() {
      $('.timeline-item').removeClass('active');
      $(this).toggleClass('active');
      $(this).prev('.timeline-item').toggleClass('close');
      // $(this).prev('close').toggleClass('close');
      $(this).next('.timeline-item').toggleClass('close');
      // $(this).next('close').toggleClass('close');
    });

    // tslint:disable-next-line: deprecation
    $(window).scroll(function () {
      // tslint:disable-next-line: prefer-const
      let wScroll = $(this).scrollTop();
      if (wScroll >= 450 && wScroll <= 1000) {
        // tslint:disable-next-line: prefer-const
        let wNewScroll = wScroll - 300;
        $('.low_poly').css({
          transform: 'translate(0px, ' + (wNewScroll / 15) + '%)'
        });
      }
    });

    // tslint:disable-next-line: prefer-const

    this.http.get('../assets/sachin1.csv', { responseType: 'text' }).subscribe(data => {
      this.objs = d3.csvParse(data);
      this.render(this.objs);
    });

    const svg = d3.select('svg');
    this.width = +svg.attr('width');
    this.height = +svg.attr('height');
    svg.style('background-color', 'red');
  }

  render(data: [ ]) {
    const yScale = d3.scaleBand().domain(data.map(d => d.opposition)).range;
    const a = data.map(d => +d.batting_score);
    const xScale = d3.scaleLinear().domain([0, d3.max(a)]).range([0, this.width]);
    // console.log(yScale.domain());
    // console.log(xScale.domain());
    this.l1 = [ ];
    this.d1 = data.filter( d => {
      return (d.batting_score > 0 && d.batting_score < 10 )
    });
    let x = this.d1.length;
    this.l1.push(x);
    let i = 1;
    for( i = 1 ; i <= 9 ; i++) {
      console.log(i);
      this.d1 = data.filter( d => {
        return (d.batting_score >= (i * 10) && d.batting_score < ((i+1) *10 ))
      })
      x = this.d1.length;
      this.l1.push(x) ;
      console.log(this.l1);
     }
    this.d1 = data.filter( d => {
      return d.batting_score >= 100;
    })
    x = this.d1.length;
    this.l1.push(x) ;
    console.log(this.l1);
  }

}
// , d => d
// parseInt(


