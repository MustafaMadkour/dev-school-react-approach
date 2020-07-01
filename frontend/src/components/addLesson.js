import React from 'react';
import ReactDOM from 'react-dom';
import { devSchoolClient } from '../modules/apis/devSchool';
import 'antd/dist/antd.css';
import '../index.css';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class AddLesson extends React.Component {
  state = { visible: false };
  onFinish = (values) => {
    console.log('Success:', values);
    const {
      lessonName,
      courseName,
      lessonSummary,
    } = values;

    devSchoolClient
      .post('/courses', {
        name: lessonName,
        course: courseName,
        summary: lessonSummary,
      })
      .then((response) => {
        console.log(`source number ${lessonName} added!`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> New lesson
        </Button>
        <Drawer
          title="Create a new lesson"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onFinish} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter lesson name' }]}
                >
                  <Input placeholder="Please enter lesson name" />
                </Form.Item>
              </Col>
              
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="course"
                  label="Course"
                  rules={[{ required: true, message: 'Please enter course name' }]}
                >
                  <Input placeholder="Please enter course name" />
                </Form.Item>
              </Col>
              
            </Row>
            
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="summary"
                  label="Summary"
                  rules={[
                    {
                      required: true,
                      message: 'please enter lesson summary',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter lesson summary" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

