import { Component, Input, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'read-more',
    template: `
        <div [innerHTML]="text" [class.collapsed]="isCollapsed" [style.maxHeight]="isCollapsed ? maxHeight+'px' : '300px'">
        </div>
        <a *ngIf="isCollapsable" (click)="isCollapsed =! isCollapsed"><em>{{isCollapsed? 'More detail +':'Less detail -'}}</em></a>
    `,
    styles: [`
        div{
            transition: all .3s ease;
            margin-bottom: 5px;
        }
        a {
            float: right;
        }
        a > em {
            color: #0194a2;
            font-weight: bold;
        }
        a:hover {
            cursor: pointer;
        }
        div.collapsed {
            overflow: hidden;
        }
    `]
})
export class ReadMoreComponent implements OnInit {

    //the text that need to be put in the container
    @Input() text: string;

    //maximum height of the container
    @Input() maxHeight: number = 100;

    //set these to false to get the height of the expended container
    public isCollapsed: boolean = true;
    public isCollapsable: boolean = true;

    constructor(private elementRef: ElementRef) {
    }

    setCollapsed(){
        let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
        //collapsable only if the contents make container exceed the max height
        if (currentHeight > this.maxHeight) {
            this.isCollapsed = false;
            this.isCollapsable = false;
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.setCollapsed()
        }, 1);

    }
}