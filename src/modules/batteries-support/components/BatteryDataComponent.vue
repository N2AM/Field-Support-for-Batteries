<template>
  <div class="container mx-auto">
    <h2 class="text-2xl font-bold mb-4">Schools with the highest number of battery issues</h2>
    <table class="table-auto min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            School Id
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Number of Devices in Need of Battery Replacement
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Devices in Need of Battery Replacement
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(school, index) in store.schools" :key="index">
          <td class="px-6 py-4 whitespace-nowrap">{{ school.academyId }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ school.unhealthyDevices.size }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <ul>
              <li v-for="(device, index) in school.unhealthyDevices" :key="index">
                {{ device[0] }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { batteryStore } from '../store/batteryStore'
import { onMounted } from 'vue'

const store = batteryStore()

onMounted(async () => {
  await store.fetchData()
})
</script>

<style></style>
