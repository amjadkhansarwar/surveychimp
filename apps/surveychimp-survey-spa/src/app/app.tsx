
import styled from 'styled-components';
import SurveyPage from './pages/SurveyPage';

import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';
import healthCheck from '../api/healtcheck';



const StyledApp = styled.div`
    // Your style here
`;


export function App() {

  useEffect(() => { 
    const pageStatus = async () => {
      const res =  await healthCheck();
    if(res && res.message) {
      console.log(res.message);
    }else{
      console.log('Backed is not running');
    }
  }
    pageStatus();
    }, []);
  return (
    <StyledApp>
      <Routes>
        <Route
          path="/survey/:surveyId"
          element={<SurveyPage />}
        />
        <Route
          path="/"
          element={<div>Du är på förstasidan</div>} />
      </Routes>
    </StyledApp>
  );

}


export default App;
