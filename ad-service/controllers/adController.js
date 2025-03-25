const Ad = require('../models/Ad');
const crypto = require('crypto'); 


function generateETag(data) {
  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
}

exports.createAd = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const ad = await Ad.create({ title, description, price });
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.findAll();
    const data = JSON.stringify(ads);
    const etag = generateETag(data);
    const lastModified = new Date(Math.max(...ads.map(ad => ad.updatedAt))).toUTCString();

    
    if (req.headers['if-none-match'] === etag || 
        req.headers['if-modified-since'] === lastModified) {
      return res.status(304).end();
    }

   
    res.setHeader('Cache-Control', 'public, max-age=0');
    res.setHeader('ETag', etag);
    res.setHeader('Last-Modified', lastModified);
    
    

    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);
   
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    const data = JSON.stringify(ad);
    const etag = generateETag(data);
    const lastModified = new Date(ad.updatedAt).toUTCString();

   
    if (req.headers['if-none-match'] === etag || 
        req.headers['if-modified-since'] === lastModified) {
      return res.status(304).end();
    }

    
    res.setHeader('Cache-Control', 'public, max-age=0');
    res.setHeader('ETag', etag);
    res.setHeader('Last-Modified', lastModified);


    console.log("dada",ad);


    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

exports.updateAd = async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    await ad.update(req.body);
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);
    console.log("dada",ad);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    await ad.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};