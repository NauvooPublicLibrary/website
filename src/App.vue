<script
	lang='ts'
	setup
>
import ContactBanner from '@/layout/ContactBanner.vue';
import MainNav from '@/layout/MainNav.vue';
import SiteFooter from '@/layout/SiteFooter.vue';
</script>

<template>
<div class='min-vh-100 d-flex flex-column'>
	<ContactBanner/>
	<MainNav/>

	<main class='flex-grow-1'>
		<RouterView/>
	</main>

	<SiteFooter/>
</div>
</template>
