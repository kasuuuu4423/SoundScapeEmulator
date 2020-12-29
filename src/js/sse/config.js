// const { ipcRenderer } = require('electron');

export default class Config{
    root;
    appRoot;
    constructor(){
        let _l = location.href;
        _l = this.remove_fileName(_l, 'index.html');
        this.root = _l + '/js/sse';

        // ipcRenderer.send('status', 'ready');
        // ipcRenderer.on('root', (e, arg) => {
        //     this.appRoot = this.remove_fileName(arg);
        //     //let dir_root = this.remove_fileName(arg);
        // });
    }
    remove_fileName(directory){
        let dir = directory.split('/');
        let flg_dir = false;
        if(dir[1] == undefined){
            dir = dir[0].split("\\");
            flg_dir = true;
        }
        dir.pop();
        if(flg_dir){
            return dir.join('\\');
        }
        else{
            return dir.join('/');
        }
    }
}