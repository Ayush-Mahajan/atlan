import * as d3 from 'd3';

d3.csv('data.csv').then(data => {
    console.log(data);
  });