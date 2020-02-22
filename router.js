var fs = require('fs')
var express = require('express')

var Students = require('./students')      //导入处理数据的js students.js

var router = express.Router()

//渲染首页
router.get('/students', function(req, res) {

    // fs.readFile('./db.json', 'utf8', function(err, data) {
    //     if(err) {
    //         return res.status(500).send('Server error')
    //     }
    //     res.render('index.html', {
    //         students: JSON.parse(data).students
    //     })
    // })                                                //使用下面回调函数

    Students.find(function(err, students) {
        if(err) {
            return res.status(500).send('Server error')
        }
        res.render('index.html', {
            students: students
        })
    })
}) 

//渲染添加学生页面
router.get('/students/new', function(req, res) {
    res.render('new.html')
})

//处理添加学生请求
router.post('/students/new', function(req, res) {
    //获取数据信息 处理 发送响应
    Students.save(req.body, function(err) {
        if(err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')                       //保存数据后,返回首页
    })
})

//渲染编辑页面
router.get('/students/edit', function(req, res) {
    //客户端a链接需要id参数,获取id,渲染编辑页面
    Students.findById(parseInt(req.query.id), function(err, students) {
                    //req.query.id这是字符串,得转成数字类型
        if(err) {
            return res.status(500).send('Server error')
        }
        res.render('edit.html', {
            students: students
        })
    })
})

//处理编辑学生
router.post('/students/edit', function(req, res) {
    //获取表单数据(req.body),更新(Students.updateById()),发送响应
    Students.updateById(req.body, function(err) {
        if(err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

//处理删除学生
router.get('/students/delete', function(req, res) {
    //获取要删除得id,根据id执行删除操作,根据结果发送响应
    Students.deleteById(req.query.id, function(err) {
        if(err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})


module.exports = router   //导出