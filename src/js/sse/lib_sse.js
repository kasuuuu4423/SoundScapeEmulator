import LoadCSV from "./class/loadCSV.class.js";
import Manage_names from "./class/manage_names.class.js";
import Manage_players from "./class/manage_players.class.js";
import Config from "./config.js";
import Util from './class/util.class.js';
import Time from './class/time.class.js';
const { ipcRenderer } = require('electron');

export default class SSE{
    players;audioNames = [];csv;csvData;MN;MP;names;wrap;config;util;time;startTime;
    constructor(maxNum){
        this.wrap = this.addWrappers(document.getElementById('sse'));
        this.config = new Config();
        this.util = new Util();
        this.MN = new Manage_names();
        this.MP = new Manage_players();
        this.csv = new LoadCSV(this.config.root + '/assets/list.csv');
        this.time = new Time();
        this.csv_event(this.csv, maxNum);
        this.click_event();
        this.startTime = this.time.now();
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
                this.click_event_name(e.target);
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
        });
    }
    click_event_name(target){
        let data_name = target.getAttribute('data-name');
        let data_num = target.getAttribute('data-num');
        let text = target.innerHTML;
        let extension = target.getAttribute('data-extension');
        this.MP.addPlayer(data_name, data_num, text, extension);
        let now = this.time.now();
        let progTime = now - this.startTime;
        ipcRenderer.send('message', 'add,' + data_name + ',' + progTime);
    }
    click_event_remove(target){
        let data_name = target.getAttribute('data-name');
        let name = this.MP.removePlayer(data_name);
        let now = this.time.now();
        let progTime = now - this.startTime;
        ipcRenderer.send('message', 'remove,' + name + ',' + progTime);
    }
    click_event_rename(target){
        let data_num = target.getAttribute('data-num');
        let data_name = target.getAttribute('data-name');
        if(target.classList.contains('change')){
            let text = this.MP.change_text(data_name, data_num);
            this.MN.change_text(data_num, text[0]);
            target.classList.remove('change');
            let now = this.time.now();
            let progTime = now - this.startTime;
            ipcRenderer.send('message', 'rename,' + text[1] + ',' + progTime + ',' + text[0]);
        }
        else{
            this.MN.change_input(data_name);
            target.classList.add('change');
        }
    }
    click_event_preview(target){
        let filename = target.getAttribute('data-name');
        let extension = target.getAttribute('data-extension');
        let src = this.config.root + '/assets/audio/' + filename + '.' + extension;
        this.MN.preview.play(src);
    }
    // click_event_solo(target){
    //     let data_name = target.getAttribute('data-name');
    //     if(target.classList.contains('solo')){
    //         this.MP.play_solo(data_name);
    //         target.classList.remove('solo');
    //     }
    //     else{
    //         this.MP.mute_solo(data_name);
    //         target.classList.add('solo');
    //     }
    // }
    // click_event_mute(target){
    //     let data_name = target.getAttribute('data-name');
    //     if(target.classList.contains('mute')){
    //         this.MP.play_player(data_name);
    //         target.classList.remove('mute');
    //     }
    //     else{
    //         this.MP.mute_player(data_name);
    //         target.classList.add('mute');
    //     }
    // }
}