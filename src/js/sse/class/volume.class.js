import Util from './util.class.js';

export default class valume{
    element;val_value;
    point;bar;
    constructor(name){
        this.element = this.create_valume(name);
        this.val_valume = 100
    }
    create_valume(name){
        let valume = document.createElement('div');
        valume.classList.add('valume');
        valume.setAttribute('data-name', name);

        let bar_back = document.createElement('div');
        bar_back.classList.add('bar_back');

        this.bar = document.createElement('div');
        this.bar.classList.add('bar');
        bar_back.appendChild(this.bar);

        this.point = this._create_point();
        bar_back.appendChild(this.point);

        valume.appendChild(bar_back);

        return valume;
    }
    _create_point(){
        let point = document.createElement('div');
        point.classList.add('point');

        window.ondragstart = function() {
            return false;
        };
        window.addEventListener('mousedown', (e)=>{
            let move = (event) =>{
                let bar_back = event.target.parentNode;
                let left = bar_back.getBoundingClientRect().left;
                let right = left + bar_back.clientWidth;
                let width = bar_back.clientWidth;
                //if(e.pageX >= left && right >= e.pageX){
                //event.target.style.left = ((e.clientX - width)/2) + 'px';
                event.target.style.left = e.clientX;
                //}
                //el.target.style.left = e.pageX;
            }
            point.addEventListener('mousedown', move);
            point.onmouseup = function() {
                document.removeEventListener('mousemove', move);
                point.onmouseup = null;
            };
        });  
        
        return point;
    }
}