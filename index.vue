<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>字母序列回忆任务</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <h2>实验规则</h2>
      <p>请在正式实验前,选择正式试验和保存历史记录的复选框,以便实验后进行数据分析. 当准备好开始实验时,请点击开始按钮,按照以下规则进行答题.</p>
      <p>在按下开始键后你会听到一串字母序列的语音和一定长度的自然语音,之后你会听到一声短暂的中频提示音,请在听到中频提示音后,在输入框中重新输入听到的字母序列,并尽可能保证序列的正确性.</p>
      <p>预计有80个单词,请耐心答题以保障正确性.在第一轮实验任务完成后,可以适当休息,然后请刷新页面进行重测</p>
      
      <ion-button @click="playSound(700, 1)">正确提示音测试</ion-button>
      <ion-button @click="playSound(450, 1.5)">开始作答提示音测试</ion-button>
      <ion-button @click="playSound(200, 2)">错误提示音测试</ion-button>
      
      <ion-checkbox v-model="preferenceCheckbox">正式模式(错误后实验将继续进行)</ion-checkbox>
      <ion-checkbox v-model="saveHistory">保存历史记录 (将实验数据保存在本地)</ion-checkbox>
      
      <ion-button @click="start()">开始</ion-button>
      <ion-button @click="outputHistory()">导出历史记录</ion-button>
      
      <label>Type the word you heard:</label>
      <ion-input v-model="userInput" @keydown="checkEnter"></ion-input>
      
      <p>为了良好体验,请使用google chrome, firefox, microsoft edge 等主流浏览器</p> 
      <p>&copy; 2024 tianzeshi_study. All rights reserved.</p>
    </ion-content>
  </ion-page>
</template>


<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCheckbox, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import * as MyScripts from './script.js';  // 导入外部的 JavaScript 文件

export default defineComponent({
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCheckbox, IonInput },
  data() {
    return {
      preferenceCheckbox: false,
      saveHistory: false,
      userInput: ''
    };
  },
  methods: {
    playSound(frequency, duration) {
      MyScripts.playSound(frequency, duration);  // 调用外部 JavaScript 文件中的函数
    },
    start() {
      MyScripts.start();  // 调用外部 JavaScript 文件中的函数
    },
    outputHistory() {
      MyScripts.outputHistory();  // 调用外部 JavaScript 文件中的函数
    },
    checkEnter(event) {
      if (event.key === 'Enter') {
        MyScripts.checkEnter(event);  // 调用外部 JavaScript 文件中的函数
      }
    }
  }
});
</script>

<style scoped>
/* 添加样式 */
@import 'styles.css'; /* 导入样式文件 */
</style>