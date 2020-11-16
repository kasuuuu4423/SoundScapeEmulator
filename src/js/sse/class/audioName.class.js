export default class AudioName{
    name;
    nameText;
    extension;
    constructor(name, num, extension){
        this.name = document.createElement('div');
        this.name.classList.add('name');
        this.name.setAttribute('data-name', name);
        this.name.setAttribute('data-num', num);
        this.name.setAttribute('data-extension', extension);
        let span = document.createElement('span');
        span.innerText = '音' + num;
        let btn_rename = this._create_btn_rename(name, num);
        let btn_preview = this._create_btn_preview(name);
        let btn_add = this._create_btn_add(name, extension);
        this.name.appendChild(span);
        this.name.appendChild(btn_rename);
        this.name.appendChild(btn_preview);
        this.name.appendChild(btn_add);
        this.nameText = name;
    }
    _create_btn_rename(name, num){
        let btn_rename = document.createElement('button');
        btn_rename.classList.add('btn_rename');
        btn_rename.setAttribute('data-name', name);
        btn_rename.setAttribute('data-num', num);
        btn_rename.innerText = '名前を変える';
        return btn_rename;
    }
    _create_btn_preview(name){
        let btn_preview = document.createElement('button');
        btn_preview.classList.add('btn_preview');
        btn_preview.setAttribute('data-name', name);
        btn_preview.innerText = '再生';
        return btn_preview;
    }
    _create_btn_add(name, extension){
        let btn_add = document.createElement('button');
        btn_add.classList.add('btn');
        btn_add.setAttribute('data-name', name);
        btn_add.setAttribute('data-extension', extension);
        btn_add.innerText = '追加';
        return btn_add;
    }
}