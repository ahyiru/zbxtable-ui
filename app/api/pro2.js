const apis={
  dashboard:{
    login:{
      url:'/login',
      method:'post',
    },
    info:{
      url:'/manager/info',
      method:'post',
    },
    index:{
      url:'/index',
    },
    trigger:{
      url:'/trigger',
    },
    logout:{
      url:'/logout',
      method:'post',
    },
  },
  host:{
    host:{
      url:'/host',
    },
    host_groups:{
      url:'/host_group',
    },
    template:{
      url:'/template',
    },
    list:{
      url:`/host_group/list`,
    },
    subList:id=>({
      url:`/host_group/list/${id}`,
    }),
    target:{
      url:`/item/list`,
      method:'post',
    },
    graph:{
      url:'/graph',
      method:'post',
    },
  },
  report:{
    history:{
      url:'/export/history',
      method:'post',
    },
    trend:{
      url:'/export/trend',
      method:'post',
    },
    inspect:{
      url:'/export/inspect',
      method:'post',
    },
  },
  alarm:{
    alarm:{
      url:'/alarm',
    },
  },
  system:{
    license:{
      url:'/license',
    },
    chpwd:{
      url:'/manager/chpwd',
      method:'post',
    },
  },
};

export default apis;





