class Search {
    constructor(el) {
        this.$el = el
        this.$input = this.$el[0].querySelector("#search")
        this.$songs = this.$el[0].nextElementSibling.querySelector("#songs_list")
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        this.keyword = ''
        this.page = 1
        this.perpage = 20
        this.songs = []
        this.zhida = {}
        this.nomore = false
        this.fetching = false
        this.onscroll = this.onScroll.bind(this)
        window.addEventListener('scroll', this.onscroll)
    }
    onScroll(event) {
        if (this.nomore) return
        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
            this.search(this.keyword, this.page + 1)
        }
    }
    onKeyUp(event) {
        let keyword = event.target.value.trim()
        if (!keyword) return this.reset()
        if (event.key !== 'Enter') return
        this.search(keyword)
    }
    reset() {
        this.keyword = ''
        this.page = 1
        this.songs = []
        this.$songs.innerHTML = ''
    }
    search(keyword, page) {
        if (this.fetching) return
        this.keyword = keyword
        this.fetching = true
        fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${page ||this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.nomore = (json.massage === 'no results')
                this.songs.push(...json.data.song.list)
                this.zhida = json.data.zhida
                return json.data.song.list
            })
            .then(songs => this.append(songs, this.zhida))
            .then(() => this.fetching = false)
            .catch(() => this.fetching = false)

    }
    append(songs, zhida) {
        let headHtml = ''
        if (this.page === 1) {
            headHtml =
                `<li class="mui_cell_list__item person">
            <div class="mui_cell_list__box">
                <div class="mui_cell_list__media">
                    <img class="mui_cell_list__img" src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${zhida.singermid}.jpg?max_age=2592000" alt="${zhida.singername}">
                </div>
                <div class="mui_cell_list__bd">
                    <h3 class="mui_cell_list__tit c_txt1">歌手:${zhida.singername}</h3>
                    <p class="mui_cell_list__desc c_txt2">
                        <span class="mui_cell_list__txt">歌曲:${zhida.songnum}</span>
                        <span class="mui_cell_list__txt">专辑:${zhida.albumnum}</span>
                    </p>
                </div>
            </div>
        </li>`
        }

        let html = songs.map(song => `
        <li class="mui_cell_list__item">
            <div class="mui_cell_list__box">
                <div class="mui_cell_list__bd">
                    <h3 class="mui_cell_list__tit c_txt1">${song.songname}</h3>
                    <p class="mui_cell_list__desc c_txt2">
                        <span class="mui_cell_list__txt">${song.singer.map(s=>s.name).join(' ')}</span>
                    </p>
                </div>
            </div>
        </li>`).join('')
        this.$songs.insertAdjacentHTML('beforeend', headHtml + html)
    }
}

/*点击进入搜索页面*/
$(".search-view").on('click', (e) => {
    e.currentTarget.classList.add("focus")
    e.currentTarget.lastElementChild.style.display = 'block'
    e.currentTarget.parentNode.nextElementSibling.style.display = 'none'
    e.currentTarget.nextElementSibling.style.display = 'block'
})

/*点击搜索的取消，回到当前页面*/
$("#cancel").on('click', function(e) {
    e.stopPropagation()
    e.currentTarget.parentNode.classList.remove('focus')
    e.currentTarget.style.display = "none"
    e.currentTarget.parentNode.parentNode.nextElementSibling.style.display = 'block'
    e.currentTarget.parentNode.nextElementSibling.style.display = 'none'
})