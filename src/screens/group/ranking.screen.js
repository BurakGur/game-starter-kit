import React, {useEffect, useState} from 'react';
import {AppBox, AppButton, AppText} from '@/components';
import {GameLayout} from '@/layouts';
import {collection} from '@/utils/firebase';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';

const GroupRanking = ({navigation}) => {
  const user = useRecoilValue(userState);
  const [groups, setGroups] = useState([]);

  const setGroupScore = group => {
    const groupsWithScore = {...group};
    groupsWithScore.users.forEach((groupUser, index) => {
      console.log(index, groupUser);
      if (groupUser === user.username) {
        groupsWithScore.users[index] = {
          username: groupUser,
          score: user.score,
        };
      }
    });
    return groupsWithScore;
  };

  useEffect(() => {
    collection('Groups')
      .where('users', 'array-contains', user.username)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(element => {
          const group = element.data();
          const groupWithScore = setGroupScore(group);
          data.push(groupWithScore);
        });
        console.log('data', data);
        setGroups(data);
      });
    console.log('groups', groups);
  }, []);

  return (
    <GameLayout>
      <AppBox flexDirection="column">
        {groups.map(group => (
          <>
            <AppText>{group.groupname}</AppText>
            {group.users.map(groupUser => (
              <AppText>
                {groupUser.username}: {groupUser.score}
              </AppText>
            ))}
          </>
        ))}
        <AppButton title="Grup Kur" onPress={() => navigation.navigate('CreateGroup')}></AppButton>
      </AppBox>
    </GameLayout>
  );
};

export default GroupRanking;
