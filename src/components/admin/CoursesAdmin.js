import React, { useEffect, useState } from 'react';
import facade from '../../api/apiFacade';
import { Divider, Form, Card, Button } from 'semantic-ui-react';

export default function CoursesAdmin() {
  const initialStateEditCourse = {
    id: null,
    courseName: '',
    description: ''
  };
  const [courses, setCourses] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [editCourse, setEditCourse] = useState(initialStateEditCourse);

  useEffect(() => {
    facade
      .fetchData('/api/course/all')
      .then((response) => setCourses(response));
  }, [loadData]);

  const onSubmitNewCourse = (course) => {
    facade
      .avancedFetchData('/api/course', facade.makeOptions('POST', true, course))
      .then(() => {
        setLoadData(!loadData);
      });
  };

  const onSubmitEditCourse = (course) => {
    facade
      .avancedFetchData('/api/course', facade.makeOptions('PUT', true, course))
      .then(() => {
        setEditCourse(initialStateEditCourse);
        setLoadData(!loadData);
      });
  };

  const deleteCourse = (course) => {
    facade
      .avancedFetchData(
        '/api/course',
        facade.makeOptions('DELETE', true, course)
      )
      .then(() => {
        setLoadData(!loadData);
      });
  };

  const editCourses = (course) => {
    setEditCourse(course);
  };

  return (
    <React.Fragment>
      <h1>Courses</h1>
      <PrintCourseCards
        courses={courses}
        deleteCourse={deleteCourse}
        editCourses={editCourses}
      />
      <h3>Edit Course</h3>
      <EditCourse
        editCourse={editCourse}
        onSubmitEditCourse={onSubmitEditCourse}
      />
      <Divider horizontal />
      <h3>New Course</h3>
      <NewCourse onSubmitNewCourse={onSubmitNewCourse} />
    </React.Fragment>
  );
}

function EditCourse({ editCourse, onSubmitEditCourse }) {
  const [course, setCourse] = useState({ courseName: '', description: '' });

  useEffect(() => {
    setCourse(editCourse);
  }, [editCourse]);

  const onChange = (evt) => {
    setCourse({ ...editCourse, [evt.target.id]: evt.target.value });
  };
  return (
    <Form
      onSubmit={() => {
        onSubmitEditCourse(course);
      }}
    >
      <Form.Group>
        <Form.Input
          placeholder='Course name'
          id='courseName'
          name='name'
          value={course.courseName}
          onChange={onChange}
        />
        <Form.Input
          placeholder='Description'
          id='description'
          name='description'
          value={course.description}
          onChange={onChange}
        />
        <Form.Button content='Submit' />
      </Form.Group>
    </Form>
  );
}

function NewCourse({ onSubmitNewCourse }) {
  const initialCourse = {
    courseName: '',
    description: ''
  };
  const [course, setCourse] = useState(initialCourse);
  const onChange = (evt) => {
    setCourse({ ...course, [evt.target.id]: evt.target.value });
  };
  return (
    <Form
      onSubmit={() => {
        onSubmitNewCourse(course);
        setCourse(initialCourse);
      }}
    >
      <Form.Group>
        <Form.Input
          placeholder='Course name'
          id='courseName'
          name='name'
          value={course.courseName}
          onChange={onChange}
        />
        <Form.Input
          placeholder='Description'
          id='description'
          name='description'
          value={course.description}
          onChange={onChange}
        />
        <Form.Button content='Submit' />
      </Form.Group>
    </Form>
  );
}

function PrintCourseCards({ courses, deleteCourse, editCourses }) {
  return (
    <React.Fragment>
      <Card.Group>
        {courses.map((course) => (
          <PrintCourseCard
            key={course.id}
            course={course}
            deleteCourse={deleteCourse}
            editCourses={editCourses}
          />
        ))}
      </Card.Group>
    </React.Fragment>
  );
}

function PrintCourseCard({ course, deleteCourse, editCourses }) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{course.courseName}</Card.Header>
        <Card.Description>{course.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => editCourses(course)}>
            Edit
          </Button>
          <Button basic color='red' onClick={() => deleteCourse(course)}>
            Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
