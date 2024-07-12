import { createApp, App } from 'vue';
import { createRouter, createWebHistory, RouterHistory, Router } from 'vue-router';
import AppCom from './App.vue'
import routes from './router';

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
  }
}

interface IRenderProps {
  container: Element | string;
}


let router: Router;
let instance: App<Element>;
let history: RouterHistory;

function render(props: IRenderProps) {
  const { container } = props;
  history = createWebHistory((window as any).__POWERED_BY_QIANKUN__ ? '/dbs' : '/');
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(AppCom);
  instance.use(router);
  instance.mount(typeof (container) === 'string' ? container : (container.querySelector("#app") as Element));
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({ container: '#app' });
}

export async function bootstrap() {
  console.log('%c vue3.0 app bootstraped', 'color: green;');
}

export async function mount(props: any) {
  console.log(props, '1233')
  render(props);
}

export async function unmount() {
  instance.unmount();
  if (instance._container) {
    instance._container.innerHTML = '';
  }
  history.destroy();
}
