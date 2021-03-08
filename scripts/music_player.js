class MusicPlayer {
    constructor(el) {
        this.$el = el
        console.log(this.$el)
        this.$el.addEventListener('click', this)
        this.$play_icon = this.$el.querySelector('.play_icon')
        this.$pause_icon = this.$el.querySelector('.pause_icon')
        this.createAudio()
        this.progress = new ProgressBar(this.$el.querySelector('.player_footer .progress'), 280, true)
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player_lyrics'))
    }
    handleEvent(event) {
        let target = event.target
        switch (true) {
            case target.matches('.play_icon'):
                this.onPlay(event)
                break
            case target.matches('.pause_icon'):
                this.onPause(event)
                break
            case target.matches('.pack_up_icon'):
                this.hide()
                break
        }
    }
    createAudio() {
        this.$audio = document.createElement('audio')
        this.$audio.id = `player-${Math.floor(Math.random()*100)}-${+ new Date()}`
        this.$audio.onended = () => {
            this.$lyrics.restart()
            this.$progress.restart()
            console.log('ended')
        }
        document.body.appendChild(this.$audio)
    }

    onPlay(event) {
        this.$pause_icon.style.display = 'block'
        this.$play_icon.style.display = 'none'
        this.progress.start()
        this.lyrics.start()
    }
    onPause(event) {
        this.$play_icon.style.display = 'block'
        this.$pause_icon.style.display = 'none'
        this.progress.pause()
        this.lyrics.pause()
    }
    show(event) {
        this.$el.classList.remove('hide')
        this.$el.classList.add('show')
    }
    hide() {
        this.$el.classList.remove('show')
        this.$el.classList.add('hide')
    }
}