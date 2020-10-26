#!/bin/bash
PATH_REACT_FOLDER=${pwd}
sudo docker build -t react_gui .
sudo docker run -p 3000:3000 -v ${PATH_REACT_FOLDER}:/app/ -it react_gui
