import { Component } from '@angular/core';
export interface Photo {
  color: string;
  cols: number;
  rows: number;
  text: string;
  image: string;
  size: string;
  repeat:string;
  position:string;
}


@Component({
  selector: 'app-visualize-item',
  templateUrl: './visualize-item.component.html',
  styleUrls: ['./visualize-item.component.scss']
})
export class VisualizeItemComponent {
  photos: Photo[] = [
    {text: '', cols: 2, rows: 4, color: '#BEED3B', image:'url(https://i.postimg.cc/rp0jdnpS/364291249.jpg)', size:'cover', repeat:'no-repeat', position:'center'},
    {text: '', cols: 1, rows: 2, color: '#BEED3B', image:'url(https://i.postimg.cc/L5Trs99C/mk27-Casa-Lima-fernando-guerra-medium-jpeg-1.jpg)', size:'cover', repeat:'no-repeat', position:'center'},
    {text: '', cols: 1, rows: 2, color: '#BEED3B',image:'url(https://i.postimg.cc/qqRPDtHs/download.jpg)' , size:'cover', repeat:'no-repeat', position:'center'},
    {text: '', cols: 1, rows: 2, color: '#BEED3B', image:'url()', size:'cover', repeat:'no-repeat', position:'center'},
    {text: '', cols: 1, rows: 2, color: '#BEED3B', image:'url()', size:'cover', repeat:'no-repeat', position:'center'},
  ];

}
