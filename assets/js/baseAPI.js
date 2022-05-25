// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// options中有$.get() 或 $.post() 或 $.ajax() 的所有配置参数 例：请求方式， url地址等等
$.ajaxPrefilter(function(options) {
    // console.log(options.url);// /api/login 
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);// http://www.liulongbin.top:3007/api/login


    // 统一为有权限的接口，设置 headers 请求头
    // /my 开头的才需要有权限
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    

    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // console.log('complete');
        // console.log(res);
        // console.log(res.responseJSON.status);
        // console.log(res.responseJSON.message);
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        // 这个可以阻止   未登录，想要跳转到后台页面的情况
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') { // 注意： 要用中文的‘！’
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = './login.html'
        }
    }
})