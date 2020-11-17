export default class AudioName{
    name;nameText;span;extension;num;filename;
    btn_rename;btn_preview;
    constructor(name, num, extension){
        this.num = num;
        this.filename = name;
        this.name = document.createElement('div');
        this.name.classList.add('name');
        this.name.setAttribute('data-name', name);
        this.name.setAttribute('data-num', num);
        this.name.setAttribute('data-extension', extension);

        let innertext = '音' + num;
        this.span = this._create_span(innertext);
        this.btn_rename = this._create_btn_rename(name, num);
        this.btn_rename.setAttribute('data-change', 'false');
        this.btn_preview = this._create_btn_preview(name, extension);
        let btn_add = this._create_btn_add(name, extension);
        this.name.appendChild(this.span);
        this.name.appendChild(this.btn_rename);
        this.name.appendChild(this.btn_preview);
        this.name.appendChild(btn_add);
        this.nameText = innertext;
    }
    _create_span(text){
        let span = document.createElement('span');
        span.setAttribute('data-visual', 'visible');
        span.innerText = text;
        return span;
    }
    _create_btn_rename(name, num){
        let btn_rename = document.createElement('button');
        btn_rename.classList.add('btn_rename');
        btn_rename.setAttribute('data-name', name);
        btn_rename.setAttribute('data-num', num);
        btn_rename.innerText = '名前を変える';
        return btn_rename;
    }
    _create_btn_preview(name, extension){
        let btn_preview = document.createElement('button');
        btn_preview.classList.add('btn_preview');
        btn_preview.setAttribute('data-name', name);
        btn_preview.setAttribute('data-extension', extension);
        btn_preview.setAttribute('data-play', false);
        btn_preview.innerText = '再生';
        return btn_preview;
    }
    _create_btn_add(name, extension){
        let btn_add = document.createElement('button');
        btn_add.classList.add('btn_add');
        btn_add.setAttribute('data-name', name);
        btn_add.setAttribute('data-extension', extension);
        btn_add.innerText = '追加';
        return btn_add;
    }
    tgl_text(){
        if(this.span.getAttribute('data-visual') == 'visible'){
            this.span.style.display = 'none';
            this.span.setAttribute('data-visual', 'hidden');
        }
        else{
            this.span.style.display = 'block';
            this.span.setAttribute('data-visual', 'visible');
        }
    }
    insert_input(){
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.value = this.nameText;
        this.name.prepend(input);
        input.focus();
        input.select();
    }
    remove_input(){
        let input = this.name.getElementsByTagName('input')[0];
        this.name.removeChild(input);
    }
    get_inputValue(){
        return this.name.getElementsByTagName('input')[0].value;
    }
    tgl_renameText(){
        if(this.btn_rename.getAttribute('data-change') == 'false'){
            this.btn_rename.innerText = '完了';
            this.btn_rename.setAttribute('data-change', 'true');
        }
        else{
            this.btn_rename.innerText = '名前を変える';
            this.btn_rename.setAttribute('data-change', 'false');
        }
    }
    change_nameText(text){
        this.nameText = text;
        this.span.innerText = text;
    }
}