import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Layout, Menu, Breadcrumb, Card as AntCard, Row, Col, Modal } from 'antd';
import { Card as BsCard, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Header, Content, Footer } = Layout;

// Верхнее меню
const items1 = ['Мультики', 'Фильмы', 'Игры'].map((label, index) => ({
  key: String(index + 1),
  label,
}));

const App = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Получение данных с API
  useEffect(() => {
    axios
      .get('https://zhamal-tv.netlify.app/cartoons/get_all')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  // Примеры фильмов с YouTube
  const movies = [
    { title: 'Puss in Boots 1', url: 'https://www.youtube.com/embed/t6-2M49KV68' },
    { title: 'Quens dog 1', url: 'https://www.youtube.com/embed/bZP_3CU7EsQ' },
    { title: 'Turning Red1', url: 'https://www.youtube.com/embed/KZcqB7xsqMA' },
    { title: 'Neja 2', url: 'https://www.youtube.com/embed/_9Y13VNYUPI' },
  ];

  return (
    <Layout>
      {/* Шапка */}
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>LOGO</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1 }}
        />
      </Header>

      {/* Основной контент */}
      <Layout style={{ padding: '24px', background: '#a373ff' }}>
        <Breadcrumb style={{ margin: '16px 0', color: 'white' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <Content style={{ padding: 24, minHeight: 280, background: '#a373ff', borderRadius: 10 }}>
          {/* Карточки фильмов */}
          <Row gutter={[16, 16]}>
            {movies.map((movie, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <AntCard title={movie.title} hoverable>
                  <iframe
                    width="100%"
                    height="200"
                    src={movie.url}
                    title={movie.title}
                    frameBorder="0"
                    allowFullScreen
                  />
                </AntCard>
              </Col>
            ))}
          </Row>

          {/* Карточки с API */}
          <Row className="mt-4" gutter={[16, 16]}>
            {data.map(item => (
              <Col md={4} key={item.id}>
                <div className="hover-card-container">
                  <BsCard
                    className="hover-card"
                    onClick={() => {
                      setSelectedItem(item);
                      setModalVisible(true);
                    }}
                  >
                    <CardImg top src={item.posterPath} alt={item.title} />
                    <CardBody>
                      <CardTitle tag="h5">{item.title}</CardTitle>
                      <CardText>{item.description || item.summary || item.content}</CardText>
                    </CardBody>
                  </BsCard>
                </div>
              </Col>
            ))}
          </Row>
        </Content>

        {/* Футер */}
        <Footer style={{ textAlign: 'center', background: '#9b5cff', color: 'white', marginTop: 24 }}>
          <div style={{ fontWeight: 'bold', fontSize: 18 }}>LOGO</div>
          <div>Made by Dildora</div>
          <div>© 2026 Все права защищены</div>
        </Footer>
      </Layout>

      {/* Модальное окно с картинками и описанием */}
      <Modal
        title={selectedItem?.title}
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <Row gutter={[16, 16]}>
          {selectedItem?.images?.map((img, i) => (
            <Col span={8} key={i}>
              <img src={img} alt={`img-${i}`} style={{ width: '100%', borderRadius: 10 }} />
            </Col>
          ))}
        </Row>

        {/* Краткое описание */}
        {selectedItem && (
          <div style={{ marginTop: 16 }}>
            <h4>Описание:</h4>
            <p>
              {selectedItem.description ||
               selectedItem.summary ||
               selectedItem.content ||
               'Яркий и увлекательный мир, полный забавных героев, удивительных приключений и волшебных историй. Каждая серия раскрывает новые эмоции, смешные ситуации и маленькие уроки дружбы, смелости и творчества'}
            </p>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default App;
