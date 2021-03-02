class Search {
    constructor(el) {
        this.$el = el
        this.$el[0].addEventListener('click', this.enterSeach.bind(this))

        this.$input = this.$el[0].querySelector("#search")
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))

        this.$songs = this.$el[0].nextElementSibling.querySelector('.search_result #songs_list')

        this.$empty = this.$el[0].querySelector('.search_bar__empty')
        this.$empty.addEventListener('click', this.reset.bind(this, true))

        this.$cancel = this.$el[0].querySelector('.search_bar__cancel')
        this.$cancel.addEventListener('click', this.cancel.bind(this))

        this.$delete = this.$el[0].nextElementSibling.querySelector('.hot_search__icon_delete')
        this.$delete.addEventListener('click', this.deleteHistory.bind(this))

        this.$search_result = this.$el[0].nextElementSibling.querySelector('.search_result')

        this.$history = this.$el[0].nextElementSibling.querySelector('.hot_search_history')
        this.$hot_search = this.$el[0].nextElementSibling.querySelector('.hot_search')
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
    enterSeach(event) {
        event.currentTarget.classList.add("focus")
        this.$cancel.style.display = 'block'
        this.$hot_search.style.display = 'block'
        this.$el[0].parentNode.nextElementSibling.style.display = 'none'
        this.$el[0].nextElementSibling.style.display = 'block'
        let keywordArr = localStorage.getItem('historyList')
        if (keywordArr) {
            keywordArr = keywordArr.replace(/\[(.*)\]/, '$1').split(',')
            if (this.$songs.innerText === '') {
                this.$history.style.display = "block"
            }
            this.insertHistory(keywordArr)
        }
    }
    onScroll(event) {
        if (this.nomore) return
        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
            this.search(this.keyword, this.page + 1)
        }
    }
    onKeyUp(event) {
        let keyword = event.target.value.trim()
        if (!keyword) return this.reset(false)
        if (event.key !== 'Enter') {
            this.$empty.style.display = 'block'
            return
        }
        this.$hot_search.style.display = 'none'
        this.$history.style.display = 'none'

        this.insertLocalStorage('"' + keyword + '"')
        this.search(keyword)
    }
    insertLocalStorage(el) {
        let keywordArr = []
        if (localStorage.getItem('historyList')) {
            keywordArr = localStorage.getItem('historyList').replace(/\[(.*)\]/, '$1').split(',')
        }
        if (keywordArr.indexOf(el) === -1) {
            keywordArr.push(el)
        }
        this.insertHistory(keywordArr)
        localStorage.setItem('historyList', '[' + keywordArr + ']');
        return keywordArr
    }
    insertHistory(arr) {
        document.querySelector('.search_cont .hot_search_history .hot_search__bd').innerHTML = arr.map(item =>
            `<a class="hot_search__item c_txt1 c_bg2" href="javascript:;">${item.replace('\"','').replace('\"','')}</a>`).join('')
    }
    reset(deleteAll) {
        if (deleteAll) {
            this.$songs.innerHTML = ''
            this.$input.value = ''
            this.$hot_search.style.display = 'block'
            this.$history.style.display = 'block'
        }
        this.keyword = ''
        this.page = 1
        this.songs = []
        document.querySelector('.search_bar__empty ').style.display = 'none'
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
    deleteHistory() {
        let history = localStorage.getItem('historyList')
        if (history) {
            localStorage.removeItem('historyList')
            this.$history.style.display = 'none'
        }
    }
    cancel(event) {
        event.stopPropagation()
        this.$input.value = ''
        this.$el[0].classList.remove('focus')
        event.currentTarget.style.display = "none"
        this.$songs.innerHTML = ''
        this.$el[0].parentNode.nextElementSibling.style.display = 'block'
        this.$el[0].nextElementSibling.style.display = 'none'
    }
}