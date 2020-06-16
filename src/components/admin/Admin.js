import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Admin() {
  const [activeItem, setActiveItem] = useState('');
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  return (
    <React.Fragment>
      <Menu tabular>
        <Menu.Item
          as={NavLink}
          to='coursesAdmin'
          name='Course'
          active={activeItem === 'Course'}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          to='instructorAdmin'
          name='Instructor'
          active={activeItem === 'Instructor'}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          to='yogaClassAdmin'
          name='Yoga Class'
          active={activeItem === 'Yoga Class'}
          onClick={handleItemClick}
        />
      </Menu>
      <Outlet />
    </React.Fragment>
  );
}
