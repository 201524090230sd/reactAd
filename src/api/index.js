import ajax from "./ajax";
import jsonp from 'jsonp'
//基础地址
const BASE = ''
//登录接口
export const reqLogin = (username, password) => ajax(BASE+'/login', {username, password}, 'POST')
//添加用户接口
export const reqAddUser = (user) => ajax(BASE+'/manage/user/add', user, 'POST')
//获取分类列表接口
export const reqCategorys = (parentId) => ajax(BASE+'/manage/category/list', {parentId})
//添加分类接口
export const reqCategoryAdd = (parentId, categoryName) => ajax(BASE+'/manage/category/add', {parentId, categoryName}, 'POST')
//更新分类接口
export const reqCategoryUpdate = (categoryId, categoryName) => ajax(BASE+'/manage/category/update', {categoryId, categoryName}, 'POST')
//用jsonp请求天气
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&ou
    tput=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
        console.log(url)
        console.log('jsonp()',err,data)
    })
} 
reqWeather('北京')
