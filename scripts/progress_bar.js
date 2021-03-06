export class ProgressBar {
    constructor(el, duration, start) {
        this.$el = el
        this.elapsed = 0
        this.duration = duration || 0
        this.progress = 0
        this.render()
        this.$progress = this.$el.querySelector('.progress_bar_progress')
        this.$elapsed = this.$el.querySelector('.progress_elapsed')
        this.$duration = this.$el.querySelector('.progress_duration')
        this.$elapsed.innerText = this.formatTime(this.elapsed)
        this.$duration.innerText = this.formatTime(this.duration)
        if (start) this.start()
    }
    start() {
        this.intervalId = setInterval(this.update.bind(this), 50)
    }
    pause() {
        clearInterval(this.intervalId)
    }
    restart() {
        this.reset()
        this.start()
    }
    update() {
        this.elapsed += 0.05
        if (this.elapsed >= this.duration) this.reset()
        this.progress = this.elapsed / this.duration
        this.$progress.style.transform = `translate(${this.progress*100-100}%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)

    }
    reset(duration) {
        this.pause()
        this.elapsed = 0
        this.progress = 0
        if (duration) {
            this.duration = +duration
            this.duration = this.formatTime(this.duration)
        }
    }
    render() {
        this.$el.innerHTML = `
        <div class="progress_time progress_elapsed"></div>
        <div class="progress_bar">
            <div class="progress_bar_progress"></div>
        </div>
        <div class="progress_time progress_duration"></div>
        `
    }
    formatTime(seconds) {
        let mins = Math.floor(seconds / 60)
        let secs = Math.floor(seconds % 60)
        if (mins < 10) mins = '0' + mins
        if (secs < 10) secs = '0' + secs
        return `${mins}:${secs}`
    }
}