<script lang="ts">
  import { call, question, answer, askNext, waiting } from "./lib/openai";

  call();
</script>

<main>
  <h2>Question</h2>
  <p>{$question}</p>

  <h2>Answer</h2>
  <p>{$answer}</p>
</main>

<hr />
<button disabled={$waiting} on:click={call}>別な回答を作る</button>
<br />
<button disabled={$waiting} on:click={() => askNext("long")}>続きを聞く</button>
<button disabled={$waiting} on:click={() => askNext("very-long")}
  >続きをたくさん聞く</button
>

<style>
  main p {
    white-space: pre-line;
  }
</style>
