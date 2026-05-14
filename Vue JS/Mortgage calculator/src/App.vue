<script setup>
import { ref } from 'vue';

const mortgageAmount = ref(null)
const mortgageTerm = ref(null)
const interestRate = ref(null)
const mortgageType = ref("")

const showResults = ref(false)
const monthPayment = ref(0)
const totalRepayment = ref(0)

const errors = ref({
  mortgageAmount: "",
  mortgageTerm: "",
  interestRate: "",
  mortgageType: ""
})

const calculateRepayments = () => {
  
  const principal = Number(mortgageAmount.value)
  const years = Number(mortgageTerm.value)
  const annualRate = Number(interestRate.value)
  
  const monthlyRate = annualRate / 100 / 12
  const totalMonths = years * 12

  if (mortgageType.value === "repayment") {
  if (monthlyRate === 0) {
    monthPayment.value = principal / totalMonths
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths)
    monthPayment.value = principal * (monthlyRate * factor) / (factor - 1)
  }

  totalRepayment.value = monthPayment.value * totalMonths
} else {
  // Interest-only calculation
  monthPayment.value = principal * monthlyRate
  totalRepayment.value = principal + (monthPayment.value * totalMonths)
}

  
  showResults.value = true
}

const validateForm = () => {
  errors.value = {
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: ""
  }

  let isvalid = true

  if (!mortgageAmount.value) {
    errors.value.mortgageAmount = "This fiels is required"
    isvalid = false
  }

  if (!mortgageTerm.value) {
    errors.value.mortgageTerm = "This fiels is required"
    isvalid = false
  }

  if (!interestRate.value) {
    errors.value.interestRate = "This fiels is required"
    isvalid = false
  }

  if (!mortgageType.value) {
    errors.value.mortgageType = "This fiels is required"
    isvalid = false
  }

  if (isvalid) {
    calculateRepayments()
  }
}

const clearAll = () => {
  mortgageAmount.value = null
  mortgageTerm.value = null
  interestRate.value = null
  mortgageType.value = ""
  showResults.value = false

  errors.value = {
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    mortgageType: ""
  }
}

</script>

<template>

<main>
  <div class="container">
    <div class="card">

      <div class="left">
        <div class="top">
          <h2>Mortgage Calculator</h2>
          <a href="#" @click.prevent="clearAll()">Clear All</a>
        </div>

        <form action="#" @submit.prevent="validateForm()">
          <div class="mortgage-amount">
            <label for="mortgage amount">Mortgage Amount</label> <br>
            <div class="input-wrapper">
              <span class="input-prefix">£</span>
              <input type="number" id="mortgage-amount" v-model.number="mortgageAmount" min="0"> 
            </div>
            <span v-if="errors.mortgageAmount" class="error-message">
              {{ errors.mortgageAmount }}
            </span>
          </div>

          <div class="mortgage-infos">

            <div class="mortgage-terms">
              <label for="mortgage-terms">Mortgage Terms</label> <br>
              <div class="input-wrapper">
                <input type="number" id="mortgage-terms" v-model.number="mortgageTerm" min="1">
                <span class="input-suffix">years</span>
              </div>
              <span v-if="errors.mortgageTerm" class="error-message">
                {{ errors.mortgageTerm }}
              </span>
            </div>
            <div class="interest-rate">

              <label for="interest-rate">Interest Rate</label> <br>
               <div class="input-wrapper">
                  <input type="number" id="interest-rate" v-model.number="interestRate" min="0">
                  <span class="input-suffix">%</span>
               </div>
                <span v-if="errors.interestRate" class="error-message">
                  {{ errors.interestRate }}
                </span>
            </div>
          </div>
          <div class="mortgage-type">

            <label>Mortgage Type</label> <br>
            <label>
              <input type="radio" name="mortgage-type" value="repayment"v-model="mortgageType">
              Repayment
            </label>
            <label>
              <input type="radio" name="mortgage-type" value="interest only" v-model="mortgageType">Interest only
            </label>
            <span v-if="errors.mortgageType" class="error-message">
              {{ errors.mortgageType }}
            </span>
          </div>
          
          <button type="submit">
            <img src="./assets/icon-calculator.svg" alt="icon calculator">
            Calulate Repayments</button>

        </form>
      </div>

      <div class="right">
        <div class="first"v-if="!showResults">
          <img src="./assets/illustration-empty.svg" alt="illustration">
          <h2>Results shown here</h2>
          <p>Complete the form and click “calculate repayments” to  <br> see what your monthly repayments would be.</p>        
        </div>
        <div class="results" v-else>
          <h2>Your results</h2>
          <p>Your results are shown below based on the information <br> you provided. To adjust the results, edit the form and <br> click “calculate repayments” again.</p>
          <div class="results-container">
            <p>Your monthly repayments</p>
            <p class="top">£{{ monthPayment.toFixed(2)}}</p>
            <hr>
            <p>Total you'll repay over the term</p>
            <p class="bottom">£{{ totalRepayment.toFixed(2)}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</main>

</template>

<style scoped>

.container {
  background-color: hsl(202, 86%, 94%);
}

.left .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.left .top h2 {
  margin: 0;
  min-width: 0;
}

.left .top a {
  flex-shrink: 0;
  white-space: nowrap;
}

a{
  display: block;
  color: hsl(200, 26%, 54%);
}

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97vh;
}

.card{
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  border-radius: 1.5rem;
}

.left{
  padding: 30px 30px 20px;
  border-radius: 20px 0 0 20px;
}

.right{
  background-color: hsl(202, 55%, 16%);
  border-radius:  0 20px 20px 5rem;
  padding: 30px;
  color: #fff;
  text-align: center;
}

.left h2,
.right h2 {
  margin-top: 0;
}

.right .first{
  padding-top: 40px;
}

input{
  box-sizing: border-box;
  width: 350px;
  height: 35px;
  border-radius: 8px;
  margin: 0 3px 8px 0;
  border: 1px solid hsl(200, 26%, 54%);
  padding: 0 30px;
}

/* Masquer les flèches pour tous les navigateurs */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
 
input[type="number"] {
  -moz-appearance: textfield; /* Pour Firefox */
}

label{
  display: inline-block;
  margin: 5px 0;
}

.mortgage-infos{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mortgage-infos input{
  width: 170px;
}

.mortgage-type{
  display: flex;
  flex-direction: column;
}

.mortgage-type label:not(:first-child) {
  display: block;
  border: 1px solid hsl(200, 26%, 54%);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
}

.mortgage-type label:not(:first-child):focus-within {
  border-color: hsl(61, 70%, 52%);
  box-shadow: 0 0 0 2px hsl(61, 70%, 52%);
  background-color: hsl(61, 70%, 90%);
}

.mortgage-type input[type="radio"]{
  width: 15px;
  position: relative;
  top: 4px;
}

button{
  padding: 12px 50px;
  border-radius: 50px;
  margin: 15px 0;
  background-color: hsl(61, 70%, 52%);
  border: none;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

button:hover {
  background-color: hsl(61, 70%, 45%); /* Plus foncé */
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input{
  box-sizing: border-box;
}

.input-prefix {
  position:absolute;
  left: 10px;
  bottom:35%;
  color: hsl(200, 26%, 54%);
  font-size: 16px;
}

.input-suffix {
  position: absolute;
  right: 16px;
  bottom: 38%;
  color: hsl(200, 26%, 54%);
  font-size: 16px;
}

.error-message {
  display: block;
  color: hsl(4, 69%, 50%);
  font-size: 14px;
  margin-bottom: 10px;
}

.input-wrapper:has(+ .error-message) input {
  border-color: hsl(4, 69%, 50%);
}

.mortgage-type:has(+ .error-message) label:not(:first-child) {
  border-color: hsl(4, 69%, 50%);
}

.error-message {
  animation: slideIn 0.3s ease-out;
}

.results {
  text-align: start;
}

.results-container {
  padding: 10px 20px;
  background-color: hsl(200, 100%, 9%);
  border-radius: 10px 10px 0 0;
  border-top: 4px solid hsl(61, 70%, 52%);
  margin-top: 30px
}

.results .top {
  font-size: x-large;
  font-weight: bold;
  color:hsl(61, 70%, 52%);
}

.results .bottom {
  font-size: large;
}






@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px){
  .container{
    height: auto;
  }

  .card{
    grid-template-columns: 1fr;
  }

  .card, .left, .right{
    border-radius: 0;
  }

  .mortgage-infos{
    display: block;
  }

  .mortgage-infos input{
    width: 100%;
  }
}
</style>