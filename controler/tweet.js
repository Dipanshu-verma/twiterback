const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { TweetModel } = require("../modal/TweetModel");
dotenv.config();
const twiterRouter = express.Router();
const SCRET_KEY_TOKEN = process.env.TOKEN_SECRET_KEY 


 
twiterRouter.post('/tweets', async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No token provided' });
          }

          const decoded = jwt.verify(token, SCRET_KEY_TOKEN);

          if (decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
          }

          const user = decoded.userId
          const userobj  = req.body 
          const tweet =  {...userobj,user}
      const newTweet = await TweetModel.create(tweet);
      res.status(201).json(newTweet);
    } catch (error) {
 
      res.status(400).json({ error: error.message });
    }
  });
  
  twiterRouter.get('/tweets', async (req, res) => {
    try {
      const categoryFilter = req.query.category;
  
      
      const tweets = categoryFilter
        ? await TweetModel.find({ category: categoryFilter })
        : await TweetModel.find();
  
      res.status(200).json(tweets);
    } catch (error) {
       
      res.status(500).json({ error: error.message });
    }
  });


  twiterRouter.put('/tweets/:id', async (req, res) => {
  try {
    
  
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
      }

      const decoded = jwt.verify(token, SCRET_KEY_TOKEN);

      if (decoded) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }
      const tweet = await TweetModel.findById(req.params.id);
      const user = decoded.userId
    
    if (tweet.user.toString() !== user) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    
    await TweetModel.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ message: 'Tweet updated successfully' });
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

twiterRouter.put('/tweets/:id', async (req, res) => {
    try {
      
    
      const token = req.headers.authorization;
  
      if (!token) {
          return res.status(401).json({ error: 'Unauthorized - No token provided' });
        }
  
        const decoded = jwt.verify(token, SCRET_KEY_TOKEN);
  
        if (decoded) {
          return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        const tweet = await TweetModel.findById(req.params.id);
        const user = decoded.userId
      
      if (tweet.user.toString() !== user) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      
      await TweetModel.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: 'Tweet deleted successfully' });
    } catch (error) {
      
      res.status(500).json({ error: error.message });
    }
  });

 
module.exports = { twiterRouter };

