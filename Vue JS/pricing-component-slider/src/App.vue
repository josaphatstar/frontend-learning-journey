<template>
  <h1>Simple, traffic-based pricing</h1>
  <p>Sign-up for our 30-day trial. No credit card required</p> <br> <br>
  <PricingCard/>  
</template>

<script>
import PricingCard from "./components/PricingCard.vue"

export default{
  components:{
    PricingCard
  }
}
</script>

<style>
*{
  font-family: Arial, Helvetica, sans-serif;
}
body{
  background-color: hsl(228, 60%, 95%);
}

h1{
  font-size: xx-large;
  display: block;
  height: 25px;
}

h1, p {
  color :  hsl(227, 35%, 25%)
}
</style>