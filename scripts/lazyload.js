export function lazyload(images) {
    // console.log(images)//这样获取的节点的prototype是NodeList类型的
    let imgs = [].slice.call(images || document.querySelectorAll('.lazyload')) //转成array类型，或者用Array.from(images),不过这个是ES6的语法

    if ('IntersectionObserver' in window) {
        let observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {

                    loadImage(entry.target, () => {
                        observer.unobserve(entry.target)
                    })
                }
            })
        }, { threshold: 0.01 })

        imgs.forEach(img => observer.observe(img))
    } else {
        let onscroll = throttle(function() {
            if (imgs.length === 0) {
                return window.removeEventListener("scroll", onscroll); //如果不存在这样的
            }
            imgs = imgs.filter(img => img.classList.contains("lazyload")); //只对含有lazyload的元素进行判断
            imgs.forEach((img) => {
                if (inViewport(img)) {
                    loadImage(img)
                }
            })
        }, 300)
        let isTouchDevice = 'ontouchstart' in document.documentElement;
        if (isTouchDevice) {
            window.addEventListener('touchmove', onscroll)
            window.dispatchEvent(new Event('touchmove'))
        } else {
            window.addEventListener('mouseup', onscroll)
            window.dispatchEvent(new Event('mouseup'))
        }
    }
}

function throttle(func, wait) {
    let prev, timer
    return function fn() {
        let curr = Date.now();
        let diff = curr - prev
        if (!prev || diff >= wait) { //如果是第一次进来，或者是需要运行func
            func()
            prev = curr
        } else if (diff < wait) { //还没到执行func的时候，创建timer
            window.clearTimeout(timer) //清除之前设置的timer
            timer = setTimeout(fn, wait - diff);
        }
    }
}

function inViewport(img) {
    let vpWidth = document.documentElement.clientWidth;
    let vpHeight = document.documentElement.clientHeight;
    let { top, bottom, left, right } = img.getBoundingClientRect()
    return (
        (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
        (left > 0 && left < vpWidth || right > 0 && right < vpWidth) //top和left在屏幕中，返回的是true
    )
}

function loadImage(img) {
    let image = new Image()
    image.src = img.dataset.src
    image.onload = function() {
        img.src = image.src
        img.classList.remove('lazyload')
    }
}