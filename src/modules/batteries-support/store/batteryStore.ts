import { defineStore } from 'pinia';
import { BatteryService } from '../services/BatteryDataService';
import type { BatteryData } from '../models/battery-data.model';

export const batteryStore = defineStore({
  id: 'batteryStore',
  state: () => ({
    data: [],
    schools: [{
      academyId: 0,
      unhealthyDevices: new Map<string, number>()
    }],
  }),

  actions: {
    async fetchData() {
      this.data = await BatteryService.getData();
      this.schools = this.analyzeBatteryData(this.data);
    },
    analyzeBatteryData(data: BatteryData[]): School[] {
      // Group the data by academy ID
      const dataByAcademy = new Map<number, BatteryData[]>();
      for (const datum of data) {
        const academyId = datum.academyId;
        if (!dataByAcademy.has(academyId)) {
          dataByAcademy.set(academyId, []);
        }
        dataByAcademy.get(academyId)?.push(datum);
      }

      // Analyze the data for each school
      const summaries: School[] = [];
      for (const [academyId, batteryData] of dataByAcademy) {
        const unhealthyDevices = new Map<string, number>();
        for (const i in batteryData) {
          const datum = batteryData[i];
          const prevDatum = batteryData[+i - 1];
          if (!prevDatum || prevDatum.serialNumber !== datum.serialNumber) {
            // First reading for this device
            unhealthyDevices.set(datum.serialNumber, -1);
          } else {
            const durationMs =
              new Date(datum.timestamp).getTime() - new Date(prevDatum.timestamp).getTime();
            const durationDays = durationMs / (24 * 60 * 60 * 1000);
            const batteryUsage = (prevDatum.batteryLevel - datum.batteryLevel) / durationDays;
            if (batteryUsage > 0.3) {
              const count = unhealthyDevices.get(datum.serialNumber) ?? 0;
              unhealthyDevices.set(datum.serialNumber, count + 1);
            }
          }
        }
        summaries.push({ academyId: academyId, unhealthyDevices: unhealthyDevices });
      }

      // Sort the summaries by the number of devices with battery issues
      summaries.sort((a, b) => {
        const aCount: any = Array.from(a.unhealthyDevices.values()).reduce((acc: any, cur: any) => acc + (cur > 0 ? 1 : 0), 0);
        const bCount: any = Array.from(b.unhealthyDevices.values()).reduce((acc: any, cur: any) => acc + (cur > 0 ? 1 : 0), 0);
        return bCount - aCount;
      });

      return summaries;
    }
  },
});

