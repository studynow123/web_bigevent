// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// options中有$.get() 或 $.post() 或 $.ajax() 的所有配置参数 例：请求方式， url地址等等
$.ajaxPrefilter(function(options) {
    // console.log(options.url);// /api/login 
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);// http://www.liulongbin.top:3007/api/login
})