<script
	lang='ts'
	setup
>
import { ref } from 'vue';

const open = ref(false);

function toggleNav() {
	open.value = !open.value;
}
</script>

<template>
<nav class='navbar navbar-expand-lg'>
	<div class='container'>
		<button
			class='btn btn-outline-dark d-block d-lg-none'
			@click='toggleNav'
		>
			<Icon
				v-if='open'
				icon='close'
			/>
			<Icon
				v-else
				icon='bars'
			/>
		</button>

		<div
			:class='[
				"collapse",
				"navbar-collapse",
				{
					"show": open
				}
			]'
			@click='toggleNav'
		>
			<ul class='navbar-nav'>
				<NavItem href='/'>
					Home
				</NavItem>
				<NavItem href='https://alsi.sdp.sirsi.net/client/en_US/NauvooPL/?user_id=NAUVOO-PLWEB'>
					Catalog/My Account
				</NavItem>
				<NavItem href='https://alliance.lib.overdrive.com/F2BABC8E-43C5-4254-955D-807857621C6C/10/50/en/Default.htm'>
					eBooks and Audio
				</NavItem>
				<NavItem href='/resources'>
					Resources
				</NavItem>
				<NavItem href='/contact'>
					Contact
				</NavItem>
			</ul>
		</div>
	</div>
</nav>
</template>
