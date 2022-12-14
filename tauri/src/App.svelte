<script lang="ts">
  import { call, question, answer } from "./lib/openai";

  call();
</script>

<main>
  <p>question: {$question}</p>
  <p>answer: {$answer}</p>
</main>

<button on:click={call}>別な回答を作る</button>

<style>
</style>
