import AudioPlayer from './audioPlayer.class.js';
import Config from "../config.js";
import Util from './util.class.js';

export default class Manage_player{
    players = [];wrap_players;config;util;

    constructor(){
        this.wrap_players = document.getElementById('players');
        this.config = new Config();
        this.util = new Util();
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
    _create_input_text(){
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.classList.add('playName_input');
        return input;
    }
}