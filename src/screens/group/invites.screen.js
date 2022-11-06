import React, {useEffect, useState} from 'react';
import {AppBox, AppButton, AppText} from '@/components';
import {GameLayout} from '@/layouts';
import {collection} from '@/utils/firebase';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/atoms';
import {redis} from '@/utils/redis';

const GroupInvites = ({navigation}) => {
  const user = useRecoilValue(userState);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    collection('Groups')
      .where('users', 'array-contains', {
        username: user.username,
        isActive: false,
      })
      .get()
      .then(async snapshot => {
        snapshot.forEach(async element => {
          const invite = element.data();
          setInvites(oldInvites => [...oldInvites, {...invite, docId: element.id}]);
        });
      });
  }, []);

  const approveInvite = index => {
    const approvedInvite = {...invites[index]};
    const userIndex = approvedInvite.users.findIndex(groupUser => groupUser.username === user.username);
    approvedInvite.users[userIndex].isActive = true;
    collection('Groups').doc(approvedInvite.docId).update(approvedInvite);
    const newInvites = [...invites];
    newInvites.splice(index, 1);
    setInvites(newInvites);
  };

  const rejectInvite = index => {
    const rejectedInvite = {...invites[index]};
    const userIndex = rejectedInvite.users.findIndex(groupUser => groupUser.username === user.username);
    rejectedInvite.users.splice(userIndex, 1);
    collection('Groups').doc(rejectedInvite.docId).update(rejectedInvite);
    const newInvites = [...invites];
    newInvites.splice(index, 1);
    setInvites(newInvites);
  };

  return (
    <GameLayout>
      <AppBox flexDirection="column">
        <AppText>Davetler ({invites.length})</AppText>
        {invites.map((invite, index) => (
          <AppBox key={invite.groupName} flexDirection="column">
            <AppText>{invite.groupNick}</AppText>
            <AppButton onPress={() => approveInvite(index)} title="Onayla"></AppButton>
            <AppButton onPress={() => rejectInvite(index)} title="Reddet"></AppButton>
          </AppBox>
        ))}
      </AppBox>
    </GameLayout>
  );
};

export default GroupInvites;
