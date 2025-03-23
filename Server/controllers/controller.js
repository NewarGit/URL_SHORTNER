import { generateBase62ShortCode } from '../utils.js';
import Url from '../models/schema.js';
import validUrl from 'valid-url'


// TODO -> TRY and Catch Block

const createUrl = async (req, res) => {
    let { longUrl } = req.body;
    const customAlias = req.query.alias;

    if (!/^https?:\/\//i.test(longUrl)) {
        longUrl = 'https://' + longUrl;
    }

    if (!longUrl || !validUrl.isWebUri(longUrl))
        return res.status(400).json({ error: 'Invalid or missing long URL' });


    if (customAlias) {
        const aliasExists = await Url.findOne({ shortCode: customAlias });
        if (aliasExists) {
            return res.status(409).json({ error: "Custom alias is already taken" });
        }

        const newCustomUrl = new Url({
            originalUrl: longUrl,
            shortCode: customAlias
        });

        await newCustomUrl.save();

        return res.json({ shortUrl: `${process.env.GATEWAY_URL}/${customAlias}` });
    }

    let existing = await Url.findOne({ originalUrl: longUrl });
    if (existing) {
        return res.json({ shortUrl: `${process.env.GATEWAY_URL}/${existing.shortCode}` });
    }

    const shortCode = generateBase62ShortCode(longUrl);

    const newUrl = new Url({
        originalUrl: longUrl,
        shortCode
    });

    await newUrl.save();

    res.json({ shortUrl: `${process.env.GATEWAY_URL}/${shortCode}` });
}


const redirectUrl = async (req, res) => {
    const { code } = req.params;

    const url = await Url.findOne({ shortCode: code });
    if (url) {
        url.clicks++;
        await url.save();
        return res.redirect(url.originalUrl);
    } else {
        return res.status(404).json({ error: 'URL Not Found' });
    }
}

export { createUrl, redirectUrl };