import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { AuthContext } from '../contexts/AuthContext';

export default function Header({ loginMsg, toggleModal }) {
  const {
    auth: { isAdmin, isLoggedIn, username }
  } = useContext(AuthContext);
  let navigate = useNavigate();
  const handleUserPage = () => {
    navigate(`/userPage/${username}`);
  };

  return (
    <Menu color='blue' size='massive'>
      <Menu.Item as={NavLink} to='/' name='home'>
        <Icon name='home' />
        Home
      </Menu.Item>

      <Menu.Item as={NavLink} to='courses' name='courses'>
        Courses
      </Menu.Item>

      {isAdmin && (
        <Menu.Item as={NavLink} to='admin' name='admin'>
          Admin
        </Menu.Item>
      )}

      <Menu.Menu position='right'>
        {isLoggedIn && (
          <Menu.Item header={true}>
            {isAdmin ? (
              <Icon name='user plus' />
            ) : (
              <Icon as={Button} onClick={handleUserPage} name='user' />
            )}
            {username}
          </Menu.Item>
        )}
        <Menu.Item
          as={NavLink}
          to='login-out'
          onClick={toggleModal}
          name='login-out'
        >
          {loginMsg}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
