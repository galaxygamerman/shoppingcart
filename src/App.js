import './App.css';
import React, { useState } from 'react';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';
function App() {
  const [courses] = useState([
    {
      id: 1,
      name: 'Tech Headphones',
      price: 5999,
      image:
        'https://www.headphonezone.in/cdn/shop/products/V-moda-Crossfade-Codex-Rose-Gold-new-01.jpg?v=1679468410&width=700'
    },
    {
      id: 2,
      name: 'Tech Phone Case',
      price: 1999,
      image:
        'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MPU63?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1678830752232'
    },
    {
      id: 3,
      name: 'Tech Mouse',
      price: 8999,
      image:
        'https://m.media-amazon.com/images/I/714T3kkuhwL._SX522_.jpg'
    }
  ]);

  const [cartCourses, setCartCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState('');

  const addCourseToCartFunction = (GFGcourse) => {
    const alreadyCourses = cartCourses
      .find(item => item.product.id === GFGcourse.id);
    if (alreadyCourses) {
      const latestCartUpdate = cartCourses.map(item =>
        item.product.id === GFGcourse.id ? {
          ...item, quantity: item.quantity + 1
        }
          : item
      );
      setCartCourses(latestCartUpdate);
    } else {
      setCartCourses([...cartCourses, { product: GFGcourse, quantity: 1 }]);
    }
  };

  const deleteCourseFromCartFunction = (GFGCourse) => {
    const updatedCart = cartCourses
      .filter(item => item.product.id !== GFGCourse.id);
    setCartCourses(updatedCart);
  };

  const totalAmountCalculationFunction = () => {
    return cartCourses
      .reduce((total, item) =>
        total + item.product.price * item.quantity, 0);
  };

  const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value);
  };

  const filterCourseFunction = courses.filter((course) =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );
  return (
    <div className="App">
      <SearchComponent searchCourse={searchCourse}
        courseSearchUserFunction=
        {courseSearchUserFunction} />
      <main className="App-main">
        <ShowCourseComponent
          courses={courses}
          filterCourseFunction={filterCourseFunction}
          addCourseToCartFunction={addCourseToCartFunction}
        />

        <UserCartComponent
          cartCourses={cartCourses}
          deleteCourseFromCartFunction={deleteCourseFromCartFunction}
          totalAmountCalculationFunction={
            totalAmountCalculationFunction
          }
          setCartCourses={setCartCourses}
        />
      </main>
    </div>
  );
}

export default App;
