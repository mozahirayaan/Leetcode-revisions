import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import '../index.css';
import Card from '../components/Card';


function Dashboard(props) {
  const [data, setData] = useState([]);
  const [type,setType]=useState('All');
  
  useEffect(() => {
    if (props.user) {
      axios.post('https://leetcode-revision.onrender.com/get-data', {
        googleId: props.user.sub,  // This is typically the Google ID
        username: props.user.email,
        name: props.user.name
      })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
    }
  }, [props.user]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  return (
    <>
      <div className='flex justify-center p-11 text-white'>
        <div className='bg-black text-4xl p-6'>{props.user.name} DSA Revision Sheet</div>
      </div>
      <div className='flex justify-center mb-6'>
        <div className='flex w-3/5 justify-end'>
        <select className='h-8 rounded-md' onChange={handleTypeChange} value={type}>
          <option>All</option>
          <option>Zaroori hai</option>
          <option>Bahut Zaroori hai</option>
          <option>Dekh lio bhai complicated hai</option>
          <option>Pakka bhul gaya hoga ab tak</option>
        </select>
        </div>
      </div>
      <div className='flex flex-wrap justify-center'>
      {data.map((item, index) => (
    (item.category === type || type === 'All') ? (
      <Card 
        className="mb-6"
        key={index}
        slug={item.url}
        category={item.category}
        notes={item.notes} user={props.user}
      />
    ) : null
  ))}
      </div>
    </>
  );
}

export default Dashboard;
