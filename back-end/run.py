from flask import Flask, request, render_template
import json
import pickle
from flask_cors import CORS
import os
import shutil

app = Flask(__name__, template_folder='./')

CORS(app)

def pysa(data):
    # data1 = "https://github.com/bufordtaylor/python-texttable"
    link = 'git clone '+ data +'.git'
    os.system(link)
    name = data.split('/')[-1]
    comd = 'python pysa ' + name + ' --multi'
    os.system(comd)
    shutil.rmtree(name)
    with open('call_graph.dot','r') as f:
        all_the_text = f.read()
    os.remove('call_graph.dot')
    return all_the_text

def pysa_local(data):
    lx = data.split('/')
    tmp = 'https://hub.fastgit.org'
    for i in lx[3:]:
        tmp = tmp + '/' + str(i)
    link = 'git clone '+ tmp +'.git'
    os.system(link)
    name = data.split('/')[-1]
    comd = 'python pysa ' + name + ' --multi' + ' --output ./demo.gv' 
    os.system(comd)
    shutil.rmtree(name)
    os.system('dot -Tsvg ./demo.gv -o ./static/demo.svg')
    

@app.route('/hi')
def hi():
    print("后台数据1111")
    return 'hi~'

#api接口前缀
apiPrefix = '/api/'

##################  Staff接口  ##################

@app.route(apiPrefix + 'codeGraph', methods=['POST'])
def updateStaff():
    print("后台数据2222: ")
    data = request.get_data(as_text=True)
    print("后端数据：",data)
    print('2222', type(data))
    print('3333', json.loads(data))
    text = pysa_local(json.loads(data))
    print('text: ', text)
    re = {
    'code': 0,
    'data':text,
    'message': "This is a test!"
    }

    return json.dumps(re)
    # return render_template('demo.html')


@app.route('/graph')
def index():
    
    return render_template('./demo.html')



if __name__=="__main__":
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True,use_reloader=True, port=5001, host='0.0.0.0')