import AudioPlayer from './audioPlayer.class.js';
import Config from "../config.js";
import Util from './util.class.js';

export default class Manage_player{
    players = [];wrap_players;config;util;
    btn_allPlay;btn_allStop;wrap_btns;

    constructor(){
        this.wrap_players = document.getElementById('players');
        this.btn_allPlay = this._create_btn_allPlay();
        this.btn_allStop = this._create_btn_allStop();
        this.wrap_btns = this._create_wrap_btns(this.btn_allPlay, this.btn_allStop);
        this.wrap_players.appendChild(this.wrap_btns);
        this.config = new Config();
        this.util = new Util();
    }
    _create_wrap_btns(allPlay, allStop){
        let wrap_btns = document.createElement('div');
        wrap_btns.setAttribute('data-state', 'false');
        wrap_btns.classList.add('wrap_btns');
        wrap_btns.appendChild(allPlay);
        wrap_btns.appendChild(allStop);
        return wrap_btns;
    }
    _create_btn_allPlay(){
        let btn_allPlay = document.createElement('button');
        btn_allPlay.classList.add('btn_allPlay');
        btn_allPlay.innerText = 'すべて再生';
        return btn_allPlay;
    }
    _create_btn_allStop(){
        let btn_allStop = document.createElement('button');
        btn_allStop.classList.add('btn_allStop');
        btn_allStop.innerText = 'すべて停止';
        return btn_allStop;
    }
    addPlayer(name, text, extension){
        let src = this.config.root + '/assets/audio/' + name + '.' + extension;
        let player = new AudioPlayer(src, name, text);
        // this.players.push([player.player, player.uniqueName, player.num]);
        this.players.push(player);
        this.wrap_players.appendChild(player.player);
    }
    removePlayer(name){
        let removeName = '';
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].uniqueName == name){
                this.wrap_players.removeChild(this.players[i].player);
                removeName = this.players[i].name;
                this.players.splice(i, 1);
            }
        }
        return removeName;
    }
    renamePlayer(name, num){
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].num === num){
                this.players[i].player.innerText = name;
            }
        }
    }
    change_text(name, text){
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].name == name){
                this.players[i].change_playerName(text);
            }
        }
    }
    mute_player(name){
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].uniqueName == name){
                this.players[i].pause_player();
            }
        }
    }
    play_player(name){
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].uniqueName == name){
                this.players[i].play_player();
            }
        }
    }
    mute_all(){
        for(let i = 0; i < this.players.length; i++){
            this.players[i].pause_player();
        }
    }
    play_all(){
        for(let i = 0; i < this.players.length; i++){
            this.players[i].play_player();
        }
    }
    _create_input_text(){
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.classList.add('playName_input');
        return input;
    }
    active_playState(){
        this.wrap_btns.setAttribute('data-state', 'true');
        this.wrap_btns.classList.add('play');
    }
    passive_playState(){
        this.wrap_btns.setAttribute('data-state', 'false');
        this.wrap_btns.classList.remove('play');
    }
}