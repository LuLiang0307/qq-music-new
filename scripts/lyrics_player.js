let text = `[ti&#58;年少有为]&#10;[ar&#58;李荣浩]&#10;[al&#58;年少有为]&#10;[by&#58;]&#10;[offset&#58;0]&#10;[00&#58;02&#46;44]年少有为&#32;&#45;&#32;李荣浩&#10;[00&#58;03&#46;52]词：李荣浩&#10;[00&#58;04&#46;09]曲：李荣浩&#10;[00&#58;04&#46;67]编曲：李荣浩&#10;[00&#58;05&#46;39]制作人：李荣浩&#10;[00&#58;06&#46;28]吉他：李荣浩&#10;[00&#58;07&#46;02]贝斯：李荣浩&#10;[00&#58;07&#46;80]鼓：Alex&#10;[00&#58;08&#46;13]和声编写：李荣浩&#10;[00&#58;09&#46;26]和声：李荣浩&#10;[00&#58;10&#46;10]弦乐编写：李荣浩&#10;[00&#58;11&#46;22]弦乐：国际首席爱乐乐团&#10;[00&#58;12&#46;75]录音师：李荣浩&#10;[00&#58;13&#46;73]混音师：李荣浩&#10;[00&#58;14&#46;74]录音室：北京一样音乐录音室&#10;[00&#58;16&#46;62]混音室：北京一样音乐录音室&#10;[00&#58;18&#46;55]母带后期制作人：李荣浩&#10;[00&#58;20&#46;20]母带后期处理工程师：周天澈TC&#32;Z&#46;&#10;[00&#58;22&#46;44]母带后期处理录音室：TC&#32;Faders&#10;[00&#58;29&#46;94]电视一直闪&#10;[00&#58;33&#46;50]联络方式都还没删&#10;[00&#58;37&#46;26]你待我的好&#10;[00&#58;40&#46;88]我却错手毁掉&#10;[00&#58;44&#46;54]也曾一起想&#10;[00&#58;48&#46;14]有个地方睡觉吃饭&#10;[00&#58;51&#46;78]可怎么去熬&#10;[00&#58;53&#46;79]日夜颠倒连头款也凑不到&#10;[00&#58;59&#46;28]墙板&#32;被我砸烂&#10;[01&#58;02&#46;71]到现在还没修&#10;[01&#58;06&#46;00]一碗热的粥&#10;[01&#58;08&#46;10]你怕我没够&#10;[01&#58;10&#46;11]都留一半带走&#10;[01&#58;12&#46;88]给你形容&#32;美好今后你常常眼睛会红&#10;[01&#58;20&#46;52]原来心疼我&#10;[01&#58;22&#46;56]我那时候不懂&#10;[01&#58;27&#46;42]假如我年少有为不自卑&#10;[01&#58;31&#46;69]懂得什么是珍贵&#10;[01&#58;34&#46;27]那些美梦&#10;[01&#58;37&#46;80]没给你&#32;我一生有愧&#10;[01&#58;41&#46;98]假如我年少有为&#32;知进退&#10;[01&#58;46&#46;20]才不会让你替我受罪&#10;[01&#58;50&#46;13]婚礼上&#32;多喝几杯&#10;[01&#58;53&#46;31]和你现在那位&#10;[02&#58;26&#46;35]也曾一起想&#10;[02&#58;29&#46;95]有个地方睡觉吃饭&#10;[02&#58;33&#46;58]可怎么去熬&#10;[02&#58;35&#46;58]日夜颠倒连头款也凑不到&#10;[02&#58;41&#46;02]墙板&#32;被我砸烂&#10;[02&#58;44&#46;44]到现在还没修&#10;[02&#58;47&#46;84]一碗热的粥&#10;[02&#58;49&#46;89]你怕我没够&#10;[02&#58;51&#46;73]都留一半带走&#10;[02&#58;54&#46;59]给你形容&#32;美好今后你常常眼睛会红&#10;[03&#58;02&#46;40]原来心疼我&#10;[03&#58;04&#46;38]我那时候不懂&#10;[03&#58;09&#46;24]假如我年少有为不自卑&#10;[03&#58;13&#46;48]懂得什么是珍贵&#10;[03&#58;16&#46;16]那些美梦&#10;[03&#58;19&#46;74]没给你&#32;我一生有愧&#10;[03&#58;23&#46;63]假如我年少有为&#32;知进退&#10;[03&#58;28&#46;06]才不会让你替我受罪&#10;[03&#58;31&#46;86]婚礼上&#32;多喝几杯&#10;[03&#58;35&#46;13]和你现在那位&#10;[03&#58;42&#46;01]假如我年少有为不自卑&#10;[03&#58;46&#46;25]尝过后悔的滋味&#10;[03&#58;48&#46;84]金钱地位&#10;[03&#58;52&#46;42]搏到了却好想退回&#10;[03&#58;56&#46;50]假如我年少有为&#32;知进退&#10;[04&#58;00&#46;75]才不会让你替我受罪&#10;[04&#58;04&#46;66]婚礼上&#32;多喝几杯&#10;[04&#58;07&#46;82]和你现在那位&#10;[04&#58;15&#46;38]在婚礼上&#32;多喝几杯&#10;[04&#58;18&#46;85]祝我年少有为`
class LyricsPlayer {
    constructor(el) {
        this.$el = el
        this.$el.innerHTML = `
        <div class="song_info_hd"></div>
        <div class="lyrics-wrapper"><div class="lyrics_lines"></div></div>`
        this.$hd = this.$el.querySelector('.song_info_hd')
        this.$lines = this.$el.querySelector('.lyrics_lines')
        this.lyrics = []
        this.text = ''
        this.elapsed = 0
        this.index = 0
        this.reset(this.text)
    }
    start() {
        this.intervalId = setInterval(this.update.bind(this), 1000);
    }
    pause() {
        clearInterval(this.intervalId)
    }
    update() {
        this.elapsed += 1
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
        this.$hd.innerHTML = `
        <h1 class='song_name'>${this.lyrics[0].slice(10).split('-')[0].trim()}</h1>
        <h2 class="singer_name">${this.lyrics[0].slice(10).split('-')[1].trim()}</h2>`
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