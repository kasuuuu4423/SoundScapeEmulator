export default class PreviewAudio{
    player;
    src;
    constructor(){
        this.player = this._create_player();
    }
    _create_player(){
        let player = document.createElement('audio');
        return player;
    }
    _delete_player(){
        let parent = this.player.parent.removeChild(this.player);
    }
    play(src){
        this.player.setAttribute('src', src);
        this.player.play();
        let remove_whenStop = () => {
            this.stop();
        };
        this.player.addEventListener('ended', remove_whenStop.bind(this));
    }
    stop(){
        this.player.pause();
        this.player.setAttribute('src', '');
    }
}