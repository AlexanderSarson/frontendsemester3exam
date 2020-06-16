import React, { useEffect, useState } from 'react';
import facade from '../../api/apiFacade';
import { Divider, Form, Card, Button, Label } from 'semantic-ui-react';

export default function YogaClassAdmin() {
  const initialState = {
    maxParticipants: 0,
    price: 0,
    course: { courseName: '' },
    instructors: []
  };
  const [yogaClasses, setYogaClasses] = useState([]);
  const [editYogaClass, setEditYogaClass] = useState(initialState);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    facade
      .fetchData('/api/yogaclass/all')
      .then((response) => setYogaClasses(response));
  }, [loadData]);

  const onSubmitNewYogaClass = (yogaClass) => {
    facade
      .avancedFetchData(
        '/api/yogaclass',
        facade.makeOptions('POST', true, yogaClass)
      )
      .then(() => {
        setLoadData(!loadData);
      });
  };

  const onSubmitEditYogaClass = (yogaClass) => {
    facade
      .avancedFetchData(
        '/api/yogaclass',
        facade.makeOptions('PUT', true, yogaClass)
      )
      .then(() => {
        setLoadData(!loadData);
        setEditYogaClass(initialState);
      });
  };

  const deleteYogaClass = (yogaClass) => {
    facade
      .avancedFetchData(
        '/api/yogaclass',
        facade.makeOptions('DELETE', true, yogaClass)
      )
      .then(() => {
        setLoadData(!loadData);
      });
  };

  return (
    <React.Fragment>
      <h1>Yoga Classes</h1>
      <PrintYogaClassCards
        yogaClasses={yogaClasses}
        deleteYogaClass={deleteYogaClass}
        setEditYogaClass={setEditYogaClass}
      />
      <h3>Edit Yoga Classes</h3>
      <EditYogaClass
        onSubmitEditYogaClass={onSubmitEditYogaClass}
        editYogaClass={editYogaClass}
      />
      <Divider horizontal />
      <h3>New Yoga Class</h3>
      <NewYogaClass onSubmitNewYogaClass={onSubmitNewYogaClass} />
    </React.Fragment>
  );
}

function EditYogaClass({ editYogaClass, onSubmitEditYogaClass }) {
  const [yogaClass, setYogaClass] = useState({ maxParticipants: 0, price: 0 });
  useEffect(() => {
    setYogaClass(editYogaClass);
  }, [editYogaClass]);
  const onChange = (evt) => {
    setYogaClass({ ...yogaClass, [evt.target.id]: evt.target.value });
  };
  return (
    <React.Fragment>
      <Form
        onSubmit={() => {
          onSubmitEditYogaClass(yogaClass);
        }}
      >
        <Form.Group>
          <Label>Participants</Label>
          <Form.Input
            type='number'
            placeholder='maxParticipants'
            id='maxParticipants'
            name='maxParticipants'
            value={yogaClass.maxParticipants}
            onChange={onChange}
          />
          <Label>Price</Label>
          <Form.Input
            type='number'
            placeholder='price'
            id='price'
            name='price'
            value={yogaClass.price}
            onChange={onChange}
          />
          <Form.Button content='Submit' />
        </Form.Group>
      </Form>
    </React.Fragment>
  );
}

function NewYogaClass({ onSubmitNewYogaClass }) {
  const initialState = {
    maxParticipants: 0,
    price: 0,
    course: { courseName: '' },
    instructors: []
  };
  const [yogaClass, setYogaClass] = useState(initialState);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    facade
      .fetchData('/api/course/all')
      .then((response) => setCourses(response));
    facade
      .fetchData('/api/instructor/all')
      .then((response) => setInstructors(response));
  }, []);

  const onChange = (evt, { id }) => {
    if (id === 'course') {
      setYogaClass({
        ...yogaClass,
        course: courses.find(
          (course) => course.courseName === evt.target.textContent
        )
      });
    } else if (id === 'instructors') {
      setYogaClass({
        ...yogaClass,
        instructors: [
          ...yogaClass.instructors,
          instructors.find(
            (instructor) => instructor.name === evt.target.textContent
          )
        ]
      });
    } else {
      setYogaClass({ ...yogaClass, [evt.target.id]: evt.target.value });
    }
  };

  return (
    <Form
      onSubmit={() => {
        onSubmitNewYogaClass(yogaClass);
        setYogaClass(initialState);
      }}
    >
      <Form.Group>
        <Label>Participants</Label>
        <Form.Input
          type='number'
          placeholder='maxParticipants'
          id='maxParticipants'
          name='maxParticipants'
          value={yogaClass.maxParticipants}
          onChange={onChange}
        />
        <Label>Price</Label>
        <Form.Input
          type='number'
          placeholder='price'
          id='price'
          name='price'
          value={yogaClass.price}
          onChange={onChange}
        />
        <Form.Dropdown
          placeholder='Select Course'
          selection
          options={courses.map((course) => ({
            key: course.id,
            text: course.courseName,
            value: course.id
          }))}
          id='course'
          onChange={onChange}
        />
        <Form.Dropdown
          placeholder='Select Instructor'
          selection
          options={instructors.map((instructor) => ({
            key: instructor.id,
            text: instructor.name,
            value: instructor.id
          }))}
          id='instructors'
          onChange={onChange}
        />
        <Form.Button content='Submit' />
      </Form.Group>
    </Form>
  );
}

function PrintYogaClassCards({
  yogaClasses,
  deleteYogaClass,
  setEditYogaClass
}) {
  return (
    <React.Fragment>
      <Card.Group divided='true'>
        {yogaClasses.map((yogaClass) => (
          <PrintYogaClassCard
            key={yogaClass.id}
            yogaClass={yogaClass}
            deleteYogaClass={deleteYogaClass}
            setEditYogaClass={setEditYogaClass}
          />
        ))}
      </Card.Group>
    </React.Fragment>
  );
}

function PrintYogaClassCard({ yogaClass, deleteYogaClass, setEditYogaClass }) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{yogaClass.course.courseName}</Card.Header>
        <Card.Description>
          Max Participants: {yogaClass.maxParticipants}
        </Card.Description>
        <Card.Description>Price: {yogaClass.price} DKK</Card.Description>
        <PrintYogaClassInstructors instructors={yogaClass.instructors} />
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button
            basic
            color='green'
            onClick={() => setEditYogaClass(yogaClass)}
          >
            Edit
          </Button>
          <Button basic color='red' onClick={() => deleteYogaClass(yogaClass)}>
            Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

function PrintYogaClassInstructors({ instructors }) {
  return (
    <React.Fragment>
      {instructors.map((instructor) => (
        <Card.Description key={instructor.id}>
          instructor: {instructor.name}
        </Card.Description>
      ))}
    </React.Fragment>
  );
}
