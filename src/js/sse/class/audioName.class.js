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
        this.name.innerText = '音' + num;
        this.nameText = name;
    }
}