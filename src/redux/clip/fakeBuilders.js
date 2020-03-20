import { build, fake } from "@jackfranklin/test-data-bot";
import faker from "faker";

export const fakeClipIdsBuilder = arrayLength => {
  let clipIds = [];
  for (let index = 0; index < arrayLength; index++) {
    const fakeId = faker.random.number({ min: 1, max: 100 });
    clipIds.push(fakeId);
  }
  return clipIds;
};

export const fakeClipBuilder = build("Clip", {
  fields: {
    id: fake(f => f.random.number({ min: 1, max: 20 })),
    transcription: fake(f => f.lorem.lines(2)),
    startTime: fake(f => f.random.number({ min: 0, max: 10 })),
    endTime: fake(f => f.random.number({ min: 11, max: 20 }))
  }
});
