<template>
  <div class="content-wrapper">
    <nav class="breadcrumbs" aria-label="breadcrumbs">
      <router-link to="/">
        <vs-icon 
          icon-pack="mdi"
          icon="mdi-arrow-left"
        ></vs-icon>
        Back to Operators
      </router-link>
    </nav>

    <main>
      <h1>Create Operator</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      
      <div class="stepper">

        <section ref="detailSection"
          class="stepper-section"
        >
          <header @click="openStep1()">
            <h2>Operator Detail</h2>
          </header>

          <form
            class="operator-details-form"
            v-show="this.step1Active"
          >

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

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
                    label="Extension (Optional)"
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
                    tab-index="0"
                    id="streetAddress"
                    label="Street Address"
                    size="large"
                    aria-label="Street Address"
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

            <vs-divider />

            <vs-row class="form-btns-row">
              <vs-col
                vs-type="flex"
                vs-justify="flex-end"
              >
                <vs-button
                  color="primary"
                  size="large"
                  type="filled"
                  @click="gotoSection2('tenureSection')"
                >
                  Continue
                </vs-button>
                <vs-button
                  color="primary"
                  size="large"
                  type="border"
                >
                  Cancel
                </vs-button>
              </vs-col>
            </vs-row>

          </form>

        </section>

        <!-- Tenure Section -->
        <section ref="tenureSection"
          class="stepper-section"
        >
          <header @click="openStep2()">
            <h2>Add Tenures</h2>
          </header>
          
          <form
            ref="tenure"
            :class="{collapsed : !this.step2Active}"
          >

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <vs-row
              v-for="(tenure, index) in tenures" 
              :key="index"
            >
              <vs-col>
              <fieldset
                class="group-fieldset">
                <legend>Tenure <span>{{index.length}}</span></legend>
                <vs-button
                  type="flat"
                  class="remove-group-btn font-weight-bold"
                  v-if="tenures.length > 0"
                  @click="$delete(tenures, index)"
                >
                  <vs-icon
                    icon-pack="mdi"
                    icon="mdi-trash-can-outline"
                    aria-label="Remove Tenure">
                  </vs-icon>
                  Remove
                </vs-button>
                <vs-row>
                  <vs-col 
                    vs-type="flex"
                    vs-justify="center" 
                    vs-align="center" 
                    vs-w="12">
                    <vs-input
                      label="File Number"
                      size="large"
                      v-model="tenure.tenureFileNumber"
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
                        :key="index"
                        :value="item.value" 
                        :text="item.type" 
                        v-for="(item, index) in tenureTypes"

                      />
                    </vs-select>
                  </vs-col>
                </vs-row>
                <vs-row>
                  <vs-col 
                    vs-w="12">

                    <vs-select
                      autocomplete
                      label="Tenure Regions"
                      placeholder="Select a Region"
                      class="large"
                      v-model="tenure.tenureRegionOptions"
                    >
                      <vs-select-item
                        :key="index"
                        :value="item.value"
                        :text="item.text"
                        v-for="(item, index) in regionOptions" />
                    </vs-select>

                    <!-- <label class="vs-input--label">Tenure Regions</label>
                    <vs-chips
                      class="custom-chips"
                      placeholder="New Element"
                      v-model="tenureRegions">
                      <vs-chip
                        closable
                        icon-pack="mdi"
                        close-icon="mdi-close"
                        :key="region"
                        @click="remove(chip)"
                        v-for="region in tenureRegions">
                        {{ region }}
                      </vs-chip>
                    </vs-chips> -->

                  </vs-col>
                </vs-row>
                <vs-row>
                  <vs-col 
                    vs-w="12">

                    <vs-select
                      autocomplete
                      label="Activities"
                      class="large"
                      v-model="tenure.activities"
                    >
                      <vs-select-item
                        :key="index"
                        :value="item.value"
                        :text="item.text"
                        v-for="(item, index) in activityOptions" />
                    </vs-select>

                    <!-- <label class="vs-input--label">Tenure Regions</label>
                    <vs-chips
                      class="custom-chips"
                      placeholder="New Element"
                      v-model="tenureRegions">
                      <vs-chip
                        closable
                        icon-pack="mdi"
                        close-icon="mdi-close"
                        :key="region"
                        @click="remove(chip)"
                        v-for="region in tenureRegions">
                        {{ region }}
                      </vs-chip>
                    </vs-chips> -->

                  </vs-col>
                </vs-row>
              </fieldset>
              </vs-col>
            </vs-row>

            <div>
              <vs-button
                color="primary"
                type="flat"
                class="font-weight-bold"
                @click="addNewTenure()"
              >
                <vs-icon
                  small
                  icon-pack="mdi"
                  icon="mdi-plus"
                >
                </vs-icon>
                Add Another Tenure
              </vs-button>
            </div>

            <vs-divider />

            <vs-row class="form-btns-row">
              <vs-col
                vs-type="flex"
                vs-justify="space-between"
              >
                <vs-button
                  color="primary"
                  size="large"
                  type="border"
                  @click="gotoSection1('detailSection')"
                >
                  Previous
                </vs-button>
                <div>
                  <vs-button
                    color="primary"
                    size="large"
                    type="filled"
                    @click="gotoSection3('permitSection')"
                  >
                    Continue
                  </vs-button>
                  <vs-button
                    color="primary"
                    size="large"
                    type="border"
                  >
                    Cancel
                  </vs-button>
                </div>
              </vs-col>
            </vs-row>

          </form>
        
        </section>

        <!-- Permit Section -->
        <section ref="permitSection"
          class="stepper-section"
        >
          <header @click="openStep3()">
            <h2>Add BC Parks Permits</h2>
          </header>

            <form :class="{collapsed : !this.step3Active}">

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

              <vs-row
                v-for="(permit, index) in permits" 
                :key="index"
              >
                <vs-col>
                  <fieldset class="group-fieldset">
                    <legend>Permit <span>{{permit.index}}</span></legend>
                    <vs-button
                      size="large"
                      type="flat"
                      class="remove-group-btn"
                      @click="$delete(permits, index)"
                    >
                      <vs-icon
                        icon-pack="mdi"
                        icon="mdi-trash-can-outline"
                        aria-label="Remove Tenure">
                      </vs-icon>
                      Remove
                    </vs-button>
                    <vs-row>
                      <vs-col 
                        vs-type="flex"
                        vs-justify="center" 
                        vs-align="center" 
                        vs-w="12">
                        <vs-input
                          label="Permit Number"
                          size="large"
                          v-model="permit.permitNumber"
                        />
                      </vs-col>
                    </vs-row>
                    <vs-row>
                      <vs-col 
                        vs-type="flex"
                        vs-justify="center" 
                        vs-align="center" 
                        vs-w="12">
                        <vs-input
                          label="Application File Number"
                          size="large"
                          v-model="permit.applicationFileNumber"
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
                          autocomplete
                          label="Protected Lands"
                          class="large"
                          v-model="permit.protectedLands"
                        >
                          <vs-select-item
                            :key="index"
                            :value="item.value"
                            :text="item.text"
                            v-for="(item, index) in protectedLandsOptions" />
                        </vs-select>
                      </vs-col>
                    </vs-row>
                  </fieldset>
                </vs-col>
              </vs-row>

              <div>
                <vs-button
                  color="primary"
                  type="flat"
                  class="font-weight-bold"
                  @click="addNewPermit()"
                >
                  <vs-icon
                    small
                    icon-pack="mdi"
                    icon="mdi-plus"
                  >
                  </vs-icon>
                  Add Another Permit
                </vs-button>
              </div>

              <vs-divider />

              <vs-row class="form-btns-row">
                <vs-col
                  vs-type="flex"
                  vs-justify="space-between"
                >
                  <vs-button
                    color="primary"
                    size="large"
                    type="border"
                    @click="gotoSection2('tenureSection')"
                  >
                    Previous
                  </vs-button>
                  <div>
                    <vs-button
                      color="primary"
                      size="large"
                      type="filled"
                      @click="gotoSection3('permitSection')"
                    >
                      Create Operator
                    </vs-button>
                    <vs-button
                      color="primary"
                      size="large"
                      type="border"
                    >
                      Cancel
                    </vs-button>
                  </div>
                </vs-col>
              </vs-row>
            </form>

        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'CreateOperator',

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

    activityOptions: [
      {text: 'Activity 1', value:1},
      {text: 'Activity 2', value:0}
    ],

    protectedLandsOptions: [
      {text:'Protected Land 1', value:1},
      {text:'Protected Land 2', value:2},
      {text:'Protected Land 3', value:3},
    ],

    regionOptions:[
      {text:'Tenure Region 1', value:1},
      {text:'Tenure Region 2', value:2},
      {text:'Tenure Region 3', value:3},
    ],

    tenureTypes: [
      {type: 'type 1'},
      {type: 'type 2'}
    ],

    permits: [
      {
        permitNumber: '',
        applicationFileNumber: '',
        protectedLands: [
          {
            text: '',
            value: ''
          }
        ]
      }
    ],

    tenures: [
      {
        tenurefileNumber: '',
        tenureActivities: [
        ],
        tenureRegions: [
        ],
        tenureType: '',
      }
    ],
  }),

  methods: {
    openStep1: function () {
      this.step1Active = true
      this.step2Active = false
      this.step3Active = false
      window.scrollTo({top: 0, behavior: 'smooth'});
    },

    openStep2: function () {
      this.step2Active = true
      this.step1Active = false
      this.step3Active = false
      window.scrollTo({top: 0, behavior: 'smooth'});
    }, 

    openStep3: function () {
      this.step1Active = false
      this.step2Active = false
      this.step3Active = true
    }, 

    addNewTenure: function () {
      this.tenures.push({
        fileNumber: '',
        tenureType: ''
      })
    },

    addNewPermit: function () {
      this.permits.push({
        permitNumber: '',
        applicationFileNumber: ''
      })
    },

    // Prototype w/ Scrolling Functionality
    gotoSection1: function () {
      this.$smoothScroll({
        scrollTo: this.$refs.detailSection,
        duration: 1000,
        offset: -100,
      })
      this.step1Active = true
      this.step2Active = false
      this.step3Active = false
    },

    gotoSection2: function () {
      this.$smoothScroll({
        scrollTo: this.$refs.tenureSection,
        duration: 1000,
        offset: -100,
      })
      this.step1Active = false
      this.step2Active = true
      this.step3Active = false
    },

    gotoSection3: function () {
      this.$smoothScroll({
        scrollTo: this.$refs.permitSection,
        duration: 1000,
        offset: -100,
      })
      this.step1Active = false
      this.step2Active = false
      this.step3Active = true
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
    padding-top 1.5rem
    padding-bottom 1.5rem
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
    border 3px solid #999999
    background #ffffff

  .stepper-section.complete header::after,
  .stepper-section.complete::after 
    border-color #003366;

  .stepper-section.active header::after
    border-color #003366;
    background #003366

  .stepper-section
    position relative

  .stepper-section h2
    font-size 1.5rem

  .stepper-section form
    padding-left indent-left
    padding-bottom 2rem

    p
      margin-top 0
      margin-bottom 1.5rem

  .stepper-section::after
    content ' '
    position absolute
    top 1.5rem
    left 0
    width (marker-width / 2)
    height 100%
    border-right 3px solid #999999;

  .stepper-section:last-child::after
    display none

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
    padding-bottom 0

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

  .group-fieldset 
    position relative
    padding 2rem
    border-radius 0.5rem
    border 1px solid #cccccc

    legend 
      float left

  .remove-group-btn
    position absolute
    top 1.5rem
    right 1.5rem
  
  .vs-divider
    margin 1.5rem 0

  .custom-chips .con-chips
    box-shadow none 
    border 1px solid #999999
    width 100%

  .operator-details-form
    fieldset
      margin-top 2rem
</style>