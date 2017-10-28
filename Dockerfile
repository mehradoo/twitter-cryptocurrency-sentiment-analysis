FROM ubuntu

# Install Python, Node and Curl
RUN \
  apt-get update && \
  apt-get install -y curl && \
  curl --silent --location https://deb.nodesource.com/setup_7.x | bash - && \
  apt-get install -y build-essential libtool autoconf automake uuid-dev && \
  apt-get install -y python python-dev python-pip python-virtualenv && \
  apt-get install -y nodejs

# install NLTK and download NLTK data
RUN \
  pip install -U nltk && \
  python -m nltk.downloader vader_lexicon

# install zerorpc and zmq
RUN \
  pip install pyzmq && \
  pip install -U zerorpc && \
  apt-get install -y libzmq-dev
#  apt-get install libzmq3-dbg libzmq3-dev libzmq3 && \
#  npm install zmq -g --unsafe-perm=true

COPY /nltk-bridge /data/nltk-bridge
COPY /tracking /data/tracking
COPY /start.sh /data/


WORKDIR /data/tracking
RUN npm install

WORKDIR /data

EXPOSE 3000

ENTRYPOINT ["bash", "./start.sh"]
#ENTRYPOINT ["top", "-b"]
