class Search {
    constructor(el) {
        this.$el = el
        this.$input = this.$el[0].querySelector("#search")
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        this.keyword = ''
        this.page = 1
        this.perpage = 20
    }
    onKeyUp(event) {
        let keyword = event.target.value.trim()
        if (event.key !== 'Enter') return
        this.search(keyword)
    }
    search(keyword) {
        console.log(keyword)
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