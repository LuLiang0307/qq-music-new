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
    const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${+new Date()}&data={%22comm%22:{%22g_tk%22:5381,%22uin%22:%22%22,%22format%22:%22json%22,%22inCharset%22:%22utf-8%22,%22outCharset%22:%22utf-8%22,%22notice%22:0,%22platform%22:%22h5%22,%22needNewCode%22:1},%22playSongAd%22:{%22module%22:%22SongPlay.SongPlayBaseServer%22,%22method%22:%22GetPlaySongAd%22,%22param%22:{%22channel%22:3,%22app_user%22:1,%22platform%22:2,%22forbid%22:0,%22share_musicid%22:%22%22,%22encodetype%22:1,%22adtype%22:8}}}`
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
    /* 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=1614270407437&g_tk=5381&uin=&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=lironghao&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all' \
      -H 'authority: c.y.qq.com' \
      -H 'accept: application/json' \
      -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1' \
      -H 'origin: https://i.y.qq.com' \
      -H 'sec-fetch-site: same-site' \
      -H 'sec-fetch-mode: cors' \
      -H 'sec-fetch-dest: empty' \
      -H 'referer: https://i.y.qq.com/' \
      -H 'accept-language: zh-CN,zh;q=0.9' \
      -H 'cookie: pgv_pvi=4653073408; RK=HMzAmiIzz8; ptcz=a64098c19fbe89a864904b9d0416fe2f9d15402968035c17cef86d20b3de0000; pgv_pvid=1872529262; ts_uid=5751720158; fqm_pvqid=fad15ef3-c4d2-415b-a12f-c39aba591959; yqq_stat=0; pgv_info=ssid=s9065095023; pac_uid=0_f727a2ba44d71; ts_refer=ADTAGmyqq' \
      --compressed
      */