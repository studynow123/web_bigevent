$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称的长度必须在 1~6 个字符之间！'
            }
        }
    })

    initUserInfo()

    // 初始化用户的基本信息（获取用户的信息）
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户基本信息失败！')
                }
                console.log(res);
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 重新调用 获取用户信息的 initUserInfo()方法
        initUserInfo()
    })

    // 监听表单的提交事件   serialize()可以获取表单中已填写的所有数据 例：id,nickname,email等等
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 Ajax 数据请求
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')
                // 调用父页面(index.html)中的方法，重新渲染用户的头像和用户的信息     子页面(iframe标签页面)
                // 这里的window指的是iframe标签页面, window.parent指的是父页面(index.html)
                window.parent.getUserInfo()
            }
        })
    })
})