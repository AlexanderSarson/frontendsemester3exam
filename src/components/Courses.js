import React, { useState, useEffect } from 'react';
import facade from '../api/apiFacade';
import { Divider, Item } from 'semantic-ui-react';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    facade.fetchData('/api/course/all').then((json) => {
      setCourses(json);
    });
  }, []);
  return (
    <React.Fragment>
      <PrintCourses courses={courses} />
    </React.Fragment>
  );
}

function PrintCourses({ courses }) {
  return (
    <React.Fragment>
      <Item.Group divided>
        {courses.map((course) => (
          <PrintCourseItem key={course.id} course={course} />
        ))}
      </Item.Group>
    </React.Fragment>
  );
}

function PrintCourseItem({ course }) {
  return (
    <Item>
      <Item.Image src='https://cbdforum.dk/wp-content/uploads/2020/01/cbd-yoga.jpg' />

      <Item.Content>
        <Item.Header as='a'>{course.courseName}</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>{course.description}</Item.Description>
        <Item.Extra>Available Classes</Item.Extra>
        <Divider></Divider>
        {course.yogaClass.map((yogaClass) => (
          <PrintYogaClass key={yogaClass.id} yogaClass={yogaClass} />
        ))}
      </Item.Content>
    </Item>
  );
}

function PrintYogaClass({ yogaClass }) {
  return (
    <Item>
      <Item.Content>
        <Item.Header>Yoga class {yogaClass.id}</Item.Header>
        <Item.Extra>Max participants: {yogaClass.maxParticipants}</Item.Extra>
        <Item.Extra>Price: {yogaClass.price} DKK</Item.Extra>
        <Item.Extra>
          Instructor:{' '}
          {yogaClass.instructors
            .map((instructor) => instructor.name)
            .join(', ')}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
