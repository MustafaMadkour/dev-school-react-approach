import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DropboxOutlined,
} from '@ant-design/icons';
import Courses from './components/Courses';
import Course from './components/Course';
import AddCourse from './components/addCourse';

const { Header, Sider, Content } = Layout;



export default class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className='logo' />
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
              <Menu.Item key='1' icon={<VideoCameraOutlined />}>
                <Link to='/'>Courses</Link>
              </Menu.Item>
              <Menu.Item key='2' icon={<VideoCameraOutlined />}>
                <Link to='/add-course'>Add course</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className='site-layout'>
            <Header className='site-layout-background' style={{ padding: 0 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                }
              )}
            </Header>
            <Content
              className='site-layout-background'
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route exact path='/'>
                  <Courses />
                </Route>
                <Route path='/courses/:courseId'>
                  <Course />
                </Route>
                <Route path='/add-course'>
                  <AddCourse />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
