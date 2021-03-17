import './tab.js'
import { Search } from './search.js'
import { MusicPlayer } from './music_player.js'
import { Recommend } from './recommend.js'
import { Rank } from './rank.js'

let recommend = new Recommend(document.querySelector('.rec-view')).launch()
let rank = new Rank(document.querySelector('.rank-view')).launch()
let search = new Search(document.querySelector(".search-view"))
    /*打开播放器*/
let musicPlayer = new MusicPlayer(document.querySelector(".musicPlayer"))
document.querySelector('.top_operation_bar__btn').addEventListener('click', () => {
    musicPlayer.show()
})

onHashChange()
window.addEventListener('hashchange', onHashChange)


function onHashChange() {
    let hash = location.hash
    if (/^#player\?.+/.test(hash)) {
        let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
        let options = matches && matches.reduce((res, cur) => {
            let arr = cur.split('=')
            res[arr[0]] = decodeURIComponent(arr[1])
            return res
        }, {})
        musicPlayer.play(options)
    } else {
        musicPlayer.hide()
    }
}