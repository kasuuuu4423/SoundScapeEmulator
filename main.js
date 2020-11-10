const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const fs = require('fs');

const is_windows = process.platform==='win32'
const is_mac = process.platform==='darwin'

const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const remove_fileName = (directory) =>{
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

const create_audioList = () =>{
    let root_dir = app.getPath('exe');
    root_dir = remove_fileName(root_dir);
    let tmp_dir = "";
    let tmp_dir_audio = "";
    if(is_mac){
        tmp_dir = '/src/js/sse/assets/'
        tmp_dir_audio = 'audio/'
    }
    else if(is_windows){
        tmp_dir = '\\src\\js\\sse\\assets\\';
        tmp_dir_audio = 'audio\\';
    }
    let list_dir = __dirname + tmp_dir;
    console.log(list_dir);
    let list = fs.readdirSync(list_dir + tmp_dir_audio);
    let flg_list = true;
    // for(let i = list.length - 1; i > 0; i--){
    //     let r = Math.floor(Math.random*(i+1));
    //     let tmp = list[i];
    //     list[i] = list[r];
    //     list[r] = tmp;
    // }
    list = shuffle(list);
    console.log(list);
    for(let i = 0; i < list.length; i++){
        if(typeof(list[i]) == 'string'){
            let audio = list[i].split('.')[0];
            let ex = list[i].split('.')[1];
            if(flg_list){
                fs.writeFileSync(list_dir + "list.csv", audio + ',' + ex + '\n');
                flg_list = false;
            }
            else{
                fs.appendFile(list_dir + "/list.csv", audio + ',' + ex + '\n', (err) => {
                    if (err) throw err;
                });
            }
        }
    }
}

create_audioList();

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: true
        }
    });

    win.loadFile('src/index.html');
    //win.webContents.openDevTools();
}

//※※※※※※※※※※※※※※※※ここから※※※※※※※※※※※※※※※※※※※
/*
*
* 第一引数がおそらく監視したいディレクトリフォルダ
* 第二引数がおそらくElectronの実行フォルダ
*
* */
// require('electron-reload')(__dirname, {
//     electron: require('${__dirname}/../../node_modules/electron')
// });

// let mainWindow = null;

// app.on('window-all-closed', function () {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });
//※※※※※※※※※※※※※※※※ここまでauto reload※※※※※※※※※※※※※※※※※※※

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

let flg_writeCSV = true;
ipcMain.on('message', (event, arg) => {
    let dir = "";
    if(is_mac){
        dir = __dirname;
        dir = remove_fileName(dir);
    }
    console.log(arg);
    //let action = arg.split(',')[0];
    if(flg_writeCSV){
        fs.writeFileSync(dir + "/action.csv", arg + '\n');
        flg_writeCSV = false;
    }
    else{
        fs.appendFile(dir + "/action.csv", arg + '\n', (err) => {
            if (err) throw err;
        });
    }
});

ipcMain.on('status', (e, arg) => {
    console.log(arg);
    if(arg == 'ready'){
        e.sender.send('root', app.getPath('exe'));
    }
});