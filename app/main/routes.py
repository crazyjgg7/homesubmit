import os
import time
import random
import hashlib
from flask import render_template, request, jsonify, send_file
from werkzeug.utils import secure_filename
from app.main import main
import pandas as pd
import requests
from io import BytesIO

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/submit/file', methods=['POST'])
def submit_file():
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': '没有文件被上传'})
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({'success': False, 'error': '没有选择文件'})
            
        filename = secure_filename(file.filename)
        file_path = os.path.join('uploads', filename)
        os.makedirs('uploads', exist_ok=True)
        file.save(file_path)
        
        return jsonify({
            'success': True,
            'message': '文件上传成功',
            'filename': filename
        })
    except Exception as e:
        return jsonify({'success': False, 'error': f'文件上传失败：{str(e)}'})