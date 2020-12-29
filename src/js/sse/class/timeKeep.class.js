import Time from './time.class.js';

export default class TimeKeep{
  time;btn_start;btn_end;wrap;
  startTime;endTime;
  constructor(){
    let sse = document.getElementById('sse');
    this.time = new Time();
    this.btn_start = this._create_btn_start();
    this.btn_end = this._create_btn_end();
    this.wrap = this._create_wrap();
    this.wrap.appendChild(this.btn_start);
    this.wrap.appendChild(this.btn_end);
    
    sse.appendChild(this.wrap);
  }
  _create_btn_start(){
    let btn_start = document.createElement('button');
    btn_start.classList.add('btn_start');
    btn_start.innerText = '実験スタート';
    return btn_start;
  }
  _create_btn_end(){
    let btn_end = document.createElement('button');
    btn_end.classList.add('btn_end');
    btn_end.innerText = '実験終了';
    return btn_end;
  }
  _create_wrap(){
    let wrap = document.createElement('div');
    wrap.classList.add('wrap_timekeep');
    return wrap;
  }
  start(){
    this.startTime = this.time.now();
    return this.startTime;
  }
  end(){
    this.endTime = this.time.now();
    return this.endTime;
  }
}