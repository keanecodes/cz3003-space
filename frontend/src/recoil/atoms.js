import { atom } from 'recoil'

export const contentState = atom({
  key: 'contentState',
  default: 'home'
})

export const worldState = atom({
  key: 'worldState',
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
      topic: "Implementation",
    },
    "Airship": {
      selected:false,
      topic: "Software Testing",
    },
    "Island": {
      selected:false,
      topic: "Deployment",
    },
  }
})