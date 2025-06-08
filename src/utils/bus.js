import { createApp } from 'vue';

 
// 创建一个事件总线对象
const eventBus = {
    events: {},
    // 监听事件的方法
    $on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    },
    // 触发事件的方法
    $emit(eventName, ...args) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(callback => callback(...args));
      }
    }
  };
  
  export default eventBus;