from nltk.sentiment.vader import SentimentIntensityAnalyzer
from zerorpc import Server

sid = SentimentIntensityAnalyzer()

class NltkRPC(object):
    def sentiment(self, name):
        return sid.polarity_scores(name)

s = Server(NltkRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()
