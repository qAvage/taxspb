import { createApp } from "vue/dist/vue.esm-browser.prod"
// import { load } from 'recaptcha-v3'
import { gsap } from "gsap"
import { IMaskDirective } from 'vue-imask';
import axios from 'axios'


// Calculator app

createApp({
  name: 'Calculator',
  data () {
    return {
      hours: 22800,
      days: 5,
      tweenedNumber: 0
    }
  },
  watch: {
    number(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue })
    }
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0)
    },
    number() {
      return this.hours * this.days
    }
  },
  mounted () {
    this.tweenedNumber = this.hours * this.days
  }
})
  .mount('#calculator')

// Mobile menu

const header = document.getElementById('header')
const burger = document.getElementById('burger')
const overlay = document.getElementById('overlay')
const navLinks = document
  .getElementById('nav-main')
  .querySelectorAll('li, .ui-button')

const closeMenu = () => {
  header.classList.remove('open')
  document.body.style.overflow = 'visible'
}

burger.onclick = () => {
  const isOpen = header.classList.contains('open')
  if (!isOpen) {
    header.classList.add('open')
    document.body.style.overflow = 'hidden'
  } else {
    closeMenu()
  }
}

overlay.onclick = () => {
  closeMenu()
}

navLinks.forEach(el => el.onclick = () => closeMenu())




// form

createApp({
  name: 'Appeal',
  data () {
    return {
      isShowPopup: false,
      popupNum: '',
      phone: '',
      userPhoneErrorText: '',
      validityPhone: false,
      maskPhone: {
        mask: '+0 (000) 000-00-00',
        prepare: (v, m) => m.value.length < 2 ? 7 : v
      }
    }
  },
  methods: {
    onAccept (e) {
      this.phone = e.detail.unmaskedValue
      this.validityPhone = false
      this.userPhoneErrorText = ''
    },
    onComplete (n) {
      this.validityPhone = true
      this.popupNum = n.detail.value
    },
    validatePhone () {
      if (this.phone === '') {
        this.userPhoneErrorText = 'Поле, обязательное для заполнения'
      } else if (!this.validityPhone) {
        this.userPhoneErrorText = 'Введите корректный номер телефона'
      }
    },
    resetForm () {
      this.$refs.form.reset()
      this.phone = ''
      this.name = ''
      this.validityPhone = false
      this.maskPhone = {
        mask: '+0 (000) 000-00-00',
      }
      this.isShowPopup = true
      setTimeout(() => this.isShowPopup = false, 3000)
    },
    submitForm () {
      this.validatePhone()
      if (this.validityPhone) {

        const formData = new FormData(this.$refs.form)
        axios
          .post('/mail.php', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
          })
          .then(() => {
            this.resetForm()
          })
        // load('6LcaT1UjAAAAAPdvEaFO19I8XlNsTEgMJwQdnBHI').then(recaptcha => {
        //   recaptcha.execute('submit').then(token => {
        //     const formData = new FormData(this.$refs.form)
        //     formData.append('token', token)
        //     axios
        //       .post('/mail.php', formData, {
        //         headers: {'Content-Type': 'multipart/form-data'}
        //       })
        //       .then(() => {
        //         this.resetForm()
        //       })
        //   })
        // })
      }
    },
  },
  directives: {
    imask: IMaskDirective
  }
})
  .mount('#appeal')

















// const form = document.getElementById('form')
  
  
// form.addEventListener('submit', function(e) {
//   e.preventDefault();
//   e.stopPropagation();
//   load('6LcaT1UjAAAAAPdvEaFO19I8XlNsTEgMJwQdnBHI').then(recaptcha => {
//     recaptcha.execute('submit').then(token => {
//       // const test = token
//       const formData = new FormData(this)
//       formData.append('token', token)
//       formData.append('phone', 12423)
//       axios
//         .post('/mail.php', formData, {
//           headers: {'Content-Type': 'multipart/form-data'}
//         })
//     })
//   })
// })




