import React, {useEffect, useState} from 'react';

import { image1, image2, image3, image4 } from './assets/images';
import { Thumbs, Viewer } from './components';

const title = 'Catalog Viewer';

const getNextIndex = (activeIndex, direction, catalogs) => {
  if (direction > 0 && activeIndex === catalogs.length - 1) {
    return 0;
  } else if (direction < 0 && activeIndex === 0) {
    return (catalogs.length - 1);
  } else {
    return activeIndex + direction;
  }
}

export function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);
  const [slideDuration] = useState(3000);

  useEffect(() => {
    return () => clearInterval(slideTimer)
  }, []);
  const onCheckboxChange = (value) => {
    if (value) {
      createTimer();
    } else {
      deleteTimer();
    }
  }

  const moveTo = (direction) => {
    setActiveIndex(getNextIndex(activeIndex, direction, catalogs));
  }

  const createTimer = () => {
    const interval = setInterval(() =>   {
      setActiveIndex(
          activeIndex => getNextIndex(activeIndex, 1, catalogs)
      );
    }, slideDuration)
    setSlideTimer(interval);
  }

  const deleteTimer = () => {
    clearInterval(slideTimer);
    setSlideTimer(null);
  }

  return (
    <>
      <div className='title-container'>
        <h1>{title}</h1>
      </div>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className='layout-row justify-content-center align-items-center mt-20'>
              <button
                  onClick={() => moveTo(-1)}
                className='icon-only outlined'
                data-testid='prev-slide-btn'>
                <i className='material-icons'>arrow_back</i>
              </button>
              <Thumbs onSelect={(i) => setActiveIndex(i)} items={catalogs} currentIndex={activeIndex} />
              <button
                  onClick={() => moveTo(1)}
                className='icon-only outlined'
                data-testid='next-slide-btn'>
                <i className='material-icons'>arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input type='checkbox' checked={slideTimer !== null} onChange={(e) => onCheckboxChange(e.target.checked)} data-testid='toggle-slide-show-button' />
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </>
  );
}
