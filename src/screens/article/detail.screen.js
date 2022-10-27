import React, {useState, useEffect} from 'react';
import {AuthLayout} from '@layouts';
import api from '@services/api';
import {ScrollView} from 'react-native';

const ArticleDetailScreen = ({route}) => {
  const {articleId} = route.params;
  const [article, setArticle] = useState({});

  useEffect(() => {
    const getArticle = async () => {
      await api.article
        .getArticle(articleId)
        .then(response => {
          setArticle(response.data);
        })
        .catch(error => console.log('error', error));
    };
    getArticle();
  }, [articleId]);

  return (
    <AuthLayout>
      <ScrollView></ScrollView>
    </AuthLayout>
  );
};

const markdownStyles = {
  heading1: {
    fontSize: 18,
    color: 'purple',
  },
  link: {
    color: 'pink',
  },
  mailTo: {
    color: 'orange',
  },
  text: {
    color: '#555555',
  },
};

export default ArticleDetailScreen;
