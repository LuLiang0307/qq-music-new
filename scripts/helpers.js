import { LYRICS_URL, SEARCH_URL } from './constants.js'

export function lyricsUrl(songid) {
    return `${LYRICS_URL}?id=${songid}`
}

export function songUrl(id) {
    return `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/RS02${id}.mp3?guid=1872529262&vkey=12396C833162E332C65C02D264A1C711688A8B09EA5EE4E5E365B0C06DBE280F0D212208BE3FB9FDBD8AE82D228D7A2BB3B62A13847EC8B6&uin=0&fromtag=38`
}
export function albumCoverUrl(id) {
    return `//y.gtimg.cn/music/photo_new/T002R300x300M000${id}.jpg`
}
export function searchUrl(keyword, page) {
    return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
}