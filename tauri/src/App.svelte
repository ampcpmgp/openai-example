<script lang="ts">
  import { call, question, answer } from "./lib/openai";

  call();
</script>

<main>
  <h2>Question</h2>
  <p>{$question}</p>

  <h2>Answer</h2>
  <p>{$answer}</p>
</main>

<hr />
<button on:click={call}>別な回答を作る</button>

<style>
  p {
    white-space: pre;
  }
</style>
