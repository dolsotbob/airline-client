import { useState } from 'react';

//onSearch를 props로 받음 
function Search({onSearch}) {
  const [textDestination, setTextDestination] = useState('');

  //handleChange 함수는 사용자가 도착지 입력 필드에 값을 입력할 때마다 호출됩니다.
  //입력된 값은 toUpperCase()를 통해 대문자로 변환되어 textDestination 상태에 저장됩니다.
  const handleChange = (e) => {
    setTextDestination(e.target.value.toUpperCase());
  };

  //handleKeyPress 함수는 사용자가 입력 필드에서 키를 눌렀을 때 호출됩니다.
  //e.key === 'Enter' 조건을 체크하여 사용자가 엔터 키를 눌렀을 때 handleSearchClick 함수를 실행하도록 합니다.
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    console.log('검색 버튼을 누르거나, 엔터를 치면 search 함수가 실행됩니다');
    // TODO:
    ///Main 컴포넌트에서 전달된 onSearch 함수를 호출한다. 
    // 이 함수에 { departure: 'ICN', destination: textDestination } 객체를 전달하여 부모 컴포넌트에서 상태를 업데이트 하게됨
    onSearch({departure: 'ICN', destination: textDestination});
  };

  return (
    <fieldset>
      <legend>공항 코드를 입력하고, 검색하세요</legend>
      <span>출발지</span>
      <input id="input-departure" type="text" disabled value="ICN"></input>
      <span>도착지</span>
      <input
        id="input-destination"
        type="text"
        value={textDestination}
        onChange={handleChange}
        placeholder="CJU, BKK, PUS 중 하나를 입력하세요"
        onKeyUp={handleKeyPress}
      />
      <button id="search-btn" onClick={handleSearchClick}>
        검색
      </button>
    </fieldset>
  );
}

export default Search;
