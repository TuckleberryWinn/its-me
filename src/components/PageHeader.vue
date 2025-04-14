<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<template>
	<header>
		<h1>Some Header Nonsense</h1>
		<nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/about">About</RouterLink>
		</nav>
	</header>
</template>

<style scoped>
header {
	background-color: rgb(75, 147, 210);
}
</style>
