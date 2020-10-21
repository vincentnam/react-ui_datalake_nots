#!/bin/bash
#PATH_REACT_FOLDER=/datalake/frontend/
PATH_REACT_FOLDER=/data/python-project/
sudo docker build -t react_gui .
sudo docker run -p 3000:3000 -v ${PATH_REACT_FOLDER}/react-ui_datalake_nots/:/app/ -it react_gui
