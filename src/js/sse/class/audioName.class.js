export default class AudioName{
    name;
    nameText;
    constructor(name, num){
        this.name = document.createElement('div');
        this.name.classList.add('name');
        this.name.setAttribute('data-name', name);
        this.name.setAttribute('data-num', num);
        this.name.innerText = '音' + num;
        this.nameText = name;
    }
}