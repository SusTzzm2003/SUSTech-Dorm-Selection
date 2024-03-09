## Introduction

[SUSTech-Dorm-Selection](https://github.com/SusTzzm2003/SUSTech-Dorm-Selection) is designed for graduate students at SUSTech (Southern University of Science and Technology) to help them with their dormitory selection. It is based on [ES2015+](https://es6.ruanyifeng.com/), [vue](https://cn.vuejs.org/index.html), [vuex](https://vuex.vuejs.org/zh-cn/), [vue-router](https://router.vuejs.org/zh-cn/), [vue-cli](https://github.com/vuejs/vue-cli) , [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element).

## Online Demo

[Preview](http://8.138.84.46/#/login?redirect=%2Fdashboard)

## Features

```
- Login / Logout

- Incorporate campus elements into UI design

- Video background

- Global Features
  - Dynamic sidebar (supports multi-level routing)
  - Dynamic breadcrumb

 - Student Functional Features 
  - View and filter available rooms.
  - Join a team with other students.
  - A room bookmarking module.
  - A commenting module.
  - A online communication module.
  - A dormitory selection module that opens at specified times, allowing selection by teams.
  - A notification module for comment and team-related information.

- Faculty Functional Features
  - Enable faculty to upload or modify dormitory-related information.
  - Support user management, allowing manual addition, deletion, and modification of individual student users.
  - Bulk import of student information and account creation through tables.
  - Set dormitory selection timeframes. 
  - Provide the ability to export dormitory selection data.

- Permission Authentication
  - Page permission
  
- Excel
  - Upload Excel
  - Export Excel

```

## Getting started
You need to install [node](https://nodejs.org/) and [git](https://git-scm.com/) locally.
```bash
# clone the project
git clone https://github.com/SusTzzm2003/SUSTech-Dorm-Selection.git

# enter the project directory
cd SUSTech-Dorm-Selection

# install dependency
npm install

# develop
npm run dev
```

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

## License

[MIT](https://github.com/SusTzzm2003/SUSTech-Dorm-Selection/blob/master/LICENSE)