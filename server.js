const express = require('express');
const request = require('request-promise');
const cors = require('cors')
const app = express();

const HEADERS = {
    'authority': "u.y.qq.com",
    'accept': "application / json",
    'user-agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    'origin': "https://i.y.qq.com",
    'referer': "https://i.y.qq.com/",
}
app.use(cors())
app.get('/', async(req, res) => {
    const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${+new Date()}&data={"comm":{"g_tk":1775699468,"uin":2313970630,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"playSongAd":{"module":"SongPlay.SongPlayBaseServer","method":"GetPlaySongAd","param":{"channel":3,"app_user":1,"platform":2,"forbid":0,"share_musicid":"","encodetype":1,"adtype":8}}}`
    try {
        res.json(await request({
            url: url,
            json: true,
            headers: HEADERS
        }))
    } catch (e) {
        res.json({ error: e.massage })
    }

})

// app.get('/rec', async(req, res) => {
//     const url = `https://i.y.qq.com/n2/m/index.html?tab=recommend`
//     try {
//         res.json(await request({
//             url: url,
//             json: true,
//             headers: HEADERS
//         }))
//     } catch (e) {
//         res.json({ error: e.massage })
//     }

// })
app.get('/rank', async(req, res) => {
    const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${+new Date()}&data={"comm":{"g_tk":1775699468,"uin":2313970630,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0},"topList":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}}`
    try {
        res.json(await request({
            url: url,
            json: true,
            headers: HEADERS
        }))
    } catch (e) {
        res.json({ error: e.massage })
    }

})
app.get('/search', async(req, res) => {
    const { keyword, page = 1 } = req.query
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=${+new Date()}&g_tk=5381&uin=&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all`
    try {
        res.json(await request({
            url: url,
            json: true,
            headers: HEADERS
        }))
    } catch (e) {
        res.json({ error: e.massage })
    }
})
app.get('/lyrics', async(req, res) => {
    let { id, type = 0 } = req.query
    const url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=1775699468&uin=2313970630&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&g_tk_new_20200303=1775699468&nobase64=1&musicid=${id}&songtype=${type}&_=${+ new Date()}`
    try {
        let text = (await request({
            url: url,
            json: true,
            headers: HEADERS
        })).replace(/MusicJsonCallback\((.*)\)/, '$1')
        res.json(JSON.parse(text))
    } catch (e) {
        res.json({ error: e.massage })
    }
})
app.listen(4000)