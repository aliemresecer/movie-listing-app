import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const ListItem = props => {
    const genresList = props.genres && props.genres.map((genre, key) => <Text key={key} style={styles.genreItem}>{genre}{props.genres.length > (key + 1) ? ',' : ''}</Text>)
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{uri: 'https://image.tmdb.org/t/p/w500' + props.poster}}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.genreContainer}>
                    <Text style={{fontWeight: 'bold'}}>Genres: </Text> 
                    {genresList}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      flexDirection: 'row',
    },
    image: {
        width: 75, 
        height: 100,
        marginRight: 10
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    genreItem: {
        marginRight: 5
    }
  });

export default ListItem;