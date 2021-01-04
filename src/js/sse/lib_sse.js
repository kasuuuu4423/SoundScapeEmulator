import LoadCSV from "./class/loadCSV.class.js";
import Manage_names from "./class/manage_names.class.js";
import Manage_players from "./class/manage_players.class.js";
import Config from "./config.js";
import Util from './class/util.class.js';
import Time from './class/time.class.js';
import TimeKeep from './class/timeKeep.class.js';
// const { ipcRenderer } = require('electron');

export default class SSE{
    players;audioNames = [];csv;csvData;MN;MP;names;wrap;config;util;time;startTime;timeKeep;
    sum_audio = 0;
    constructor(maxNum){
        this.wrap = this.addWrappers(document.getElementById('sse'));
        this.config = new Config();
        this.util = new Util();
        this.MN = new Manage_names();
        this.MP = new Manage_players();
        this.csv = new LoadCSV(this.config.root + '/assets/list.csv');
        this.time = new Time();
        // this.timeKeep = new TimeKeep();
        this.csv_event(this.csv, maxNum);
        this.click_event();
        // this.startTime = this.time.now();
    }
    addWrappers(wrap){
        let names = document.createElement('div');
        names.id = 'names';
        wrap.appendChild(names);
        let players = document.createElement('div');
        players.id = 'players';
        wrap.appendChild(players);
        return wrap;
    }
    csv_event(csvInstance, maxNum){
        csvInstance.request.addEventListener('load', (e)=>{
            this.names = csvInstance.data;
            for(let i = 0; i < this.names.length && i < maxNum; i++){
                this.MN.addName(this.names[i][0], this.names[i][1]);
            }
        });
    }
    click_event(){
        document.addEventListener('click', (e)=>{
            let class_target = e.target.classList;
            if(class_target[0] === 'btn_add'){
                this.click_event_add(e.target);
            }
            else if(class_target[0] === 'btn_remove'){
                this.click_event_remove(e.target);
            }
            else if(class_target[0] === 'btn_rename'){
                this.click_event_rename(e.target);
            }
            else if(class_target[0] === 'btn_preview'){
                this.click_event_preview(e.target);
            }
            else if(class_target[0] === 'btn_allPlay'){
                this.click_event_allPlay(e.target);
            }
            else if(class_target[0] === 'btn_allStop'){
                this.click_event_allStop(e.target);
            }
            else if(class_target[0] === 'btn_start'){
                this.click_event_start(e.target);
            }
            else if(class_target[0] === 'btn_end'){
                this.click_event_end(e.target);
            }
        });
    }
    click_event_add(target){
        let name = target.getAttribute('data-name');
        let extension = target.getAttribute('data-extension');
        let text = target.parentNode.getElementsByTagName('span')[0].innerText;
        this.MP.addPlayer(name, text, extension);
        let now = this.time.now();
        // let progTime = now - this.startTime;
        this.sum_audio++;
        // ipcRenderer.send('addremove', 'add,' + name + ',' + progTime + ',' + this.sum_audio);
    }
    click_event_remove(target){
        let data_name = target.getAttribute('data-name');
        let name = this.MP.removePlayer(data_name);
        let now = this.time.now();
        // let progTime = now - this.startTime;
        this.sum_audio--;
        // ipcRenderer.send('addremove', 'remove,' + name + ',' + progTime + ',' + this.sum_audio);
    }
    click_event_rename(target){
        let data_num = target.getAttribute('data-num');
        let name = target.getAttribute('data-name');
        if(target.classList.contains('change')){
            let input_value = this.MN.change_text(name);
            this.MP.change_text(name, input_value);
            target.classList.remove('change');
            let now = this.time.now();
            // let progTime = now - this.startTime;
            // ipcRenderer.send('rename', 'rename,' + name + ',' + progTime + ',' + input_value);
        }
        else{
            this.MN.change_input(name);
            target.classList.add('change');
        }
    }
    click_event_preview(target){
        let filename = target.getAttribute('data-name');
        let extension = target.getAttribute('data-extension');
        let status_play = target.getAttribute('data-play');
        if(status_play == 'true'){
            target.innerText = '再生';
            target.setAttribute('data-play', false);
            this.MN.preview.stop();
        }
        else{
            target.innerText = '停止';
            target.setAttribute('data-play', true);
            let src = this.config.root + '/assets/audio/' + filename + '.' + extension;
            this.MN.change_text_play(filename);
            this.MN.preview.play(src);
        }
    }
    click_event_allPlay(target){
        this.MP.play_all();
        this.MP.active_playState();
    }
    click_event_allStop(target){
        this.MP.mute_all();
        this.MP.passive_playState();
    }
    click_event_start(target){
        // let now = this.timeKeep.start();
        // ipcRenderer.send('addremove', 'start,,' + now + ',');
    }
    click_event_end(target){
        // let now = this.timeKeep.end();
        // ipcRenderer.send('addremove', 'end,,' + now + ',');
    }
}