(function() {
    const CONFIG = {
        trackingEndpoint: 'https://autr.1c.q56.dpdns.org/1/user_agent_logger.php',
        debug: false
    };

    function logError(message) {
        if (CONFIG.debug) {
            console.error('[Tracker Error]', message);
        }
    }

    function logInfo(message) {
        if (CONFIG.debug) {
            console.log('[Tracker Info]', message);
        }
    }

    // 获取完整的来路信息
    function getReferrer() {
        try {
            return document.referrer || 'Direct Access';
        } catch (error) {
            logError(`获取Referer失败: ${error.message}`);
            return 'Direct Access';
        }
    }

    // 创建跟踪请求
    function createTrackingRequest() {
        try {
            const trackingPixel = new Image();
            const timestamp = Date.now();
            
            // 构建参数
            const referrer = encodeURIComponent(getReferrer());
            const currentUrl = encodeURIComponent(window.location.href);
            
            // 发送请求（User-Agent会自动包含在HTTP头中）
            trackingPixel.src = `${CONFIG.trackingEndpoint}?t=${timestamp}&referer=${referrer}&page=${currentUrl}`;
            
            // 事件处理
            trackingPixel.onload = function() {
                logInfo('跟踪请求发送成功');
            };
            
            trackingPixel.onerror = function() {
                logError('跟踪请求发送失败');
            };
            
            return trackingPixel;
        } catch (error) {
            logError(`创建跟踪请求失败: ${error.message}`);
            return null;
        }
    }

    // 初始化跟踪
    function initTracking() {
        if (typeof window.Image !== 'function') {
            logError('Image对象不可用');
            return;
        }
        
        // 延迟执行，避免阻塞页面加载
        setTimeout(function() {
            createTrackingRequest();
        }, 500);
    }

    // 页面加载后初始化
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initTracking();
    } else {
        document.addEventListener('DOMContentLoaded', initTracking);
    }
})();