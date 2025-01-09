import { defineConfig } from '@umijs/max';  
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {}, 
  locale: {
    default: 'zh-TW',
    baseSeparator: '-',
  },
  routes: [ 
    {
      name: ' readingBox list  ',
      path: '/readingbox/list',
      component: './ReadingBox/list',
      layout: false, 
    },       
    {
      name: ' SDGs ReadingBox EDIT  ',
      path: '/readingbox/edit',
      component: './ReadingBox/edit',
      layout: false, 
    },
    {
      name: ' SDGs ReadingBox Setting  ',
      path: '/readingbox/setting',
      component: './ReadingBox/setting',
      layout: false, 
    },  
    {
      name: ' SDGs ReadingBox policy  ',
      path: '/readingbox/policy',
      component: './ReadingBox/policy',
      layout: false, 
    },  
    {
      name: ' SDGs ReadingBox addbook  ',
      path: '/readingbox/addbook',
      component: './ReadingBox/addbook',
      layout: false, 
    },    
    {
      name: ' SDGs ReadingBox orderlist  ',
      path: '/readingbox/orderlist',
      component: './ReadingBox/orderlist',
      layout: false, 
    },  
    {
      name: ' SDGs ReadingBox returnbook  ',
      path: '/readingbox/returnbook',
      component: './ReadingBox/returnbook',
      layout: false, 
    }, 
    {
      name: ' SDGs ReadingBox lend  ',
      path: '/readingbox/lend',
      component: './ReadingBox/lend',
      layout: false, 
    }, 
    {
      name: ' SDGs ReadingBox lendsearch  ',
      path: '/readingbox/lendsearch',
      component: './ReadingBox/lendsearch',
      layout: false, 
    },    
    {
      name: ' SDGs SDGsTalk EDIT  ',
      path: '/sdgstalk/edit',
      component: './SDGsTalk/edit',
      layout: false, 
    }, 
    {
      name: ' SDGs SDGskeyword EDIT  ',
      path: '/sdgskeyword/edit',
      component: './SDGsKeyword/edit',
      layout: false, 
    },  
    {
      name: ' SDGs SDGskeyword Add  ',
      path: '/sdgskeyword/add',
      component: './SDGsKeyword/add',
      layout: false, 
    },    
    {
      name: ' SDGs SDGsAction  ',
      path: '/sdgs/sdgsaction',
      component: './SDGs/sdgsaction',
      layout: false, 
    } ,  
    {
      name: ' SDGs SDGsKeywd ',
      path: '/sdgs/sdgskeywd',
      component: './SDGs/sdgskeywd',
      layout: false, 
    } ,  
    {
      name: ' SDGs SDGsItem  ',
      path: '/sdgs/sdgstalk',
      component: './SDGs/sdgstalk',
      layout: false, 
    }   ,  
    {
      name: ' SDGs fileupload  ',
      path: '/sdgs/fileupload',
      component: './SDGs/fileupload',
      layout: false, 
    }   ,  
    {
      name: ' SDGs bagupload  ',
      path: '/sdgs/bagupload',
      component: './SDGs/bagupload',
      layout: false, 
    } , 
    {
      name: ' SDGs import ',
      path: '/import',
      component: './Import',
      layout: false, 
    } 
  ],
  npmClient: 'npm',
  base:'/HyLibMain/hylibreadingbox/',
  publicPath:'/HyLibMain/hylibreadingbox/',
});

