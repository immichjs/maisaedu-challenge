<template>
  <v-main>
		<v-navigation-drawer permanent>
			<v-list-item subtitle="Grupo A" title="Módulo Acadêmico" />
			<v-divider />
			<v-list-item link title="Alunos" to="/students" />
		</v-navigation-drawer>

    <router-view />
  </v-main>

  <AppFooter />
</template>
