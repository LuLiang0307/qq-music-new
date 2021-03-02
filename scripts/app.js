(function() {
    fetch('json/rec.json')
        .then(res => res.json())
        .then(render)
    fetch('http://localhost:4000/rank')
        .then(res => res.json())
        .then(renderRank)

    function render(json) {
        renderOfficialPlaylist(json.homeData.officialPlaylist)
        renderUgcPlaylist(json.homeData.ugcPlaylist)
        renderZoneList(json.homeData.zoneList)
        renderHotList(json.homeData.hotList)
        lazyload(document.querySelectorAll(".lazyload"))
    }
    let search = new Search(document.querySelectorAll(".search-view"))

    function renderRank(json) {
        renderRankList(json.topList.data.group)
        lazyload(document.querySelectorAll(".rank_list  .lazyload"))
    }
    /*热门搜索*/
    function renderHotList(list) {
        let text = list.map(item => `
        <a class="hot_search__item c_txt1 c_bg2" href="javascript:;">${item.title}</a>
        `).join('')
        document.querySelector('.search_cont .hot_search .hot_search__bd').insertAdjacentHTML('beforeend', text)
    }
    /*官方歌单*/
    function renderOfficialPlaylist(list) {
        document.querySelector('.mui_list.officialPlaylist').innerHTML = list.map(item =>
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
    /*达人歌单*/
    function renderUgcPlaylist(list) {
        document.querySelector('.mui_list.ugcPlaylist').innerHTML = list.map(item =>
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
    /*专区*/
    function renderZoneList(list) {
        document.querySelector('.mui_list.zoneList').innerHTML = list.map(item =>
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
    /*排行版*/
    function renderRankList(list) {
        let _list = [];
        [].forEach.call(list, el => {
            [].forEach.call(el.toplist, ele => {
                if (ele.topType !== 1) {
                    _list.push(ele)
                }
            })
        })
        document.querySelector(".rank_list").innerHTML = _list.map(item =>
            `<li class="rank_list__item c_bg2">
                <div class="rank_list__bd">
                    <h2 class="rank_list__tit">${item.title}</h2>
                    <ol class="rank_song_list">
                    ${songList(item.song)}
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

    }


    function songList(songs) {
        return songs.map(item => `
            <li class="rank_song_list__item">
                <strong class="rakn_song_list__no c_txt1">${item.rank}.</strong>
                <span class="rakn_song_list__name c_txt1">${item.title}</span> -
                <span class="rank_song_list c_txt2">${item.singerName}</span>
            </li>
            `).join('')
    }
})()