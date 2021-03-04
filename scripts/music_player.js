class MusicPlayer {
    constructor(el) {
        this.$el = el
        this.$el.addEventListener('click', this)
        this.$show_icon = document.querySelector('.top_operation_bar__btn')
        this.$hide_icon = document.querySelector('.pack_up')
        this.$play_icon = this.$el.querySelector('.play_icon')
        this.$pause_icon = this.$el.querySelector('.pause_icon')
        this.bindEvent()
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
        }
    }
    createAudio() {

    }
    bindEvent() {
        console.log('bindEvent')
        this.$show_icon.addEventListener('click', this.show.bind(this))
        this.$hide_icon.addEventListener('click', this.hide.bind(this))
        this.$play_icon.addEventListener('click', this.play.bind(this))
        this.$pause_icon.addEventListener('click', this.pause.bind(this))
    }
    onPlay() {
        console.log('play')
        this.$pause_icon.style.display = 'block'
        this.$play_icon.style.display = 'none'
    }
    onPause(event) {
        console.log('pause')
        this.$play_icon.style.display = 'block'
        this.$pause_icon.style.display = 'none'
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