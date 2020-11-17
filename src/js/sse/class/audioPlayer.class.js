import Util from './util.class.js';
import Volume from './volume.class.js';

export default class AudioPlayer{
    player;audio;volume;
    uniqueName;num;util;name;

    constructor(src, name, num, text){
        this.util = new Util();
        this.player = this.createPlayer(src, name, num, text);
        this.event_mouseOff_point();
    }
    createPlayer(src, name, num, text){
        let player = document.createElement('div');
        player.classList.add('player');
        this.uniqueName = this.util.getUniqueStr(name);
        this.audio = this._create_player(src, this.uniqueName);
        let playerName = this._create_playerName(text);
        this.num = num;
        let btn_remove = this._create_button_remove(this.uniqueName);
        let btn_rename = this._create_button_rename(this.uniqueName, num);
        this.name = name;
        let btn_solo = this._create_button_solo(this.uniqueName);
        let btn_mute = this._create_button_mute(this.uniqueName);
        this.volume = new Volume(this.uniqueName);
        player.appendChild(playerName);
        player.appendChild(this.audio);
        player.appendChild(btn_solo);
        player.appendChild(btn_mute);
        player.appendChild(btn_rename);
        player.appendChild(btn_remove);
        player.appendChild(this.volume.element);
        return player;
    }
    _create_playerName(name){
        let playerName = document.createElement('div');
        playerName.classList.add('playName');
        playerName.innerText = name;
        return playerName;
    }
    _create_player(src, uniqueName){
        let audio = document.createElement('audio');
        audio.setAttribute('src', src);
        audio.setAttribute('data-name', uniqueName);
        this.format_playerSetting(audio);
        return audio;
    }
    _create_button_remove(uniqueName){
        let btn_remove = document.createElement('button');
        btn_remove.innerText = '削除';
        btn_remove.classList.add('btn_remove');
        btn_remove.setAttribute('data-name', uniqueName);
        return btn_remove;
    }
    pause_player(){
        this.audio.pause();
    }
    play_player(){
        this.audio.play();
    }
    format_playerSetting(player){
        player.setAttribute('autoplay', true);
        //player.setAttribute('controls', true);
        player.setAttribute('loop', true);
    }
    event_mouseOff_point(){
        let _func_up = () =>{
                this.audio.volume = this.volume.val_volume;
                console.log(this.volume.val_volume, this.audio.volume);
        }
        let func_up = () =>{
            setTimeout(_func_up.bind(this), 10);
        }
        this.volume.point.addEventListener('mouseup', func_up.bind(this));
    }
}