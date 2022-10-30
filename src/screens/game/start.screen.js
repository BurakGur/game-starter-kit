import React, {useEffect, useState} from 'react';
import {GameLayout} from '@layouts';
import {Text, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import api from '@services/api';
import styled from 'styled-components/native';
import {themeState} from '@/store/selectors';
import {AppButton, AppText, ArticleCard} from '@/components';

const GameStartScreen = ({navigation}) => {
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
    <GameLayout>
      <AppText>Username: {user.username}</AppText>
      <AppText>Score: {user.score}</AppText>
      <AppButton onPress={() => navigation.navigate('PlayScreen')} title="Oyuna Başla" />
    </GameLayout>
  );
};

export default GameStartScreen;
