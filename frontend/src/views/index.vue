<template>
  <div class="app" ref="parentSidebar">
    <main class="test-container">

      <h1>Create Operator</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

      <div class="stepper">

        <section
          class="stepper-section"
        >
          <header @click="openStep1()">
            <h2>Operator Detail</h2>
          </header>

          <form
            :class="{collapsed : !this.step1Active}"
          >

            <vs-row>
              <vs-col 
                vs-type="flex"
                vs-justify="center" 
                vs-align="center" 
                vs-w="12">
                <vs-input
                  label="Operator Name"
                  size="large"
                  v-model="operatorName"
                />
              </vs-col>
            </vs-row>

            <!-- Contact Information -->
            <fieldset>

              <legend>Contact Information</legend>

              <vs-row>
                <vs-col 
                  vs-type="flex"
                  vs-justify="center" 
                  vs-align="center" 
                  vs-w="12">
                  <vs-input
                    label="Email Address"
                    size="large"
                    v-model="emailAddress" 
                  />
                </vs-col>
              </vs-row>
            
              <vs-row>
                <vs-col 
                  vs-type="flex"
                  vs-justify="center" 
                  vs-align="center" 
                  vs-w="6">
                  <vs-input
                    label="Phone Number"
                    size="large"
                    v-model="phoneNumber" 
                  />
                </vs-col>
                <vs-col 
                  vs-type="flex"
                  vs-justify="center" 
                  vs-align="center" 
                  vs-w="6">
                  <vs-input
                    label="Extention (Optional)"
                    size="large"
                    v-model="phoneExtension" 
                  />
                </vs-col>
              </vs-row>

            </fieldset>

            <!-- Mailing Address -->
            <fieldset>
              <legend>Mailing Address</legend>
              <vs-row>
                <vs-col 
                  vs-type="flex"
                  vs-justify="center" 
                  vs-align="center" 
                  vs-w="12">
                  <vs-input
                    label="Street Address"
                    size="large"
                    v-model="mailStreet" 
                  />
                </vs-col>
              </vs-row>

              <vs-row>
                <vs-col 
                  vs-type="flex"
                  vs-justify="center" 
                  vs-align="center" 
                  vs-w="6">
                  <vs-input
                    label="City"
                    size="large"
                    v-model="mailCity" 
                  />
                </vs-col>
                <vs-col 
                  vs-type="flex"
                  vs-justify="center" 
                  vs-align="center" 
                  vs-w="6">
                  <vs-select
                    label="Province"
                    placeholder="Select a Province"
                    class="large"
                    v-model="mailRegion"
                    >
                    <vs-select-item 
                      :value="item.value" 
                      :text="item.text" 
                      v-for="(item, index) in mailRegions"
                      :key="index"
                    />
                  </vs-select>
                </vs-col>
              </vs-row>
            </fieldset>

            <vs-row class="form-btns-row">
              <vs-col>
                <vs-button
                  color="primary"
                  size="large"
                  type="filled"
                  @click="gotoStep2('tenure')"
                >
                  Continue
                </vs-button>
              </vs-col>
            </vs-row>

          </form>

        </section>

        <section
          class="stepper-section"
        >
          <header @click="openStep2()">
            <h2>Add Tenures <span>({{this.tenures.length}})</span></h2>
            <span></span>
          </header>
          <form
            ref="tenure"
            :class="{collapsed : !this.step2Active}"
          >
            <fieldset v-for="(tenure, index) in tenures" :key="index">
              <legend>Tenure <span>{{index}}</span></legend>
              <button v-if="tenures.length > 0"
                @click="$delete(tenures, index)">
                Remove
              </button>
              <vs-row>
                <vs-col 
                  vs-type="flex"
                  vs-justify="center" 
                  vs-align="center" 
                  vs-w="12">
                  <vs-input
                    label="File Number"
                    size="large"
                    v-model="tenure.fileNumber"
                  />
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-col 
                  vs-type="flex"
                  vs-justify="center" 
                  vs-align="center" 
                  vs-w="12">
                  <vs-select
                      label="Tenure Type"
                      placeholder="Select a Type"
                      class="large"
                      v-model="tenure.tenureType"
                      >
                      <vs-select-item 
                        :value="item.value" 
                        :text="item.type" 
                        v-for="(item, index) in tenureTypes"
                        :key="index"
                      />
                    </vs-select>
                </vs-col>
              </vs-row>
            </fieldset>

            <vs-row class="form-btns-row">
              <vs-col>
                <vs-button
                  color="primary"
                  size="large"
                  type="filled"
                  @click="validateStep2()"
                >
                  Continue
                </vs-button>
                <vs-button
                  color="primary"
                  size="large"
                  type="border"
                  @click="addNewTenure()"
                >
                  Add another
                </vs-button>
              </vs-col>
            </vs-row>

          </form>
        </section>

        <section
          class="stepper-section"
        >
          <header @click="openStep3()">
            <h2>BC Parks Permits</h2>
          </header>
          <form :class="{collapsed : !this.step3Active}">

          </form>
        </section>
      </div>

    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data:()=>({
    step1Active: true,
    step2Active: false,
    step3Active: false,

    operatorName: '',
    emailAddress: '',
    phoneNumber: '',
    phoneExtension: '',
    mailStreet: '',
    mailCity: '',
    mailRegion: '',
    mailRegions: [
    {text:'Alberta', value:0},
    {text:'British Columbia', value:1},
    ],

    tenures: [
      {
        fileNumber: '',
        tenureType: ''
      }
    ],

    tenureTypes: [
      {type: 'type 1'},
      {type: 'type 2'}
    ]
  }),

  methods: {
    openStep1: function () {
      this.step1Active = true
      this.step2Active = false
      this.step3Active = false
    },

    openStep2: function () {
      this.step1Active = false
      this.step2Active = true
      this.step3Active = false
    }, 

    openStep3: function () {
      this.step1Active = false
      this.step2Active = false
      this.step3Active = true
    }, 

    validateStep1: function () {
      this.openStep2()
    },

    validateStep2: function () {
      this.openStep3()
    },

    addNewTenure: function () {
      this.tenures.push({
        fileNumber: '',
        tenureType: ''
      })
    },

    scrollMeTo: function(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
      this.openStep2()
    },

    gotoStep2: function(refName) {
      var element = this.$refs[refName];
      element.scrollIntoView({ behavior: 'smooth' });
      this.openStep2()
    }
  }
}
</script>

<style lang="stylus">
  .app
    position relative
    width 100vw
    height 100vh
    padding 2rem
  
  .test-container
    max-width 680px
    margin 0 auto

  .stepper
    margin-top 2rem

  marker-size = 2.5rem
  marker-width = 7rem
  indent-left = 8rem

  .stepper header
    position relative
    padding-top 1rem
    padding-bottom 1rem
    padding-left indent-left
    font-size 1.25rem
    font-weight 700

  .stepper header::after
    content ' '
    position absolute
    top 50%
    left 50%
    margin-top (marker-size / -2)
    margin-left (marker-size / -2)
    z-index 2
    width marker-size
    height marker-size
    left (marker-width / 2)
    border-radius marker-size
    border 2px solid #999999
    background #ffffff

  .stepper-section
    position relative

  .stepper-section::after
    content ' '
    position absolute
    top 1.5rem
    left 0
    width (marker-width / 2)
    height 100%
    border-right 2px solid #999999;


  .stepper-section
    height auto !important

  .stepper-section h2
    font-size 1.5rem

  .stepper-section form
    padding-top 1rem
    padding-left indent-left
    padding-bottom 2rem

  section.inactive
    form 
      display none

  .vs-input, .con-select
    width: 100%

  .vs-row
    padding 1rem 0
    margin 0 -0.5rem

  .vs-col
    padding 0 0.5rem

  .vs-row.form-btns-row 
    button
      min-width 8rem
    
    button + button 
      margin-left 0.5rem

  .vs-collapse,
  .con-content--item
    padding 0

  .vs-collapse-item 
    border none !important

  .vs-collapse-item--icon-header
    display none !important

  .stepper-section form.collapsed 
    max-height 0
    padding-top 0
    padding-bottom 0
    overflow hidden
</style>