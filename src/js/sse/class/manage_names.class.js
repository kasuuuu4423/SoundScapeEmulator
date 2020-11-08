import AudioNames from "./audioName.class.js";

export default class Manage_Names{
    names = [];
    AN;
    wrap_names;
    crnt_num = 0;
    constructor(){
        this.wrap_names = document.getElementById('names');
    }
    addName(name){
        let obj_name = new AudioNames(name, this.crnt_num);
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
}