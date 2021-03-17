import { ProgressBar } from './progress_bar.js'
import { LyricsPlayer } from './lyrics_player.js'
import { lyricsUrl, songUrl, albumCoverUrl } from './helpers.js'

export class MusicPlayer {
    constructor(el) {
        this.$el = el
        this.songid = ''
        this.$el.addEventListener('click', this)
        this.$play_icon = this.$el.querySelector('.play_icon')
        this.$pause_icon = this.$el.querySelector('.pause_icon')
        this.$audio = this.createAudio()
        this.progress = new ProgressBar(this.$el.querySelector('.player_footer .progress'), 280, true)
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player_lyrics'), this.$audio)
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
        let audio = document.createElement('audio')
        audio.id = `player-${Math.floor(Math.random()*100)}-${+ new Date()}`
        audio.addEventListener('ended', () => {
            this.$audio.play()
            this.lyrics.restart()
            this.progress.restart()
        })
        document.body.appendChild(audio)
        return audio
    }

    onPlay(event) {
        this.progress.start()
        this.lyrics.start()
        this.$audio.play()
        this.$pause_icon.style.display = 'block'
        this.$play_icon.style.display = 'none'
    }
    onPause(event) {
        this.progress.pause()
        this.lyrics.pause()
        this.$audio.pause()
        this.$play_icon.style.display = 'block'
        this.$pause_icon.style.display = 'none'
    }
    play(options = {}) {
        if (!options) return
        this.$el.querySelector('.song_name').innerText = options.songname
        this.$el.querySelector('.singer_name').innerText = options.artist
        this.progress.reset(options.duration)

        let url = albumCoverUrl(options.albummid)
        console.log(`url(${url})`)
        this.$el.querySelector('.bg').style.backgroundImage = `url(${url})`

        if (options.songmid) {
            this.songid = options.songid
            this.$audio.src = songUrl(options.songmid)
            fetch(lyricsUrl(this.songid))
                .then(res => res.json())
                .then(json => json.lyric)
                .then(text => this.lyrics.reset(text))
                .catch(() => {})

        }
        this.show()
    }
    show() {
        this.$el.classList.remove('hide')
        this.$el.classList.add('show')
    }
    hide() {
        this.$el.classList.remove('show')
        this.$el.classList.add('hide')
    }
}