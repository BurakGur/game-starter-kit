import React, {useEffect, useState} from 'react';
import {ArticleListLayout} from '@layouts';
import {Text, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import api from '@services/api';
import styled from 'styled-components/native';
import {themeState} from '@/store/selectors';
import {ArticleCard} from '@/components';

const ArticleListScreen = ({navigation}) => {
  const user = useRecoilValue(userState);
  const theme = useRecoilValue(themeState);
  const [articles, setArticles] = useState([]);

  const getArticleList = async () => {
    await api.article
      .articleList(1)
      .then(response => {
        console.log('response', response);
        setArticles(response.data);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    getArticleList();
  }, []);

  return (
    <ArticleListLayout>
      {articles.map(article => (
        <ArticleCard
          onPress={() =>
            navigation.navigate('ArticleDetail', {
              articleId: article._id,
            })
          }
          title={article.title}
          description={article.description}
          createdDate={article.createdAt}
          key={article._id}
        />
      ))}
    </ArticleListLayout>
  );
};

export default ArticleListScreen;
