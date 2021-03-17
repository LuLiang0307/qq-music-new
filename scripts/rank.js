import { lazyload } from './lazyload.js'
import { RANK_URL } from './constants.js'
export class Rank {
    constructor(el) {
        this.$el = el
    }
    launch() {
        fetch(RANK_URL)
            .then(res => res.json())
            .then(json => this.render(json.topList.data.group))
        return this
    }
    render(json) {
        this.renderRankList(json)
    }
    renderRankList(list) {
        let _list = [];
        [].forEach.call(list, el => {
            [].forEach.call(el.toplist, ele => {
                if (ele.topType !== 1) {
                    _list.push(ele)
                }
            })
        })
        this.$el.querySelector(".rank_list").innerHTML = _list.map(item =>
            `<li class="rank_list__item c_bg2">
                    <div class="rank_list__bd">
                        <h2 class="rank_list__tit">${item.title}</h2>
                        <ol class="rank_song_list">
                        ${this.songList(item.song)}
                        </ol>
                    </div>
                    <div class="rank_list__media">
                        <img class="rank_list__img lazyload" data-src="${item.frontPicUrl}" alt="">
                        <span class="rank_list__update">${item.updateTips}</span>
                        <div class="mui_cover_count">
                            <i class="mui_cover_count__icon"></i>
                            <span class="mui_cover_count__num">${(item.listenNum/10000).toFixed(1)}万</span>
                        </div>
                    </div>
                </li>`).join('')
        lazyload(this.$el.querySelectorAll(".lazyload"))
    }
    songList(songs) {
        return songs.map(item => `
            <li class="rank_song_list__item">
                <strong class="rakn_song_list__no c_txt1">${item.rank}.</strong>
                <span class="rakn_song_list__name c_txt1">${item.title}</span> -
                <span class="rank_song_list c_txt2">${item.singerName}</span>
            </li>
            `).join('')
    }
}