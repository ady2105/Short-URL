const shortid  = require('shortid')
const URL = require('../models/url')
const QRCode = require('qrcode')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body
    if(!body.url){
        return res.status(400).json({error: "URL is required!"})
    }

    const shortID = shortid.generate()
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],

    })
    return res.render("home", {
        id: shortID,
    })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({totalClicks: result.visitHistory.length,
        analytics: result.visitHistory})

}
async function handleGetURL(req, res) {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
            }, { $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    )
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
}

async function handleGetQR(req, res) {
    const shortId = req.params.shortId
    
    const url = await URL.findOne({shortId})
    if(!url){
        return res.status(404).json({
            error: "Short URL not found"
        })
    }
    const shortURL = `${req.protocol}://${req.get("host")}/${shortId}`

    const buffer = await QRCode.toBuffer(shortURL)
    res.set('Content-Type', 'image/png')
    res.send(buffer)
}


module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetURL,
    handleGetQR,
}