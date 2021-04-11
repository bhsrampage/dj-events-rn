import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, View, FlatList} from 'react-native';
import EventCard from '../../components/EventCard';
import {bgColor, textColor} from '../../Constants';
import axios from '../../controllers/axios';
import {AuthContext} from '../../authentication/AuthProvider';

const Upcoming = () => {
  const {currentUser} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [check, setCheck] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUpcoming = async () => {
    let res = await axios.get('/events');
    setData(res.data);
    setLoading(false);
  };

  

  useEffect(() => {
    getUpcoming();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ActivityIndicator
      style={styles.container}
      color={textColor}
      size={'large'}
    />
  ) : (
    <FlatList
      keyExtractor={(event, index) => index.toString()}
      data={data}
      renderItem={({item}) => {
        return (
          <View style={styles.container}>
            <EventCard
              name={item.eventName}
              id={item.id}
              summary={item.eventSummary}
              likes={item.likes}
              committee={item.organisingCommitteeName}
              description={item.eventDescription}
            />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: bgColor,
    paddingLeft: 23,
    paddingTop: 17,
  },
});

export default Upcoming;
