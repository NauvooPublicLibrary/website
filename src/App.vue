<script
	lang='ts'
	setup
>
import ContactBanner from '@/layout/ContactBanner.vue';
import MainNav from '@/layout/MainNav.vue';
</script>

<template>
<div>
	<ContactBanner/>
	<MainNav/>

	<RouterView/>
</div>
</template>
