import React, {useEffect, useState} from 'react';
import {AppBox, AppButton, AppText} from '@/components';
import {GameLayout} from '@/layouts';
import {collection} from '@/utils/firebase';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import {redis} from '@/utils/redis';

const GroupRanking = ({navigation}) => {
  const user = useRecoilValue(userState);
  const [groups, setGroups] = useState([]);

  const setGroupScore = async group => {
    const groupsWithScore = {...group};
    groupsWithScore.users.forEach(async (groupUser, index) => {
      let score = 0;
      if (groupUser.username === user.username) {
        score = user.score;
      } else {
        async () => (score = await redis.get(groupUser.username));
      }
      groupsWithScore.users[index].score = score;
    });

    groupsWithScore.users.sort((a, b) => a.score < b.score);

    return groupsWithScore;
  };

  useEffect(() => {
    collection('Groups')
      .where('users', 'array-contains', {
        username: user.username,
        isActive: true,
      })
      .get()
      .then(async snapshot => {
        snapshot.forEach(async element => {
          const group = element.data();
          const groupWithScore = await setGroupScore(group);
          setGroups(oldGroups => [...oldGroups, groupWithScore]);
        });
      });
  }, []);

  return (
    <GameLayout>
      <AppBox flexDirection="column">
        {groups.map((group, index) => (
          <AppBox key={index} flexDirection="column">
            <AppText>Group: {group.groupNick}</AppText>
            <AppButton
              title="Grup Ayarları"
              onPress={() =>
                navigation.navigate('GroupSettings', {
                  groupName: group.groupName,
                })
              }
            />
            {group?.users?.map(groupUser => (
              <AppText key={groupUser.username}>
                {groupUser.username}: {groupUser.score}
              </AppText>
            ))}
          </AppBox>
        ))}
        <AppButton title="Grup Kur" onPress={() => navigation.navigate('CreateGroup')}></AppButton>
      </AppBox>
    </GameLayout>
  );
};

export default GroupRanking;
