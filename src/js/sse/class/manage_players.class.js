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
    addPlayer(name, num, text){
        let src = this.config.root + '/assets/audio/' + name + '.mp3';
        let player = new AudioPlayer(src, name, num, text);
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
    change_input(name){
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].uniqueName == name){
                let text = this.players[i].player.getElementsByClassName('playName')[0];
                text.style.display = 'none';
                let btn_change = this.players[i].player.getElementsByClassName('btn_rename')[0];
                btn_change.innerText = '完了';
                let input = this._create_input_text();
                input.value = text.innerHTML;
                console.log(this.players[i].player, text.innerHTML);
                this.players[i].player.insertBefore(input, this.players[i].player.firstChild);
                input.focus();
                input.select();
            }
        }
    }
    change_text(name, num){
        let result = "";
        let origin = "";
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].uniqueName == name){
                let text = this.players[i].player.getElementsByClassName('playName')[0];
                let input = this.players[i].player.getElementsByClassName('playName_input')[0];
                text.innerText = input.value;
                result = input.value;
                for(let j = 0; j < this.players.length; j++){
                    if(this.players[j].num == num){
                        let item_text = this.players[j].player.getElementsByClassName('playName')[0];
                        item_text.innerText = input.value;
                        origin = this.players[j].name;
                    }
                }
                text.style.display = 'block';
                this.players[i].player.removeChild(input);
                let btn_change = this.players[i].player.getElementsByClassName('btn_rename')[0];
                btn_change.innerText = '名前を変える'
            }
        }
        return [result, origin];
    }
    _create_input_text(){
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.classList.add('playName_input');
        return input;
    }
}