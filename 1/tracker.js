/**
 */
(function() {
    // 配置参数
    const CONFIG = {
        trackingEndpoint: 'https://autr.1c.q56.dpdns.org/1/user_agent_logger.php',
        debug: false // 设置为true可在控制台查看调试信息
    };

    // 记录错误信息
    function logError(message) {
        if (CONFIG.debug) {
            console.error('[Tracker Error]', message);
        }
    }

    // 记录信息
    function logInfo(message) {
        if (CONFIG.debug) {
            console.log('[Tracker Info]', message);
        }
    }

    // 创建跟踪请求
    function createTrackingRequest() {
        try {
            const trackingPixel = new Image();
            const timestamp = Date.now();
            
            // 添加随机参数防止缓存
            trackingPixel.src = `${CONFIG.trackingEndpoint}?t=${timestamp}`;
            
            // 可选：添加当前页面URL作为参数
            const currentUrl = encodeURIComponent(window.location.href);
            trackingPixel.src += `&page=${currentUrl}`;
            
            // 事件处理
            trackingPixel.onload = function() {
                logInfo('Tracking request sent successfully');
            };
            
            trackingPixel.onerror = function() {
                logError('Failed to send tracking request');
            };
            
            return trackingPixel;
        } catch (error) {
            logError(`Error creating tracking request: ${error.message}`);
            return null;
        }
    }

    // 页面加载完成后执行跟踪
    function initTracking() {
        if (typeof window.Image !== 'function') {
            logError('Image constructor not supported');
            return;
        }
        
        // 延迟执行以避免阻塞页面加载
        setTimeout(function() {
            createTrackingRequest();
        }, 500);
    }

    // 初始化跟踪
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initTracking();
    } else {
        document.addEventListener('DOMContentLoaded', initTracking);
    }
})();