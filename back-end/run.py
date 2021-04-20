from flask import Flask, request, render_template
import json
import pickle
from flask_cors import CORS
import os
import shutil

link_list = []

app = Flask(__name__, template_folder='./')

CORS(app)

def pysa(data):
    # data1 = "https://github.com/bubbliiiing/yolo3-pytorch"
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

    dot = data['newDot']
    options = data['options']

    lx = dot.split('/')
    path = '/home/vcp/wenlan/graphviz-react/demo/back-end/'
    path += lx[-1]

    if os.path.exists(path):
        name = lx[-1]
        comd = 'python pysa ' + name + ' --output ./demo.gv' + ' --file_num ' + str(options['fileNum'])
        if options['noEdges']:
            comd += ' --no_edges '
        if options['cluster']:
            comd += ' --cluster '
        if options['community']:
            comd += ' --community '
        if options['folderCalls']:
            comd += ' --Folder_calls '      
        comd += " --" 
        comd +=  options['func']
        print('comd: ', comd)
        os.system(comd)
        if options['engine'] =='dot':
            os.system('dot -Tsvg ./demo.gv -o ./static/demo.svg')
        else:
            os.system('twopi -Tsvg ./demo.gv -o ./static/demo.svg')
    else:
        
        name = lx[-1]
        print('name: ', name)
        print('link_list1: ', link_list)

        if link_list != [] and name not in link_list:
            lin = link_list.pop(0)
            shutil.rmtree(lin)

        link_list.append(name)
        print('link_list: ', link_list)
            
        tmp = 'https://hub.fastgit.org'
        for i in lx[3:]:
            tmp = tmp + '/' + str(i)    
        link = 'git clone '+ tmp +'.git'
        os.system(link)

        comd = 'python pysa ' + name + ' --output ./demo.gv' + ' --file_num ' + str(options['fileNum'])
        if options['noEdges']:
            comd += ' --no_edges '
        if options['cluster']:
            comd += ' --cluster '
        if options['community']:
            comd += ' --community '
           
        if options['folderCalls']:
            comd += ' --Folder_calls '    
        comd += " --" 
        comd +=  options['func']
        print('comd: ', comd)
        os.system(comd)
        # shutil.rmtree(name)
        if options['engine'] =='dot':
            os.system('dot -Tsvg ./demo.gv -o ./static/demo.svg')
        else:
            os.system('twopi -Tsvg ./demo.gv -o ./static/demo.svg')
    

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