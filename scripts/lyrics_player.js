export class LyricsPlayer {
    constructor(el, audio) {
        this.$el = el
        this.$el.innerHTML = `
        <div class="song_info_hd">
            <h1 class="song_name"></h1>
            <h2 class="singer_name"></h2>
        </div>
        <div class="lyrics-wrapper"><div class="lyrics_lines"></div></div>`
        this.$hd = this.$el.querySelector('.song_info_hd')
        this.$lines = this.$el.querySelector('.lyrics_lines')
        this.$audio = audio
        this.lyrics = []
        this.text = ''
        this.elapsed = 0
        this.index = 0
        this.reset(this.text)
    }
    start() {
        this.pause()
        this.intervalId = setInterval(this.update.bind(this), 1000);
    }
    pause() {
        clearInterval(this.intervalId)
    }
    update() {
        this.elapsed += Math.round(this.$audio.currentTime)
        if (this.index === this.lyrics.length - 1) return this.reset()
        for (let i = this.index + 1; i < this.lyrics.length; i++) {
            let seconds = this.getSeconds(this.lyrics[i])
                // console.log('seconds:' + seconds)
            if (
                this.elapsed === seconds &&
                (!this.lyrics[i + 1] || this.elapsed < this.getSeconds(this.lyrics[i + 1]))
            ) {
                this.$lines.children[this.index].classList.remove('active')
                this.$lines.children[i].classList.add('active')
                this.index = i
                break
            }
        }
        if (this.index > 2) {
            let y = -(this.index - 2) * this.LINE_HEIGHT
            this.$lines.style.transform = `translateY(${y}px)`
        }
    }
    render() {
        this.$lines.innerHTML = this.lyrics.map(line => `
            <div class="lyrics_line">${line.slice(10)}</div>
        `).join('')
    }
    restart() {
        this.reset()
        this.start()
    }
    reset(text) {
        this.pause()
        if (text) {
            this.text = this.formatText(text) || ''
            this.lyrics = this.text.match(/^\[\d{2}:\d{2}\.\d{2}\].+$/gm) || []
            if (this.lyrics.length) {
                this.render()
                this.$lines.children[this.index].classList.add('active')
            }
        }
    }
    getSeconds(line) {

        return +line.replace(/^\[(\d{2}):(\d{2}).*$/, (match, p1, p2) => 60 * (+p1) + (+p2))
    }
    formatText(text) {
        let div = document.createElement('div')
        div.innerHTML = text
        return div.innerText
    }

}
LyricsPlayer.prototype.LINE_HEIGHT = 42