import os
import shutil


data="https://github.com/bufordtaylor/python-texttable"
link='git clone '+str(data)+'.git'
os.system(link)
name= data.split('/')[-1]
comd='python pysa '+str(name)+' --multi'
os.system(comd)
shutil.rmtree(name) 
