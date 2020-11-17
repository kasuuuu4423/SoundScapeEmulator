import AudioNames from "./audioName.class.js";
import PreviewAudio from './previewAudio.class.js';

export default class Manage_Names{
    names = [];
    AN;
    wrap_names;
    crnt_num = 0;
    preview;
    constructor(){
        this.wrap_names = document.getElementById('names');
        this.preview = new PreviewAudio();
    }
    addName(name, extension){
        let obj_name = new AudioNames(name, this.crnt_num, extension);
        this.names.push([obj_name.name, obj_name.nameText, this.crnt_num]);
        this.wrap_names.appendChild(obj_name.name);
        this.crnt_num++;
    }
    change_text(num, text){
        for(let i = 0; i < this.names.length; i++){
            if(this.names[i][2] == num){
                let name = this.names[i][0];
                name.innerText = text;
            }
        }
    }
    change_input(name){
        for(let i = 0; i < this.names.length; i++){
            if(this.names[i].nameText == name){
                this.name[i].name;
            }
        }
    }
    preview_start(filename){
        this.preview.play(filename);
    }
    preview_stop(){
        this.preview.stop();
    }
}