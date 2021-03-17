import { lazyload } from './lazyload.js'
import { REC_URL } from './constants.js'
export class Recommend {
    constructor(el) {
        this.$el = el
    }
    launch() {
        fetch(REC_URL)
            .then(res => res.json())
            .then(json => this.render(json))
        return this
    }
    render(json) {
        this.renderOfficialPlaylist(json.homeData.officialPlaylist)
        this.renderUgcPlaylist(json.homeData.ugcPlaylist)
        this.renderZoneList(json.homeData.zoneList)
        this.renderHotList(json.homeData.hotList)
        lazyload()

    }
    renderOfficialPlaylist(list) {
        this.$el.querySelector('.mui_list.officialPlaylist').innerHTML = list.map(item =>
            `<li class="mui_list__item">
            <div class="mui_list__box">
                <div class="mui_list__media">
                    <img class="mui_list__img lazyload" data-src="${item.cover}">
                    <div class="mui_cover_count">
                        <i class="mui_cover_count__icon"></i>
                        <span class="mui_cover_count__num">${(item.cnt/10000).toFixed(1)}万</span>
                    </div>
                </div>
           
            <div class="mui_list__bd">
                <h3 class="mui_list__tit c_txt1">${item.title}</h3>
                </div>
            </div>
        </li>`).join('')
    }
    renderUgcPlaylist(list) {
        this.$el.querySelector('.mui_list.ugcPlaylist').innerHTML = list.map(item =>
            `<li class="mui_list__item">
                    <div class="mui_list__box">
                        <div class="mui_list__media">
                            <img class="mui_list__img lazyload" data-src="${item.cover}">
                            <div class="mui_cover_count">
                                <i class="mui_cover_count__icon"></i>
                                <span class="mui_cover_count__num">${(item.cnt/10000).toFixed(1)}万</span>
                            </div>
                        </div>
                         <div class="mui_list__bd">
                        <h3 class="mui_list__tit c_txt1">${item.title}</h3>
                        </div>
                    </div>
                </li>`).join('')
    }
    renderZoneList(list) {
        this.$el.querySelector('.mui_list.zoneList').innerHTML = list.map(item =>
            `<li class="mui_list__item">
                    <div class="mui_list__box">
                        <div class="mui_list__media">
                            <img class="mui_list__img lazyload" data-src="${item.cover}">
                            <div class="zone_info">
                                <div class="zone_info__bd">
                                <img class="zone_info__img" src="${item.miscellany.icon}">
                                <span class="zone_info__name">${item.title}</span>
                                </div>
                            </div>
                        </div>
                         <div class="mui_list__bd">
                        <h3 class="mui_list__tit c_txt1">${item.subtitle}</h3>
                        </div>
                    </div>
                </li>`).join('')
    }
    renderHotList(list) {
        let text = list.map(item => `
        <a class="hot_search__item c_txt1 c_bg2" href="javascript:;">${item.title}</a>
        `).join('')
        this.$el.querySelector('.search_cont .hot_search .hot_search__bd').insertAdjacentHTML('beforeend', text)
    }
}