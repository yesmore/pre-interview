export function userInfoTemplate(returnInfo) {
  return `
    <ul>
      <li>姓名：<span class='__username'></span>${returnInfo.username || '未录入'}</span></li>
      <li>年龄：<span class='__age'>${returnInfo.age || '未录入'}</span></li>
      <li>邮箱：<span class='__email'>${returnInfo.email || '未录入'}</span></li>
      <li>电话：<span class='__tel'>${returnInfo.tel || '未录入'}</span></li>
    </ul>
  `
}