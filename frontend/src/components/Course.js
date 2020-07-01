import React, { Component } from 'react';
import { devSchoolClient } from '../modules/apis/devSchool';
import { withRouter } from 'react-router-dom';
import { Card, Avatar, List } from 'antd';
import AddLesson from './addLesson';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

class Course extends Component {
  state = {
    course: {},
    error: false,
    loading: true,
  };

  componentDidMount() {
    devSchoolClient({
      url: `/courses/${this.props.match.params.courseId}`,
    })
      .then(
        ({
          data: {
            data: { data },
          },
        }) => {
          this.setState({ loading: false, course: data });
          console.log(data);
        }
      )
      .catch((error) => {
        this.setState({ loading: false, error: true });
        console.error(error);
      });
  }

  render() {
    if (this.state.error) {
      return <div>Error while getting course details .. </div>;
    }

    if (this.state.loading) {
      return <div>Loading course details .. </div>;
    }

    return (
      <>
        <h3>Lessons</h3>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={this.state.course.lessons}
          renderItem={(course) => (
            
            <List.Item>
              <Card title={course.name}>{course.summary}</Card>
            </List.Item>
            
          )}
        />
        <AddLesson />
      </>
    );
  }
}

export default withRouter(Course);
