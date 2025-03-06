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
  const [flightList, setFlightList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = ({ departure, destination }) => {
    if (
      condition.departure !== departure ||
      condition.destination !== destination
    ) { 
    setCondition({ departure, destination });
    }
  };

  const handleFlight = async () => {
    setIsLoading(true);

    try {
      const flightData = await getFlight(condition);
      setFlightList(flightData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      handleFlight();
  }, [condition]);

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
          
        {isLoading ? <LoadingIndicator /> : <FlightList list={flightList} />}
      </div>        

        <div className="debug-area">
          <Debug condition={condition} />
        </div>
      </main>
    </div>
  );
}
