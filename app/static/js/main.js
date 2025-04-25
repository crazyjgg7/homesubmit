function showMessage(message, type) {
    const messageArea = document.getElementById('message');
    messageArea.textContent = message;
    messageArea.className = `message-area ${type}`;
}

function handleFileSelect(input) {
    const file = input.files[0];
    if (file) {
        document.getElementById('fileName').textContent = file.name;
        showMessage('已选择文件：' + file.name, 'info');
    }
}

function submitFile() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files[0]) {
        showMessage('请先选择文件！', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    
    showMessage('正在上传...', 'info');
    
    fetch('/submit/file', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage(data.message, 'success');
            fileInput.value = '';
            document.getElementById('fileName').textContent = '未选择文件';
        } else {
            showMessage('上传失败：' + data.error, 'error');
        }
    })
    .catch(error => {
        showMessage('请求失败：' + error, 'error');
    });
}