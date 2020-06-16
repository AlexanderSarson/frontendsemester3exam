import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import facade from '../api/apiFacade';
import { Card, Divider } from 'semantic-ui-react';

export default function UserPage() {
  const initialState = {
    name: '',
    email: '',
    signedUp: []
  };
  let { user } = useParams();
  const [student, setStudent] = useState(initialState);
  useEffect(() => {
    facade.fetchData(`/api/student/name/${user}`).then((json) => {
      setStudent(json);
    });
  }, [user]);

  return (
    <React.Fragment>
      <h1>Welcome back {student.name}</h1>
      <h3>Email: {student.email}</h3>
      <Divider />
      <h1>Your signed up classes</h1>
      <Card.Group divided='true'>
        {student.signedUp.map((sign) => (
          <PrintYogaClassCard
            key={sign.id}
            yogaClass={sign.yogaClass}
            paid={sign.datePaid}
          />
        ))}
      </Card.Group>
    </React.Fragment>
  );
}

function PrintYogaClassCard({ yogaClass, paid }) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{yogaClass.course.courseName}</Card.Header>
        <Card.Description>
          Max Participants: {yogaClass.maxParticipants}
        </Card.Description>
        <Card.Description>Price: {yogaClass.price} DKK</Card.Description>
        <Card.Description>Paid: {paid}</Card.Description>
      </Card.Content>
    </Card>
  );
}
