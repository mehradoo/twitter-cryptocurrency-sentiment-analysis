## Twitter Cryptocurrency Sentiment Analysis Using NLTK VADER

### Requirement
1. Node JS + NPM
2. Zeromq
3. Python + PIP
4. Twitter credentials, see https://apps.twitter.com

### Instructions
0. Copy tracking/credentials_sample.js to tracking/credentials.js and update the file with your Twitter credentials
1. docker build -t cryptosentiment .
2. docker run  -d -p 8080:3000 cryptosentiment
3. Open http://dockerhost_ip:8080/ in browser


### VADER
VADER (Valence Aware Dictionary and sEntiment Reasoner) is a lexicon and rule-based sentiment analysis tool that is specifically attuned to sentiments expressed in social media.
see https://github.com/cjhutto/vaderSentiment for more details

