import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowX: 'auto',
    flexWrap: 'nowrap',
    width: '80%',
  },
  titleStyle: {
    textalign: 'center',
    color: 'white',
    fontSize: '30px',
  },
};

const tilesData = [
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/324638-200.png',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/324638-200.png',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/324638-200.png',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/324638-200.png',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/324638-200.png',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/324638-200.png',
    title: 'Honey',
    author: 'fancycravel',
  },
];

/**
 * This example demonstrates the horizontal scrollable single-line grid list of images.
 */
const HomePageJobList = () => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2}>
      {tilesData.map((tile) => (
        <GridTile
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={tile.img} width="20px"/>
        </GridTile>
      ))}
    </GridList>
  </div>
);
export default HomePageJobList;