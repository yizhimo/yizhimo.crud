// 操作文件中的数据,只处理,不关心业务

var fs = require('fs')
var dbPath = './db.json'

//获取所有学生列表
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)   //第一个参数是err,第二个是data,转为对象,调用students
    })
}
//根据id获取学生信息对象
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function(item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

//添加保存学生
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return callback(err)
        }
        var students =JSON.parse(data).students
        student.id = students[students.length - 1].id + 1  //处理新加数据的id(唯一的)

        students.push(student)                           //保存新加数据
        var fileData = JSON.stringify({                  //把对象数据转换成字符串
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {   //把对象数据写入db.json中
            if(err) {
                return callback(err)
            }
            callback(null)           //成功就没错 err为null
        })
    })
}

//修改学生
exports.updateById = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        student.id = parseInt(student.id)               //存之前要把id转成数字类型在存进去
        var stu = students.find(function(item) {
            return item.id === student.id
        })
        for(var key in student) {
            stu[key] = student[key]
        }

        var fileData = JSON.stringify({                  //把对象数据转换成字符串
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {   //把对象数据写入db.json中
            if(err) {
                return callback(err)
            }
            callback(null)                               //成功就没错 err为null
        })
    })
}

//删除学生
exports.deleteById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if(err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        var deleteId = students.findIndex(function(item) {
                            //根据条件查找元素下标
            return item.id === parseInt(id)
        })
        students.splice(deleteId, 1)       //删除自己

        //删除后重写数据
        var fileData = JSON.stringify({                  //把对象数据转换成字符串
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {   //把对象数据写入db.json中
            if(err) {
                return callback(err)
            }
            callback(null)                               //成功就没错 err为null
        })
    })
}
