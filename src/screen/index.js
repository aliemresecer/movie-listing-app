import React from 'react';
import { StyleSheet, ActivityIndicator, Text, View, FlatList, Slider } from 'react-native';
import { connect } from 'react-redux';
import { fetchMovies, fetchGenres } from '../store/actions/movieActions';
import ListItem  from '../components/ListItem';
import Checkbox from '../components/Checkbox';  
import { config } from '../config';

class Screen extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            value: 3,
            filters: []
        }
    }

    // Fetch movies and genres
    componentWillMount = () => {
        if(config.key){
            this.props.dispatch(fetchMovies())
            this.props.dispatch(fetchGenres())
        } else {
            alert('Please add API KEY')
        }
    }

    // Get genre names
    _filterGenres = (itemGenres) => {
        let filteredGenres = [];
        itemGenres.forEach(genre => {
            this.props.genres.forEach(cat => {
                if(cat.id === genre){
                    filteredGenres.push(cat.name)
                }
            })
        })
        return filteredGenres;
    }

    // Get vote average value from slider to filter movies
    _sliderChange = value => {
        this.setState({value});
    }

    // Sort movies by popularity, filter by vote average with slider value, filter by selected genres
    _filterMovies = data => {
        return data.sort((a, b) => b.popularity - a.popularity)
            .filter(movie => movie.vote_average > this.state.value)
            .filter(movie => 
                {
                    let genreIds = movie.genre_ids,
                        filters = this.state.filters,
                        match = genreIds.filter( function(id) { return this.has(id) }, new Set(filters) );
                    
                    if(match.length == filters.length) {
                        return movie
                    }
                }
            )
    }

    // Set selected filters
    _onChange = (filter) => {
        let genres = [...this.state.filters], 
            genreIndex = genres.indexOf(filter);
        
        if (genreIndex !== -1)
            genres.splice(genreIndex, 1);
        else
            genres = [...this.state.filters, filter]

        this.setState({filters: genres})
    }
    
    _keyExtractor = (item, index) => item.id.toString();

    _renderItem = ({item}) => (
        <ListItem
          title={item.title}
          genres={item.genre_ids && this._filterGenres(item.genre_ids)}
          poster={item.poster_path}
        />
      );

    render(){

        const value = this.state.value;
        const filters = this.props.genres && this.props.genres.map((genre, index) => <Checkbox key={index} change={this._onChange.bind(this)} {...genre} />);
        const movies = this._filterMovies(this.props.movies);
        const error = this.props.error;

        if (error){
            return (
                <View style={styles.warning}>
                    <Text style={styles.warningText}>{error.message ? error.message : 'Something went wrong. Please be sure to add your TMDB API key to config file.' }</Text>
                </View>
            )
        }

        return (
            this.props.loading ?
            <View style={styles.warning}>
                <ActivityIndicator size="large" color="#ccc" />
            </View>
            : 
            <View style={styles.container}>
                <View style={styles.filters}>
                    {filters}
                </View>
                <View style={styles.slider}>
                    <Text style={styles.popularity}>Popularity: {this.state.value}</Text>
                    <Slider 
                        minimumValue={0}
                        maximumValue={10}
                        step={.5}
                        value={value}
                        onValueChange={this._sliderChange.bind(this)}
                    />
                    <View style={styles.labels}>
                        <Text>0</Text>
                        <Text>10</Text>
                    </View>
                </View>
                
                <FlatList
                    data={movies}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const mapStateProps = state => ({
    movies: state.movies,
    genres: state.genres,
    loading: state.loading,
    error: state.error
})

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1
    },
    warning: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
    },
    warningText: {
        textAlign: 'center',
        padding: 20,
    },
    filters: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    popularity: {
        textAlign: 'center',
    },
    slider: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginTop: 15,
        borderBottomWidth: 2,
        borderColor: '#ddd'
    },
    labels: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
  });

export default connect(mapStateProps)(Screen);