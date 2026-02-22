<template>
	<div class="question">
		<h3>{{ question.question }}</h3>
		<ul>
			<li v-for="(choice, index) in randomChoices" :key="choice">
				<Answer
					:id="'answer${index}'"
					:disabled="hasAnswer"
					:value="choice"
					v-model="answer" 
					:correctAnswer="question.correct_answer"
					/>
			</li>
		</ul>
		<button :disabled="!hasAnswer" @click="emits('answer', answer)">Question suivante</button>
	</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { shuffleArray } from './functions/array.js';
import Answer from './Answer.vue';

const props = defineProps({
	question: Object
})

const emits = defineEmits(['answer']) 
const answer = ref(null)
const hasAnswer = computed(() => answer.value !== null)
const randomChoices = computed(() => shuffleArray(props.question.Choices))

</script>

<style>
	.question{
		padding-top: 2rem;
	}

	.question button{
		margin-left: auto;
		display: block;
		background-color: #0060df;
		color: #fff;
		border: none;
		padding: 10px 15px;
		border-radius: 3px;
	}

	input:hover, button:hover{
		cursor: pointer;
		opacity: 0.9;
	}
</style>