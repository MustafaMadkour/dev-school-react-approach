import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { devSchoolClient } from '../modules/apis/devSchool';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    const {
      courseDescription,
      courseName,
      courseNumber,
      coursePoints,
      courseSlug,
      courseSummary,
    } = values;

    devSchoolClient
      .post('/courses', {
        name: courseName,
        points: coursePoints,
        summary: courseSummary,
        description: courseDescription,
        imageCover: `./covers/${courseName}-cover.jpg`,
        images: [
          `https://dummyimage.com/300x200/00ebd0/ffffff&text=course+${courseNumber}+image`,
        ],
      })
      .then((response) => {
        console.log(`source number ${courseNumber} added!`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label='course number'
        name='courseNumber'
        rules={[
          {
            required: true,
            message: 'Please input your courseNumber!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='course name'
        name='courseName'
        rules={[
          {
            required: true,
            message: 'Please input your courseName!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='course slug'
        name='courseSlug'
        rules={[
          {
            required: true,
            message: 'Please input your courseSlug!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='course points'
        name='coursePoints'
        rules={[
          {
            required: true,
            message: 'Please input your coursePoints!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='course summary'
        name='courseSummary'
        rules={[
          {
            required: true,
            message: 'Please input your summary!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='course description'
        name='courseDescription'
        rules={[
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
