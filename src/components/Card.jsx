import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa'; // Assuming you're using react-icons for the delete icon

function Card(props) {
  const [data, setData] = useState({});
  const [bgColor, setBgColor] = useState('bg-white');
  const [trashColor, setTrashColor] = useState('text-red-600'); // State for trash icon color
  const [isHovered, setIsHovered] = useState(false);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    // Fetch additional data based on the slug prop
    axios.get(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${props.slug}`)
      .then(response => {
        console.log("API Response:", response.data); // Debug API response
        setData(response.data);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
      });
  }, [props.slug]);

  useEffect(() => {
    if (props.category === "Zaroori hai") {
      setBgColor('bg-lime-400');
      setTrashColor('text-red-600');
    } else if (props.category === "Bahut Zaroori hai") {
      setBgColor('bg-yellow-300');
      setTrashColor('text-red-600');
    } else if (props.category === "Dekh lio bhai complicated hai") {
      setBgColor('bg-orange-400');
      setTrashColor('text-black');
    } else if (props.category === "Pakka bhul gaya hoga ab tak") {
      setBgColor('bg-red-600');
      setTrashColor('text-black');
    }
  }, [props.category]);

  const handleClick = () => {
    if (data.link) {
      window.open(data.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    axios.post('https://leetcode-revision.onrender.com/delete-data', { slug: props.slug }, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        setDisplay('hidden');
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
    console.log("Delete icon clicked");
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-3/5 p-6 cursor-pointer mb-6 pl-12 pr-8 border-8 border-transparent hover:border-teal-400 hover:text-blue-950 ${bgColor} ${display}`}
    >
      {isHovered && (
        <FaTrashAlt
          onClick={handleDeleteClick}
          className={`absolute top-4 right-4 ${trashColor} cursor-pointer`}
        />
      )}
      <div className='p-2 text-3xl font-mono'>{data.questionTitle || 'Loading...'}</div>
      <div className='p-2 text-lg'>{props.notes}</div>
      <div className='flex p-2 text-lg'>
        {data.topicTags && data.topicTags.length > 0 ? (
          data.topicTags.map((tag, index) => (
            <div key={index} className='border rounded-lg border-black p-2 mr-2'>
              {tag.name}
            </div>
          ))
        ) : (
          <div className='border rounded-lg border-black p-2'>No tags</div>
        )}
      </div>
    </div>
  );
}

export default Card;
