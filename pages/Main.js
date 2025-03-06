import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getFlight } from '../api/FlightDataApi';
import FlightList from './component/FlightList';
import LoadingIndicator from './component/LoadingIndicator';
import Search from './component/Search';
import Debug from './component/Debug';

import json from '../resource/flightList';


// 아래 Main 컴포넌트는 전체 앱의 부모 컴포넌트로 여러 자식 컴포넌트를 포함함 
export default function Main() {
  const [condition, setCondition] = useState({
    departure: 'ICN',
    destination: '',
  });
  const [flightList, setFlightList] = useState(json);

  //아래는 condition 상태를 업데이트하는 함수; 
  // departure와 destination 값을 인자로 받아 setCondition을 통해 condition 상태 업데이트 
  // search 컴포넌트에서 검색 버튼 클릭했을 때 호출됨 
  const search = ({ departure, destination }) => {
    setCondition({
      departure, 
      destination,
    });
  };

    //아래는 flightlist에 대해 필터링 하는 함수 
  const filterByCondition = (flight) => {
    let pass = true;
    if (condition.departure) {
      pass = pass && flight.departure === condition.departure;
    }
    if (condition.destination) {
      pass = pass && flight.destination === condition.destination;
    }
    return pass;
  };

  global.search = search; // 실행에는 전혀 지장이 없지만, 테스트를 위해 필요한 코드입니다. 이 코드는 지우지 마세요!

  return (
    <div>
      <Head>
        <title>Airline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>여행가고 싶을 땐, Airline</h1>

        {/* Search 컴포넌트에 onSearch 함수 전달  */}
        <Search onSearch={search} />

        <div className="table">
          <div className="row-header">
            <div className="col">출발</div>
            <div className="col">도착</div>
            <div className="col">출발 시각</div>
            <div className="col">도착 시각</div>
            <div className="col"></div>
          </div>
          <FlightList list={flightList.filter(filterByCondition)} />
        </div>

        <div className="debug-area">
          <Debug condition={condition} />
        </div>
      </main>
    </div>
  );
}
