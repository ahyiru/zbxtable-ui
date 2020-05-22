import {useRouter} from '@common';
import routers from './router';

import {routerCfg} from './configs';

const App=()=>{
  const {components}=useRouter({routers,...routerCfg});
  return components??null;
};

export default App;


