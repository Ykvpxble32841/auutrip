// 留言表单提交逻辑
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const content = document.getElementById('content').value;
    const statusDiv = document.getElementById('messageStatus');
    
    // 清空状态信息
    statusDiv.innerHTML = '';
    
    // 显示加载中
    statusDiv.innerHTML = '<p>提交中...</p>';
    
    // 发送数据到API
    fetch('https://a-site-domain.com/api.php', {  // 替换为A站的实际域名
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, content }),
        credentials: 'include'  // 确保发送cookie和认证信息
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            statusDiv.innerHTML = '<div class="success">留言提交成功！</div>';
            document.getElementById('messageForm').reset();
        } else {
            statusDiv.innerHTML = `<div class="error">提交失败: ${data.message}</div>`;
        }
    })
    .catch(err => {
        statusDiv.innerHTML = `<div class="error">提交失败: ${err.message}</div>`;
    });
});