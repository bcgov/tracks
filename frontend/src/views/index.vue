<template>
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
</template>

<script>
export default {
  name: 'Home',

}
</script>