import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BatteryDataComponent from '../components/BatteryDataComponent.vue';
import { schoolsMockData } from './mockups/schools';
import { defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'



const schoolsMockStore = defineStore({
  id: 'batteryStore',
  state: () => ({
    schools: schoolsMockData
  })
})


describe('SchoolBatteryIssuesTable.vue', () => {
  it('displays the schools with the highest number of battery issues', () => {

    const wrapper = mount(BatteryDataComponent, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
        })]
      }
    })

    const store = schoolsMockStore()

    const schoolRows = wrapper.findAll('tbody tr')
    expect(schoolRows.length).toBe(store.schools.length)
    for (let i = 0; i < store.schools.length; i++) {
      const school = store.schools[i]
      const row = schoolRows[i]

      const idCell = row.find('td:first-child')
      expect(idCell.text()).toBe(school.academyId.toString())

      const countCell = row.find('td:nth-child(2)')
      expect(countCell.text()).toBe(school.unhealthyDevices.size.toString())

      const devicesCell = row.find('td:last-child')
      const deviceItems = devicesCell.findAll('li')
      expect(deviceItems.length).toBe(school.unhealthyDevices.size)
      for (let j = 0; j < deviceItems.length; j++) {
        const device = Array.from(school.unhealthyDevices.keys())[j]
        expect(deviceItems[j].text()).toBe(device)
      }
    }
  })
})
