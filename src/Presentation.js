import React from "react";
import Book from "./Book";
import Topnav from "./Topnav";

class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {myTopnavClass: 'topnav',
                 sortBy: 'numberInLine',
                 desc: true};
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);

  }
  
    handleIconClick() {
    this.state.myTopnavClass === 'topnav' ? this.setState({myTopnavClass: 'topnav responsive'}) :     this.setState({myTopnavClass: 'topnav'})
  }
  
  handleSortClick(mottatt) {
    this.setState({sortBy: mottatt});
    if (this.state.sortBy === mottatt) {
      this.setState(prevState => ({
        desc: !prevState.desc
      }));
    }
    if (this.state.myTopnavClass === 'topnav responsive') {
      this.setState({myTopnavClass: 'topnav'});
    }
  }
  
  render () {
    
    function compare(key, order='asc') {
return function(a, b) {
  if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
//property doesn't exist on either object
return 0;
  }
  const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
  const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  let comparison = 0;
  if (varA > varB) {
    comparison = 1;
  } else if (varA < varB) {
    comparison = -1;
  }
  return (
(order === 'desc') ? comparison * -1 : comparison
  );
};
    }
    
    var books = [];
    if (['Heidi', 'Ida', 'Levin', 'Silje', 'Øivind'].includes(this.state.sortBy)) {
    var booksIntermediary = this.props.books;
    books = booksIntermediary.filter(book => book.chosenBy === this.state.sortBy);
    } else {
    books = this.props.books;
    books.sort(compare(this.state.sortBy, this.state.desc ? 'desc' : 'asc'));
    }
    const liste = [];
    books.forEach((entry) => {liste.push(<tr><td><Book book={entry} /></td></tr>)});
    return (
      <div>
      <Topnav 
        myTopnavClass={this.state.myTopnavClass}
        handleIconClick={this.handleIconClick}
        handleSortClick={this.handleSortClick}/>
      <table className="center">{liste}</table>
        </div>
    );
  }
}

export default Presentation;