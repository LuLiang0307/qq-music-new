/*通过事件委托的方式实现，只要在html定义好data-role，data-view就可以实现*/

document.addEventListener('click', function(e) { //监听点击事件
    // lazyload(document.querySelectorAll(".lazyload"))

    let target = e.target;
    /*添加tab点击效果*/
    if (target.dataset.role !== "tab") { //如果不是tab就return
        return;
    } else {
        [].forEach.call(target.parentElement.parentElement.children, tab => {
            tab.classList.remove('current');
            tab.classList.remove('c_txt3');
        })
        target.parentElement.classList.add('current');
        target.parentElement.classList.add('c_txt3');
    }
    /*tab切换页面变化效果*/
    let content = document.querySelector(target.dataset.view) //找到页面上跟这两个点击事件对应的模块
    if (content) { //如果存在，先把所有的隐藏再显示应该显示的那个
        let tabs = document.querySelectorAll(".tab-cont");
        [].forEach.call(tabs, child => {
            child.style.display = "none" //隐藏所有
        })
        content.style.display = "block"; //显示需要显示的部分
    }
})