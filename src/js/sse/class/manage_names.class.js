import AudioNames from "./audioName.class.js";
import PreviewAudio from './previewAudio.class.js';

export default class Manage_Names{
    names = [];
    AN;
    wrap_names = [];
    crnt_num = 0;
    preview;
    constructor(){
        this.wrap_names = document.getElementById('names');
        this.preview = new PreviewAudio();
    }
    addName(name, extension){
        let obj_name = new AudioNames(name, this.crnt_num, extension);
        this.names.push(obj_name);
        this.wrap_names.appendChild(obj_name.name);
        this.crnt_num++;
    }
    change_text(name){
        let result;
        for(let i = 0; i < this.names.length; i++){
            if(this.names[i].filename == name){
                let input_value = this.names[i].get_inputValue();
                result = input_value;
                this.names[i].change_nameText(input_value);
                this.names[i].tgl_text();
                this.names[i].tgl_renameText();
                this.names[i].remove_input();
            }
        }
        return result;
    }
    change_input(name){
        for(let i = 0; i < this.names.length; i++){
            if(this.names[i].filename == name){
                this.names[i].tgl_text();
                this.names[i].tgl_renameText();
                this.names[i].insert_input();
            }
        }
    }
    change_text_play(filename){
        for(let i = 0; i < this.names.length; i++){
            let data_play = this.names[i].btn_preview.getAttribute('data-play');
            if(this.names[i].filename != filename && data_play == 'true'){
                this.names[i].btn_preview.setAttribute('data-play', false);
                this.names[i].btn_preview.innerText = '再生';
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