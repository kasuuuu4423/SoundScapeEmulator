export default class Config{
    root;
    constructor(){
        let _l = location.href;
        _l = _l.split('/');
        _l = _l.filter(item => {
            return item != 'index.html';
        });
        this.root = _l.join('/') + '/js/sse';
    }
}