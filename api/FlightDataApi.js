import flightList from '../resource/flightList'
import fetch from 'node-fetch';

if (typeof window !== 'undefined') {
localStorage.setItem('flight', JSON.stringify(flightList));
}

export async function getFlight(filterBy = {}) {
  
    const res = await fetch('http://localhost:4999/flight').then((flight) => {
      return flight.json();
    });

 //검색 조건에 맞는 데이터 필어틸 
 const filteredRes = res.filter((flight) => {
  if (filterBy.destination === flight.destination) {
    return flight;
  }
});

  if (!filterBy.destination) {
    return res;
  } else {
    return filteredRes;
    }
  }

  

// let json = []
// if (typeof window !== "undefined") {
//   json = localStorage.getItem("flight");
// }
// const flight = JSON.parse(json) || [];

// return new Promise((resolve) => {
//   const filtered = flight.filter((flight) => {
//     let condition = true;
//     if (filterBy.departure) {
//       condition = condition && flight.departure === filterBy.departure
//     }
//     if (filterBy.destination) {
//       condition = condition && flight.destination === filterBy.destination
//     }
//     return condition;
//   })

// setTimeout(() => {
//   resolve(filtered)
// }, 500);
