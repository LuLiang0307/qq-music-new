import { LYRICS_URL, SEARCH_URL } from './constants.js'

export function lyricsUrl(songid) {
    return `${LYRICS_URL}?id=${songid}`
}

export function songUrl(id) {
    return `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/RS02${id}.mp3?guid=1872529262&vkey=64BBCDE79619C711BDD2658ACCD5AEA58C161327AA928CA8EBDCB045288F6FE96185F37CCE4E71BB9250BB71315C2E278012FA4F156AB6E4&uin=0&fromtag=38`
}
export function albumCoverUrl(id) {
    return `//y.gtimg.cn/music/photo_new/T002R300x300M000${id}.jpg`
}
export function searchUrl(keyword, page) {
    return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
}