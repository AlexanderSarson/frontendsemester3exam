import React, { useEffect, useState } from 'react';
import facade from '../../api/apiFacade';
import { Divider, Form, Card, Button } from 'semantic-ui-react';

export default function InstructorAdmin() {
  const initialStateEditInstructor = {
    id: null,
    name: ''
  };
  const [instructors, setInstructors] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [editInstructor, setEditInstructor] = useState(
    initialStateEditInstructor
  );

  useEffect(() => {
    facade
      .fetchData('/api/instructor/all')
      .then((response) => setInstructors(response));
  }, [loadData]);

  const onSubmitNewInstructor = (instructor) => {
    facade
      .avancedFetchData(
        '/api/instructor',
        facade.makeOptions('POST', true, instructor)
      )
      .then(() => {
        setLoadData(!loadData);
      });
  };

  const onSubmitEditInstructor = (instructor) => {
    facade
      .avancedFetchData(
        '/api/instructor',
        facade.makeOptions('PUT', true, instructor)
      )
      .then(() => {
        setEditInstructor(initialStateEditInstructor);
        setLoadData(!loadData);
      });
  };

  const deleteInstructor = (instructor) => {
    facade
      .avancedFetchData(
        '/api/instructor',
        facade.makeOptions('DELETE', true, instructor)
      )
      .then(() => {
        setLoadData(!loadData);
      });
  };

  const editInstructors = (instructor) => {
    setEditInstructor(instructor);
  };

  return (
    <React.Fragment>
      <h1>Instructors</h1>
      <PrintInstructorCards
        instructors={instructors}
        deleteInstructor={deleteInstructor}
        editInstructors={editInstructors}
      />
      <h3>Edit Instructor</h3>
      <EditInstructor
        editInstructor={editInstructor}
        onSubmitEditInstructor={onSubmitEditInstructor}
      />
      <Divider horizontal />
      <h3>New Instructor</h3>
      <NewInstructor onSubmitNewInstructor={onSubmitNewInstructor} />
    </React.Fragment>
  );
}

function EditInstructor({ editInstructor, onSubmitEditInstructor }) {
  const [instructor, setInstructor] = useState({ name: '' });

  useEffect(() => {
    setInstructor(editInstructor);
  }, [editInstructor]);

  const onChange = (evt) => {
    setInstructor({ ...instructor, [evt.target.id]: evt.target.value });
  };
  return (
    <Form
      onSubmit={() => {
        onSubmitEditInstructor(instructor);
      }}
    >
      <Form.Group>
        <Form.Input
          placeholder='Name'
          id='name'
          name='name'
          value={instructor.name}
          onChange={onChange}
        />
        <Form.Button content='Submit' />
      </Form.Group>
    </Form>
  );
}

function NewInstructor({ onSubmitNewInstructor }) {
  const initialInstructor = {
    name: ''
  };
  const [instructor, setInstructor] = useState(initialInstructor);
  const onChange = (evt) => {
    setInstructor({ ...instructor, [evt.target.id]: evt.target.value });
  };
  return (
    <Form
      onSubmit={() => {
        onSubmitNewInstructor(instructor);
        setInstructor(initialInstructor);
      }}
    >
      <Form.Group>
        <Form.Input
          placeholder='Name'
          id='name'
          name='name'
          value={instructor.name}
          onChange={onChange}
        />
        <Form.Button content='Submit' />
      </Form.Group>
    </Form>
  );
}

function PrintInstructorCards({
  instructors,
  deleteInstructor,
  editInstructors
}) {
  return (
    <React.Fragment>
      <Card.Group divided='true'>
        {instructors.map((instructor) => (
          <PrintInstructorCard
            key={instructor.id}
            instructor={instructor}
            deleteInstructor={deleteInstructor}
            editInstructors={editInstructors}
          />
        ))}
      </Card.Group>
    </React.Fragment>
  );
}

function PrintInstructorCard({
  instructor,
  deleteInstructor,
  editInstructors
}) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{instructor.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button
            basic
            color='green'
            onClick={() => editInstructors(instructor)}
          >
            Edit
          </Button>
          <Button
            basic
            color='red'
            onClick={() => deleteInstructor(instructor)}
          >
            Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
