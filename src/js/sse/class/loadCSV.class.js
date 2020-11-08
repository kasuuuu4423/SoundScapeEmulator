export default class LoadCSV{
    data;
    request;
    constructor(path, flg_conv=true){
        this.request = new XMLHttpRequest();
        this.request.addEventListener('load', (e) => {
            let response = e.target.responseText;
            if(flg_conv){
                this.data = this.conv_responce(response);
            }
            else{
                this.data = response;
            }
        });
        this.request.open('GET', path, true);
        this.request.send();
    }
    conv_responce(data){
        let names = data.split('\n');
        for(let i = 0; i < names.length; i++){
            names[i] = names[i].split(',');
        }
        return names;
    }
}