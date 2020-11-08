const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const fs = require('fs');


function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
        nodeIntegration: true
        }
    });

    win.loadFile('src/index.html');
    win.webContents.openDevTools();
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



// fs.writeFileSync("./test.csv", 'hello');
// fs.appendFile('./test.csv', 'append!\n', (err) => {
//     if (err) throw err;
//     console.log('test.txtに追記されました');
// });

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
    console.log(arg);
    //let action = arg.split(',')[0];
    if(flg_writeCSV){
        fs.writeFileSync("./action.csv", arg + '\n');
        flg_writeCSV = false;
    }
    else{
        fs.appendFile("./action.csv", arg + '\n', (err) => {
            if (err) throw err;
        });
    }
});