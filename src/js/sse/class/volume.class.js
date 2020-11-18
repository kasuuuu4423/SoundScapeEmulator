import Util from './util.class.js';

export default class Volume{
    element;val_volume;
    point;bar;
    constructor(name){
        this.val_volume = 1;
        this.element = this.create_volume(name);
    }
    create_volume(name){
        let volume = document.createElement('div');
        volume.classList.add('volume');
        volume.setAttribute('data-name', name);

        let bar_back = document.createElement('div');
        bar_back.classList.add('bar_back');

        this.bar = document.createElement('div');
        this.bar.classList.add('bar');
        bar_back.appendChild(this.bar);

        this.point = this._create_point();
        bar_back.appendChild(this.point);

        volume.appendChild(bar_back);

        return volume;
    }
    _create_point(){
        let point = document.createElement('div');
        point.classList.add('point');
        point.onmousedown = function(event) {
            let bar_back = event.target.parentNode;
            let left = bar_back.getBoundingClientRect().left;
            let right = bar_back.getBoundingClientRect().right;
            let width = bar_back.clientWidth;
            moveAt(event.pageX, event.pageY);
            
            function moveAt(pageX, pageY) {
                let px = (pageX - point.parentNode.getBoundingClientRect().left );
                if(px >= width){
                    px = width;
                }
                else if(px <= 0){
                    px = 0;
                }
                point.style.left = px + 'px';
                document.getElementsByTagName('body')[0].style.cursor = 'grabbing';
            }
            
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
            document.addEventListener('mousemove', onMouseMove);
            
            document.onmouseup = function(){
                let tmp_vol = point.style.left;
                tmp_vol = tmp_vol.replace('px', '')/width;
                this.val_volume = tmp_vol;
                document.removeEventListener('mousemove', onMouseMove);
                document.getElementsByTagName('body')[0].style.cursor = '';
                point.onmouseup = null;
            }.bind(this);
        }.bind(this);
        window.ondragstart = function(){
            return false;
        };
        return point;
    }
}