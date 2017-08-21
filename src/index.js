import _ from 'lodash';
import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCsWEtZfBGkaNGbVfwPpJ1CEPIdhgJe-yk';



class App extends Component {

  constructor(props)
  {
      super(props);

      this.state = {videos:[],
        selectedVideo : null
      };

      this.videoSearch('shia labeouf just do it remix')
  }

  videoSearch(term)
  {
    YTSearch({key: API_KEY, term: term}, videos =>
    {
        console.log(videos);
        this.setState({
        videos : videos,
        selectedVideo:videos[0]
      });
    });
  }

  render() {

    const videoSearch = _.debounce((term) => {this.videoSearch(term) },300);

    return (
      <div>
         <SearchBar onSearchTermChange = {videoSearch}/>
         Cavaleiro = PD
         <VideoDetail video = {this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />

      </div>
    );
  }
}
//create a new component. This component should produce
//some HTML
/*const App = () => {
    return ( <div>
     <SearchBar />
    </div>
  );
}*/

//Take this component's generated HTML and put is
//on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
