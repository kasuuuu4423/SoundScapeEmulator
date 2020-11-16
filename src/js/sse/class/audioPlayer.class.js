import Util from './util.class.js';
import Volume from './volume.class.js';

export default class AudioPlayer{
    player;audio;valume;
    uniqueName;num;util;name;

    constructor(src, name, num, text){
        this.util = new Util();
        this.player = this.createPlayer(src, name, num, text);
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
        this.valume = new Volume(this.uniqueName);
        player.appendChild(playerName);
        player.appendChild(this.audio);
        player.appendChild(btn_solo);
        player.appendChild(btn_mute);
        player.appendChild(btn_rename);
        player.appendChild(btn_remove);
        player.appendChild(this.valume.element);
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
    _create_button_rename(uniqueName, num){
        let btn_remove = document.createElement('button');
        btn_remove.innerText = '名前を変える';
        btn_remove.classList.add('btn_rename');
        btn_remove.setAttribute('data-num', num);
        btn_remove.setAttribute('data-name', uniqueName);
        return btn_remove;
    }
    _create_button_remove(uniqueName){
        let btn_remove = document.createElement('button');
        btn_remove.innerText = '削除';
        btn_remove.classList.add('btn_remove');
        btn_remove.setAttribute('data-name', uniqueName);
        return btn_remove;
    }
    _create_button_solo(uniqueName){
        let btn_solo = document.createElement('button');
        btn_solo.innerText = 'SOLO';
        btn_solo.classList.add('btn_solo');
        btn_solo.setAttribute('data-name', uniqueName);
        return btn_solo;
    }
    _create_button_mute(uniqueName){
        let btn_mute = document.createElement('button');
        btn_mute.innerText = 'MUTE';
        btn_mute.classList.add('btn_mute');
        btn_mute.setAttribute('data-name', uniqueName);
        return btn_mute;
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
}