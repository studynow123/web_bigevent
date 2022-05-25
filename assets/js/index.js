$(function() {
    // 调用 getUserInfo 获取用户的基本信息
    getUserInfo()

    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnOut').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //点击了confirm弹出框的确认按钮，就会执行下面的代码
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = './login.html'

            // 关闭 confirm 询问框(弹出框)
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers 就是请求头配置对象 注意是小写的h开头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 调用 rederAvatar 渲染用户的头像
            rederAvatar(res.data)
        },
        // 无论成功还是失败，最终都会调用 complete 回调函数
        // complete: function(res) {
        //     // console.log('complete');
        //     // console.log(res);
        //     // console.log(res.responseJSON.status);
        //     // console.log(res.responseJSON.message);
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     // 这个可以阻止   未登录，想要跳转到后台页面的情况
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') { // 注意： 要用中文的‘！’
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //         location.href = './login.html'
        //     }
        // }
    })
}

// 渲染用户的头像
function rederAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase() // toUpperCase() 大写
        $('.text_avatar').html(first).show()
    }
}