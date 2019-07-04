// components/wx-slider/wx-slider.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      value: 0
    },
    activeColor: {
      type: String,
      value: '#d81e06'
    },
    blockColor:{
      type: String,
      value: '#ffffff'
    },
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 1
    },
    step: {
      type: Number,
      value: 0.01
    },
    size: {
      type: Number,
      value: 14
    }
  },

  data: {

  },

  methods: {
    change(event) {
      this.triggerEvent('slider', event)
    }
  }
})