(()=>{var t={940:()=>{document.addEventListener("click",(function(t){let e=t.target;if("tab"!==e.dataset.role)return;[].forEach.call(e.parentElement.parentElement.children,(t=>{t.classList.remove("current"),t.classList.remove("c_txt3")})),e.parentElement.classList.add("current"),e.parentElement.classList.add("c_txt3");let s=document.querySelector(e.dataset.view);if(s){let t=document.querySelectorAll(".tab-cont");[].forEach.call(t,(t=>{t.style.display="none"})),s.style.display="block"}}))}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var l=e[i]={exports:{}};return t[i](l,l.exports,s),l.exports}(()=>{"use strict";s(940);class t{constructor(t,e,s){this.$el=t,this.elapsed=0,this.duration=e||0,this.progress=0,this.render(),this.$progress=this.$el.querySelector(".progress_bar_progress"),this.$elapsed=this.$el.querySelector(".progress_elapsed"),this.$duration=this.$el.querySelector(".progress_duration"),this.$elapsed.innerText=this.formatTime(this.elapsed),this.$duration.innerText=this.formatTime(this.duration),s&&this.start()}start(){this.intervalId=setInterval(this.update.bind(this),50)}pause(){clearInterval(this.intervalId)}restart(){this.reset(),this.start()}update(){this.elapsed+=.05,this.elapsed>=this.duration&&this.reset(),this.progress=this.elapsed/this.duration,this.$progress.style.transform=`translate(${100*this.progress-100}%)`,this.$elapsed.innerText=this.formatTime(this.elapsed)}reset(t){this.pause(),this.elapsed=0,this.progress=0,t&&(this.duration=+t,this.duration=this.formatTime(this.duration))}render(){this.$el.innerHTML='\n        <div class="progress_time progress_elapsed"></div>\n        <div class="progress_bar">\n            <div class="progress_bar_progress"></div>\n        </div>\n        <div class="progress_time progress_duration"></div>\n        '}formatTime(t){let e=Math.floor(t/60),s=Math.floor(t%60);return e<10&&(e="0"+e),s<10&&(s="0"+s),`${e}:${s}`}}class e{constructor(t,e){this.$el=t,this.$el.innerHTML='\n        <div class="song_info_hd">\n            <h1 class="song_name"></h1>\n            <h2 class="singer_name"></h2>\n        </div>\n        <div class="lyrics-wrapper"><div class="lyrics_lines"></div></div>',this.$hd=this.$el.querySelector(".song_info_hd"),this.$lines=this.$el.querySelector(".lyrics_lines"),this.$audio=e,this.lyrics=[],this.text="",this.elapsed=0,this.index=0,this.reset(this.text)}start(){this.pause(),this.intervalId=setInterval(this.update.bind(this),1e3)}pause(){clearInterval(this.intervalId)}update(){if(this.elapsed+=Math.round(this.$audio.currentTime),this.index===this.lyrics.length-1)return this.reset();for(let t=this.index+1;t<this.lyrics.length;t++){let e=this.getSeconds(this.lyrics[t]);if(this.elapsed===e&&(!this.lyrics[t+1]||this.elapsed<this.getSeconds(this.lyrics[t+1]))){this.$lines.children[this.index].classList.remove("active"),this.$lines.children[t].classList.add("active"),this.index=t;break}}if(this.index>2){let t=-(this.index-2)*this.LINE_HEIGHT;this.$lines.style.transform=`translateY(${t}px)`}}render(){this.$lines.innerHTML=this.lyrics.map((t=>`\n            <div class="lyrics_line">${t.slice(10)}</div>\n        `)).join("")}restart(){this.reset(),this.start()}reset(t){this.pause(),t&&(this.text=this.formatText(t)||"",this.lyrics=this.text.match(/^\[\d{2}:\d{2}\.\d{2}\].+$/gm)||[],this.lyrics.length&&(this.render(),this.$lines.children[this.index].classList.add("active")))}getSeconds(t){return+t.replace(/^\[(\d{2}):(\d{2}).*$/,((t,e,s)=>60*+e+ +s))}formatText(t){let e=document.createElement("div");return e.innerHTML=t,e.innerText}}function i(t){let e=[].slice.call(t||document.querySelectorAll(".lazyload"));if("IntersectionObserver"in window){let t=new IntersectionObserver((function(t){t.forEach((t=>{t.intersectionRatio>0&&n(t.target)}))}),{threshold:.01});e.forEach((e=>t.observe(e)))}else{let t=function(s,i){let l,r;return function s(){let i=Date.now(),a=i-l;!l||a>=300?(function(){if(0===e.length)return window.removeEventListener("scroll",t);e=e.filter((t=>t.classList.contains("lazyload"))),e.forEach((t=>{(function(t){let e=document.documentElement.clientWidth,s=document.documentElement.clientHeight,{top:i,bottom:n,left:l,right:r}=t.getBoundingClientRect();return(i>0&&i<s||n>0&&n<s)&&(l>0&&l<e||r>0&&r<e)})(t)&&n(t)}))}(),l=i):a<300&&(window.clearTimeout(r),r=setTimeout(s,300-a))}}();"ontouchstart"in document.documentElement?(window.addEventListener("touchmove",t),window.dispatchEvent(new Event("touchmove"))):(window.addEventListener("mouseup",t),window.dispatchEvent(new Event("mouseup")))}}function n(t){let e=new Image;e.src=t.dataset.src,e.onload=function(){t.src=e.src,t.classList.remove("lazyload")}}e.prototype.LINE_HEIGHT=42,new class{constructor(t){this.$el=t}launch(){return fetch("json/rec.json").then((t=>t.json())).then((t=>this.render(t))),this}render(t){this.renderOfficialPlaylist(t.homeData.officialPlaylist),this.renderUgcPlaylist(t.homeData.ugcPlaylist),this.renderZoneList(t.homeData.zoneList),this.renderHotList(t.homeData.hotList),i()}renderOfficialPlaylist(t){this.$el.querySelector(".mui_list.officialPlaylist").innerHTML=t.map((t=>`<li class="mui_list__item">\n            <div class="mui_list__box">\n                <div class="mui_list__media">\n                    <img class="mui_list__img lazyload" data-src="${t.cover}">\n                    <div class="mui_cover_count">\n                        <i class="mui_cover_count__icon"></i>\n                        <span class="mui_cover_count__num">${(t.cnt/1e4).toFixed(1)}万</span>\n                    </div>\n                </div>\n           \n            <div class="mui_list__bd">\n                <h3 class="mui_list__tit c_txt1">${t.title}</h3>\n                </div>\n            </div>\n        </li>`)).join("")}renderUgcPlaylist(t){this.$el.querySelector(".mui_list.ugcPlaylist").innerHTML=t.map((t=>`<li class="mui_list__item">\n                    <div class="mui_list__box">\n                        <div class="mui_list__media">\n                            <img class="mui_list__img lazyload" data-src="${t.cover}">\n                            <div class="mui_cover_count">\n                                <i class="mui_cover_count__icon"></i>\n                                <span class="mui_cover_count__num">${(t.cnt/1e4).toFixed(1)}万</span>\n                            </div>\n                        </div>\n                         <div class="mui_list__bd">\n                        <h3 class="mui_list__tit c_txt1">${t.title}</h3>\n                        </div>\n                    </div>\n                </li>`)).join("")}renderZoneList(t){this.$el.querySelector(".mui_list.zoneList").innerHTML=t.map((t=>`<li class="mui_list__item">\n                    <div class="mui_list__box">\n                        <div class="mui_list__media">\n                            <img class="mui_list__img lazyload" data-src="${t.cover}">\n                            <div class="zone_info">\n                                <div class="zone_info__bd">\n                                <img class="zone_info__img" src="${t.miscellany.icon}">\n                                <span class="zone_info__name">${t.title}</span>\n                                </div>\n                            </div>\n                        </div>\n                         <div class="mui_list__bd">\n                        <h3 class="mui_list__tit c_txt1">${t.subtitle}</h3>\n                        </div>\n                    </div>\n                </li>`)).join("")}renderHotList(t){let e=t.map((t=>`\n        <a class="hot_search__item c_txt1 c_bg2" href="javascript:;">${t.title}</a>\n        `)).join("");this.$el.querySelector(".search_cont .hot_search .hot_search__bd").insertAdjacentHTML("beforeend",e)}}(document.querySelector(".rec-view")).launch(),new class{constructor(t){this.$el=t}launch(){return fetch("json/rank.json").then((t=>t.json())).then((t=>this.render(t.topList.data.group))),this}render(t){this.renderRankList(t)}renderRankList(t){let e=[];[].forEach.call(t,(t=>{[].forEach.call(t.toplist,(t=>{1!==t.topType&&e.push(t)}))})),this.$el.querySelector(".rank_list").innerHTML=e.map((t=>`<li class="rank_list__item c_bg2">\n                    <div class="rank_list__bd">\n                        <h2 class="rank_list__tit">${t.title}</h2>\n                        <ol class="rank_song_list">\n                        ${this.songList(t.song)}\n                        </ol>\n                    </div>\n                    <div class="rank_list__media">\n                        <img class="rank_list__img lazyload" data-src="${t.frontPicUrl}" alt="">\n                        <span class="rank_list__update">${t.updateTips}</span>\n                        <div class="mui_cover_count">\n                            <i class="mui_cover_count__icon"></i>\n                            <span class="mui_cover_count__num">${(t.listenNum/1e4).toFixed(1)}万</span>\n                        </div>\n                    </div>\n                </li>`)).join(""),i(this.$el.querySelectorAll(".lazyload"))}songList(t){return t.map((t=>`\n            <li class="rank_song_list__item">\n                <strong class="rakn_song_list__no c_txt1">${t.rank}.</strong>\n                <span class="rakn_song_list__name c_txt1">${t.title}</span> -\n                <span class="rank_song_list c_txt2">${t.singerName}</span>\n            </li>\n            `)).join("")}}(document.querySelector(".rank-view")).launch(),new class{constructor(t){this.$el=t,this.$el.addEventListener("click",this.enterSeach.bind(this)),this.$input=this.$el.querySelector("#search"),this.$input.addEventListener("keyup",this.onKeyUp.bind(this)),this.$songs=this.$el.nextElementSibling.querySelector(".search_result #songs_list"),this.$empty=this.$el.querySelector(".search_bar__empty"),this.$empty.addEventListener("click",this.reset.bind(this,!0)),this.$cancel=this.$el.querySelector(".search_bar__cancel"),this.$cancel.addEventListener("click",this.cancel.bind(this)),this.$delete=this.$el.nextElementSibling.querySelector(".hot_search__icon_delete"),this.$delete.addEventListener("click",this.deleteHistory.bind(this)),this.$search_result=this.$el.nextElementSibling.querySelector(".search_result"),this.$history=this.$el.nextElementSibling.querySelector(".hot_search_history"),this.$hot_search=this.$el.nextElementSibling.querySelector(".hot_search"),this.keyword="",this.page=1,this.perpage=20,this.songs=[],this.zhida={},this.nomore=!1,this.fetching=!1,this.onscroll=this.onScroll.bind(this),window.addEventListener("scroll",this.onscroll)}enterSeach(t){t.currentTarget.classList.add("focus"),this.$cancel.style.display="block",this.$hot_search.style.display="block",this.$el.parentNode.nextElementSibling.style.display="none",this.$el.nextElementSibling.style.display="block";let e=localStorage.getItem("historyList");e&&(e=e.replace(/\[(.*)\]/,"$1").split(","),""===this.$songs.innerText&&(this.$history.style.display="block"),this.insertHistory(e))}onScroll(t){this.nomore||document.documentElement.clientHeight+pageYOffset>document.body.scrollHeight-50&&this.search(this.keyword,this.page+1)}onKeyUp(t){let e=t.target.value.trim();if(!e)return this.reset(!1);13===t.keyCode?(this.$hot_search.style.display="none",this.$history.style.display="none",this.insertLocalStorage('"'+e+'"'),this.search(e)):this.$empty.style.display="block"}insertLocalStorage(t){let e=[];return localStorage.getItem("historyList")&&(e=localStorage.getItem("historyList").replace(/\[(.*)\]/,"$1").split(",")),-1===e.indexOf(t)&&e.push(t),this.insertHistory(e),localStorage.setItem("historyList","["+e+"]"),e}insertHistory(t){document.querySelector(".search_cont .hot_search_history .hot_search__bd").innerHTML=t.map((t=>`<a class="hot_search__item c_txt1 c_bg2" href="javascript:;">${t.replace('"',"").replace('"',"")}</a>`)).join("")}reset(t){t&&(this.$songs.innerHTML="",this.$input.value="",this.$hot_search.style.display="block",this.$history.style.display="block"),this.keyword="",this.page=1,this.songs=[],document.querySelector(".search_bar__empty").style.display="none"}search(t,e){this.fetching||(this.keyword=t,this.fetching=!0,fetch(function(t,e){return`http://localhost:4000/search?keyword=${t}&page=${e}`}(this.keyword,e||this.page)).then((t=>t.json())).then((t=>(this.page=t.data.song.curpage,this.nomore="no results"===t.massage,this.songs.push(...t.data.song.list),this.zhida=t.data.zhida,t.data.song.list))).then((t=>this.append(t,this.zhida))).then((()=>this.fetching=!1)).catch((()=>this.fetching=!1)))}append(t,e){let s="";1===this.page&&(s=`<li class="mui_cell_list__item person">\n            <div class="mui_cell_list__box">\n                <div class="mui_cell_list__media">\n                    <img class="mui_cell_list__img" src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${e.singermid}.jpg?max_age=2592000" alt="${e.singername}">\n                </div>\n                <div class="mui_cell_list__bd">\n                    <h3 class="mui_cell_list__tit c_txt1">歌手:${e.singername}</h3>\n                    <p class="mui_cell_list__desc c_txt2">\n                        <span class="mui_cell_list__txt">歌曲:${e.songnum}</span>\n                        <span class="mui_cell_list__txt">专辑:${e.albumnum}</span>\n                    </p>\n                </div>\n            </div>\n        </li>`);let i=t.map((t=>`<a class="mui_cell_list__item" \n        href="#player?artist=${t.singer.map((t=>t.name)).join(" ")}&songmid=${t.songmid}&songid=${t.songid}&songname=${t.songname}&albummid=${t.albummid}&duration=${t.interval}">\n            <div class="mui_cell_list__box">\n                <div class="mui_cell_list__bd">\n                    <h3 class="mui_cell_list__tit c_txt1">${t.songname}</h3>\n                    <p class="mui_cell_list__desc c_txt2">\n                        <span class="mui_cell_list__txt">${t.singer.map((t=>t.name)).join(" ")}</span>\n                    </p>\n                </div>\n            </div>\n        </a>`)).join("");this.$songs.insertAdjacentHTML("beforeend",s+i)}deleteHistory(){localStorage.getItem("historyList")&&(localStorage.removeItem("historyList"),this.$history.style.display="none")}cancel(t){t.stopPropagation(),this.$input.value="",this.$el.classList.remove("focus"),t.currentTarget.style.display="none",this.$songs.innerHTML="",this.$el.parentNode.nextElementSibling.style.display="block",this.$el.nextElementSibling.style.display="none"}}(document.querySelector(".search-view"));let l=new class{constructor(s){this.$el=s,this.songid="",this.$el.addEventListener("click",this),this.$play_icon=this.$el.querySelector(".play_icon"),this.$pause_icon=this.$el.querySelector(".pause_icon"),this.$audio=this.createAudio(),this.progress=new t(this.$el.querySelector(".player_footer .progress"),280,!0),this.lyrics=new e(this.$el.querySelector(".player_lyrics"),this.$audio)}handleEvent(t){let e=t.target;switch(!0){case e.matches(".play_icon"):this.onPlay(t);break;case e.matches(".pause_icon"):this.onPause(t);break;case e.matches(".pack_up_icon"):this.hide()}}createAudio(){let t=document.createElement("audio");return t.id=`player-${Math.floor(100*Math.random())}-${+new Date}`,t.addEventListener("ended",(()=>{this.$audio.play(),this.lyrics.restart(),this.progress.restart()})),document.body.appendChild(t),t}onPlay(t){this.progress.start(),this.lyrics.start(),this.$audio.play(),this.$pause_icon.style.display="block",this.$play_icon.style.display="none"}onPause(t){this.progress.pause(),this.lyrics.pause(),this.$audio.pause(),this.$play_icon.style.display="block",this.$pause_icon.style.display="none"}play(t={}){if(!t)return;this.$el.querySelector(".song_name").innerText=t.songname,this.$el.querySelector(".singer_name").innerText=t.artist,this.progress.reset(t.duration);let e=`//y.gtimg.cn/music/photo_new/T002R300x300M000${t.albummid}.jpg`;var s;console.log(`url(${e})`),this.$el.querySelector(".bg").style.backgroundImage=`url(${e})`,t.songmid&&(this.songid=t.songid,this.$audio.src=`http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/RS02${t.songmid}.mp3?guid=1872529262&vkey=12396C833162E332C65C02D264A1C711688A8B09EA5EE4E5E365B0C06DBE280F0D212208BE3FB9FDBD8AE82D228D7A2BB3B62A13847EC8B6&uin=0&fromtag=38`,fetch((s=this.songid,`http://localhost:4000/lyrics?id=${s}`)).then((t=>t.json())).then((t=>t.lyric)).then((t=>this.lyrics.reset(t))).catch((()=>{}))),this.show()}show(){this.$el.classList.remove("hide"),this.$el.classList.add("show")}hide(){this.$el.classList.remove("show"),this.$el.classList.add("hide")}}(document.querySelector(".musicPlayer"));function r(){let t=location.hash;if(/^#player\?.+/.test(t)){let e=t.slice(t.indexOf("?")+1).match(/(\w+)=([^&]+)/g),s=e&&e.reduce(((t,e)=>{let s=e.split("=");return t[s[0]]=decodeURIComponent(s[1]),t}),{});l.play(s)}else l.hide()}document.querySelector(".top_operation_bar__btn").addEventListener("click",(()=>{l.show()})),r(),window.addEventListener("hashchange",r)})()})();