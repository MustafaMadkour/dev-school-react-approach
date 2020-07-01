import React, { Component } from 'react';
import { devSchoolClient } from '../modules/apis/devSchool';
import { Alert, List, Card, Space, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class App extends Component {
  state = {
    courses: [],
    courses_error: false,
  };
  componentDidMount() {
    // console.log('componentDidMount!');
    // this.setState({courses: ['ahmed', 'mustafa']});

    devSchoolClient({
      url: '/courses',
    })
      .then(
        ({
          data: {
            data: { data },
          },
        }) => {
          console.log(data);
          this.setState({ courses: data });
        }
      )
      .catch((error) => {
        console.log(error);
        this.setState({
          courses_error: true,
        });
      });
  }

  render() {
    if (this.state.courses_error) {
      return <Alert message='could not fetch courses' type='error' />;
    }

    return (
      <List
        itemLayout='vertical'
        size='large'
        dataSource={this.state.courses}
        renderItem={(course) => (
          <List.Item
            key={course._id}
            actions={[
              <IconText
                icon={StarOutlined}
                text='156'
                key='list-vertical-star-o'
              />,
              <IconText
                icon={LikeOutlined}
                text='156'
                key='list-vertical-like-o'
              />,
              <IconText
                icon={MessageOutlined}
                text='2'
                key='list-vertical-message'
              />,
            ]}
            extra={<img width={272} alt='course' src={course.imageCover} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={course.imageCover} />}
              title={<Link to={`/courses/${course._id}`}>{course.name}</Link>}
              description={course.description}
            />
            {course.summary}
          </List.Item>
        )}
      />
    );
  }
}

export default App;
