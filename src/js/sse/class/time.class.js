export default class Time{
    date;
    constructor(){
    }
    now(){
        //this.date = new Date();
        //return (this.date.getMonth() + 1) + '/' + this.date.getDate() + ',' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        return performance.now();
    }
}