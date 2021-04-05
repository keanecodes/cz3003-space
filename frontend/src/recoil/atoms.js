import { atom } from 'recoil'

export const pageTabState = atom({
  key: 'pageTabState',
  default: 'home'
})

export const worldsState = atom({
  key: 'worldsState',
  default: {
    "The Skeld": {
      selected:true,
      topic: "Requirements Engineering",
    },
    "Mira HQ": {
      selected:false,
      topic: "Architectural Design",
    },
    "Polus": {
      selected:false,
      topic: "Subsystem Implementation",
    },
    "Island": {
      selected:false,
      topic: "Software Testing",
    },
  }
})