import request from '@/utils/request'

//登录接口
export const reqLogin = (data) => request.post('/admin/acl/index/login', data)

//获取用户信息
export const reqUserInfo = () => request.get('/admin/acl/index/info')

//退出登录
export const reqLogout = () => request.post('/admin/acl/index/logout')
